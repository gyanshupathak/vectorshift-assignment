import { FileText, Brain, Upload, MessageSquareText, Sigma, Image, ToggleRight, Clock, LogOut } from 'lucide-react';

const icons = {
  customInput: Upload,
  llm: Brain,
  customOutput: LogOut,
  text: MessageSquareText,
  math: Sigma,
  image: Image,
  toggle: ToggleRight,
  delay: Clock,
  log: FileText,
};

export const DraggableNode = ({ type, label }) => {
  const Icon = icons[type] || FileText;
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
      className="w-24 h-24 bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col items-center justify-center text-sm text-gray-700 font-medium cursor-grab transition-all duration-200 hover:bg-[#f5f7ff] hover:text-blue-600 hover:-translate-y-1 hover:shadow-md hover:border-blue-40">
      <Icon className="w-5 h-5 mb-1 transition-colors duration-200" />
      <span>{label}</span>
    </div>
  );
};
