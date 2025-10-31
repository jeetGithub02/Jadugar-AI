
import React from 'react';
import { Tool } from '../types';
import { ImageIcon } from './icons/ImageIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { MagicWandIcon } from './icons/MagicWandIcon';

interface ToolTabsProps {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
}

const tools = [
  { id: Tool.BACKGROUND, name: 'Background', icon: <ImageIcon /> },
  { id: Tool.UPSCALE, name: 'Upscale', icon: <SparklesIcon /> },
  { id: Tool.OBJECT_MAGIC, name: 'Object Magic', icon: <MagicWandIcon /> },
];

const ToolTabs: React.FC<ToolTabsProps> = ({ activeTool, setActiveTool }) => {
  return (
    <div className="flex flex-col space-y-2">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => setActiveTool(tool.id)}
          className={`flex items-center gap-3 w-full p-3 text-left rounded-lg transition-all duration-200 ${
            activeTool === tool.id
              ? 'bg-cyan-500 text-white shadow-lg'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
          }`}
        >
          {tool.icon}
          <span className="font-semibold">{tool.name}</span>
        </button>
      ))}
    </div>
  );
};

export default ToolTabs;
