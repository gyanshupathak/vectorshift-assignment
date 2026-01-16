import { useState } from 'react';
import BaseNode from './baseNode';

export const ToggleNode = ({ id }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <BaseNode id={id} title="Toggle" outputs={[`${id}-state`]}>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={isEnabled}
          onChange={() => setIsEnabled((prev) => !prev)}
          className="accent-blue-500 w-4 h-4"
        />
        <span>Toggle State: {isEnabled ? 'On' : 'Off'}</span>
      </div>
    </BaseNode>
  );
};
