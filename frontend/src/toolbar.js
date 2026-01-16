import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div className="p-4">
      <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl shadow border border-gray-200">
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="math" label="Math" />
        <DraggableNode type="image" label="Image" />
        <DraggableNode type="toggle" label="Toggle" />
        <DraggableNode type="delay" label="Delay" />
        <DraggableNode type="log" label="Log" />
      </div>
    </div>
  );
};
