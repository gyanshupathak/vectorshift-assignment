import { useState } from 'react';
import BaseNode from './baseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => setCurrName(e.target.value);
  const handleTypeChange = (e) => setInputType(e.target.value);

  return (
    <BaseNode id={id} title="Input" outputs={[`${id}-value`]}>
      <div className="flex flex-col gap-3">
        {/* Name Field */}
        <div className="flex flex-col text-sm">
          <label htmlFor="name" className="text-gray-600 mb-1">Name</label>
          <input
            id="name"
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          />
        </div>

        {/* Type Selector */}
        <div className="flex flex-col text-sm">
          <label htmlFor="type" className="text-gray-600 mb-1">Type</label>
          <select
            id="type"
            value={inputType}
            onChange={handleTypeChange}
            className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
