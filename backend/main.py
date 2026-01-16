from fastapi import FastAPI, Form
from pydantic import BaseModel
from typing import List, Dict
from fastapi.middleware.cors import CORSMiddleware
import os
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    logger.info("Application starting up...")
    logger.info(f"PORT env var: {os.getenv('PORT', 'Not set')}")
    logger.info(f"ALLOWED_ORIGINS: {os.getenv('ALLOWED_ORIGINS', 'Not set')}")

# Get allowed origins from environment variable, default to localhost for development
allowed_origins_str = os.getenv("ALLOWED_ORIGINS", "http://localhost:3000")
allowed_origins = [origin.strip() for origin in allowed_origins_str.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    graph = {node.id: [] for node in nodes}
    for edge in edges:
        graph[edge.source].append(edge.target)

    visited = set()
    rec_stack = set()

    def dfs(node_id: str) -> bool:
        if node_id in rec_stack:
            return True 
        if node_id in visited:
            return False
        visited.add(node_id)
        rec_stack.add(node_id)
        for neighbor in graph.get(node_id, []):
            if dfs(neighbor):
                return True
        rec_stack.remove(node_id)
        return False

    for node in graph:
        if node not in visited:
            if dfs(node):
                return False  

    return True

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.get('/api')
def api_root():
    return {'message': 'API is running'}

@app.get('/health')
def health_check():
    return {'status': 'healthy'}

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag
    }
