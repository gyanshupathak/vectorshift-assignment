import { useState } from 'react';
import BaseNode from './baseNode';

export const DelayNode = ({ id }) => {
  const [delay, setDelay] = useState(1000);
  return (
    <BaseNode
      id={id}
      title="Delay"
      inputs={[`${id}-input`]}
      outputs={[`${id}-delayed_output`]}
    >
      <div className="flex flex-col text-sm text-gray-600">
        <label className="mb-1">Delay (ms)</label>
        <input
          type="number"
          value={delay}
          onChange={(e) => setDelay(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </BaseNode>
  );
};
