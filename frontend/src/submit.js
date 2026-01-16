import { useReactFlow } from 'reactflow';

export const SubmitButton = () => {
    const { getNodes, getEdges } = useReactFlow();

    const handleSubmit = async () => {
        const nodes = getNodes();
        const edges = getEdges();
        try {
            const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
            const response = await fetch(`${apiUrl}/pipelines/parse`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ nodes, edges }),
            });
      
            const result = await response.json();
            console.log('Pipeline submitted successfully:', result);
      
            alert(`
            Pipeline Summary:
            - Nodes: ${result.num_nodes}
            - Edges: ${result.num_edges}
            - DAG: ${result.is_dag ? 'Yes' : 'No'}
            `);
          }catch (err) {
            console.error('Error submitting pipeline:', err);
            alert('Failed to submit pipeline. Check console for error.');
          }
    };

    return (
        <div className="flex items-center justify-center">
        <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow transition-all"
        >
            Submit Pipeline
        </button>
        </div>
    );
}
