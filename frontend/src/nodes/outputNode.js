import { useState } from 'react';
import BaseNode from './baseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data.outputType || 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setOutputType(e.target.value);

  return (
    <BaseNode id={id} title="Output" inputs={[`${id}-value`]}>
      <div className="flex flex-col gap-3 text-sm text-gray-600">
        {/* Name Field */}
        <div className="flex flex-col">
          <label className="mb-1">Name</label>
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>

        {/* Type Selector */}
        <div className="flex flex-col">
          <label className="mb-1">Type</label>
          <select
            value={outputType}
            onChange={handleTypeChange}
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
