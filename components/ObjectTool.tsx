
import React, { useState } from 'react';
import { ImageData } from '../types';
import { editImage } from '../services/geminiService';
import ResultDisplay from './ResultDisplay';

interface ObjectToolProps {
  imageData: ImageData & { originalFile: File };
}

const ObjectTool: React.FC<ObjectToolProps> = ({ imageData }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      setError('Please describe what you want to change.');
      return;
    }
    setIsLoading(true);
    setResultImage(null);
    setError(null);
    try {
      const fullPrompt = `In this image, ${prompt}. Make the result look photorealistic and seamless.`;
      const result = await editImage(imageData.base64, imageData.mimeType, fullPrompt);
      setResultImage(`data:image/png;base64,${result}`);
    } catch (e) {
      setError('An error occurred. Please try a different prompt.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-slate-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Object Magic</h2>
        <p className="text-slate-300 mb-4">
          Describe a change you want to make. You can remove an object, or replace it with something else.
        </p>
        <div>
          <label htmlFor="object-prompt" className="block text-sm font-medium text-slate-300 mb-2">
            Your Magic Words:
          </label>
          <textarea
            id="object-prompt"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'remove the person on the left' or 'change the red car to a blue bicycle'"
            className="w-full bg-slate-700 border-slate-600 rounded-md shadow-sm p-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
          />
        </div>
        <button onClick={handleSubmit} disabled={isLoading} className="mt-6 w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-fuchsia-700 hover:to-purple-700 transition-all duration-300">
          {isLoading ? 'Performing Magic...' : 'Apply Change'}
        </button>
        {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
      </div>

      <ResultDisplay isLoading={isLoading} resultImage={resultImage} originalFileName={imageData.originalFile.name} />
    </div>
  );
};

export default ObjectTool;
