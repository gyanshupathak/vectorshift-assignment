import { useState } from 'react';
import BaseNode from './baseNode';

export const ImageNode = ({ id }) => {
  const [url, setUrl] = useState('');
  return (
    <BaseNode
      id={id}
      title="Image"
      inputs={[`${id}-image_url`]}
      outputs={[`${id}-display`]}
    >
      <div className="flex flex-col text-sm text-gray-600">
        <label className="mb-1">Image URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    </BaseNode>
  );
};
