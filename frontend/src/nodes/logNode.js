import BaseNode from './baseNode';

export const LogNode = ({ id }) => {
  return (
    <BaseNode id={id} title="Log" inputs={[`${id}-message`]}>
      <p className="text-sm text-gray-600">Logs the input message to console or display.</p>
    </BaseNode>
  );
};
