import { useState } from 'react';
import BaseNode from './baseNode';

export const MathNode = ({ id }) => {
  const [operation, setOperation] = useState('Add');

  return (
    <BaseNode
      id={id}
      title="Math"
      inputs={[`${id}-A`, `${id}-B`]}
      outputs={[`${id}-Result`]}
    >
      <div className="flex flex-col text-sm text-gray-600">
        <label className="mb-1">Operation</label>
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="Add">Add</option>
          <option value="Subtract">Subtract</option>
          <option value="Multiply">Multiply</option>
          <option value="Divide">Divide</option>
        </select>
      </div>
    </BaseNode>
  );
};
