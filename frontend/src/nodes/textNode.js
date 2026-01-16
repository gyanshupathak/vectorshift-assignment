import { useState, useMemo } from 'react';
import BaseNode from './baseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const extractVariables = (text) => {
    const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const variables = new Set();
    let match;
    while ((match = variableRegex.exec(text)) !== null) {
      variables.add(match[1].trim());
    }
    return [...variables];
  };

  const inputHandles = useMemo(() => {
    const variables = extractVariables(currText);
    return variables.map((v) => `${id}-${v}`);
  }, [currText, id]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <BaseNode
      id={id}
      title="Text"
      inputs={inputHandles}
      outputs={[`${id}-output`]}
      key={`${id}-${inputHandles.join('-')}`}
    >
      <div className="flex flex-col text-sm text-gray-600">
        <label className="mb-1">Text</label>
        <textarea
          value={currText}
          onChange={handleTextChange}
          className="resize-none overflow-hidden w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />
      </div>
    </BaseNode>
  );
};
