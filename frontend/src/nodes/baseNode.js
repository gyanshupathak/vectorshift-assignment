import { Handle, Position } from 'reactflow';
import { Settings2, MoveHorizontal, X, MoreVertical } from 'lucide-react';

const BaseNode = ({
  id,
  title,
  inputs = [],
  outputs = [],
  children,
}) => {
  return (
    <div className="w-[250px] rounded-lg shadow border border-gray-200 bg-white text-sm font-medium">
      {/* Header */}
      <div className="flex justify-between items-start bg-[#f6f8fd] border-b px-3 py-2 rounded-t-lg">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-gray-700 font-semibold">
            <MoveHorizontal className="w-4 h-4 text-blue-600" />
            {title}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Accepts Text from upstream nodes and allows you to write additional text...
          </p>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Settings2 className="w-4 h-4 cursor-pointer hover:text-gray-600" />
          <MoreVertical className="w-4 h-4 cursor-pointer hover:text-gray-600" />
          <X className="w-4 h-4 cursor-pointer hover:text-red-500" />
        </div>
      </div>

      {/* Node ID */}
      <div className="bg-gray-100 px-2 py-1 text-xs text-gray-700 text-center font-mono">
        {id}
      </div>

      {/* Handles */}
      {inputs.map((inputId, idx) => (
        <Handle
          key={inputId}
          type="target"
          position={Position.Left}
          id={inputId}
          style={{ top: `${60 + idx * 20}px` }}
          className="w-3 h-3 bg-blue-500 border-2 border-white rounded-full"
        />
      ))}

      {outputs.map((outputId, idx) => (
        <Handle
          key={outputId}
          type="source"
          position={Position.Right}
          id={outputId}
          style={{ top: `${60 + idx * 20}px` }}
          className="w-3 h-3 bg-green-500 border-2 border-white rounded-full"
        />
      ))}

      {/* Body */}
      <div className="px-3 py-3">
        {children}
      </div>
    </div>
  );
};

export default BaseNode;
