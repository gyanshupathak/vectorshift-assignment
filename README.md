# VectorShift Pipeline Builder

A visual pipeline builder application that allows users to create, connect, and validate node-based workflows. Built with React for the frontend and FastAPI for the backend.

## Features

- **Drag-and-Drop Interface**: Create pipelines by dragging nodes from the toolbar onto the canvas
- **Node Types**: Support for multiple node types including Input, Output, LLM, Text, Math, Image, Toggle, Delay, and Log nodes
- **Visual Connections**: Connect nodes by dragging from output handles to input handles
- **DAG Validation**: Automatically validates that your pipeline is a Directed Acyclic Graph (DAG)
- **Pipeline Submission**: Submit pipelines to the backend for analysis and validation

## Project Structure

```
.
├── frontend/          # React frontend application
│   ├── src/          # Source code
│   │   ├── nodes/    # Node component definitions
│   │   ├── App.js    # Main app component
│   │   ├── ui.js     # Pipeline UI with ReactFlow
│   │   ├── toolbar.js # Node toolbar
│   │   └── submit.js # Pipeline submission logic
│   └── package.json  # Frontend dependencies
├── backend/          # FastAPI backend
│   ├── main.py      # API endpoints and DAG validation
│   └── requirements.txt # Python dependencies
└── package.json     # Root package.json with dev scripts
```

## Prerequisites

- **Node.js** (v14 or higher) and npm
- **Python** (v3.8 or higher) and pip
- **Git** (optional, for cloning)

## Local Setup

### 1. Install Dependencies

#### Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

#### Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
cd ..
```

Or install all at once from the root:
```bash
npm run install:all
cd backend
pip install -r requirements.txt
cd ..
```

### 2. Start the Development Servers

#### Option A: Start Both Servers Together (Recommended)
From the root directory:
```bash
npm run dev
```

This will start:
- Frontend on `http://localhost:3000`
- Backend on `http://localhost:8000`

#### Option B: Start Servers Separately

**Frontend:**
```bash
cd frontend
npm start
```

**Backend:**
```bash
cd backend
python3 -m uvicorn main:app --reload --port 8000
```

### 3. Access the Application

- **Frontend**: Open [http://localhost:3000](http://localhost:3000) in your browser
- **Backend API**: Available at [http://localhost:8000](http://localhost:8000)
  - Health check: `GET http://localhost:8000/` returns `{"Ping":"Pong"}`
  - Pipeline parse: `POST http://localhost:8000/pipelines/parse`

## How to Use

### Creating a Pipeline

1. **Add Nodes**: 
   - Click and drag nodes from the toolbar on the left
   - Drop them onto the canvas
   - Available node types: Input, Output, LLM, Text, Math, Image, Toggle, Delay, Log

2. **Connect Nodes**:
   - Hover over a node to see connection handles
   - Click and drag from an output handle (right side) to an input handle (left side) of another node
   - This creates an edge connecting the nodes

3. **Move Nodes**:
   - Click and drag nodes to reposition them on the canvas

4. **Submit Pipeline**:
   - Click the "Submit Pipeline" button at the bottom
   - The backend will validate your pipeline and return:
     - Number of nodes
     - Number of edges
     - Whether it's a valid DAG (no cycles)

### Pipeline Validation

The backend validates that your pipeline is a **Directed Acyclic Graph (DAG)**, meaning:
- All connections have a direction (from output to input)
- There are no circular dependencies (cycles)
- The graph can be processed in a topological order

## API Endpoints

### `GET /`
Health check endpoint
- **Response**: `{"Ping": "Pong"}`

### `POST /pipelines/parse`
Submit a pipeline for validation
- **Request Body**:
  ```json
  {
    "nodes": [
      {"id": "node1"},
      {"id": "node2"}
    ],
    "edges": [
      {"source": "node1", "target": "node2"}
    ]
  }
  ```
- **Response**:
  ```json
  {
    "num_nodes": 2,
    "num_edges": 1,
    "is_dag": true
  }
  ```

## Development

### Frontend
- Built with React and ReactFlow
- Uses Zustand for state management
- Styled with Tailwind CSS

### Backend
- FastAPI framework
- CORS enabled for localhost:3000
- DAG validation using DFS algorithm

## Troubleshooting

### Port Already in Use
If you get a "port already in use" error:
```bash
# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 8000 (backend)
lsof -ti:8000 | xargs kill -9
```

### CORS Errors
If you see CORS errors, make sure:
- Backend is running on port 8000
- Frontend is running on port 3000
- Backend CORS is configured for `http://localhost:3000`

### Module Not Found
If you get import errors:
```bash
# Reinstall frontend dependencies
cd frontend && npm install

# Reinstall backend dependencies
cd backend && pip install -r requirements.txt
```

## License

This project was created as part of a technical assessment.
