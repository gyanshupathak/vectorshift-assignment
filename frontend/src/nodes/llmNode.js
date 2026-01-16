import BaseNode from './baseNode';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      inputs={[`${id}-system`, `${id}-prompt`]}
      outputs={[`${id}-response`]}
    >
      <p className="text-sm text-gray-600">This is a LLM Node.</p>
    </BaseNode>
  );
};
