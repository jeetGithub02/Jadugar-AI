
import React from 'react';
import Loader from './Loader';
import { DownloadIcon } from './icons/DownloadIcon';

interface ResultDisplayProps {
  isLoading: boolean;
  resultImage: string | null;
  originalFileName: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, resultImage, originalFileName }) => {
  const downloadImage = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = resultImage;
    const name = originalFileName.substring(0, originalFileName.lastIndexOf('.')) || 'jadugar-edit';
    link.download = `${name}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">Result</h2>
      <div className="relative w-full aspect-square bg-slate-900/50 rounded-lg flex items-center justify-center overflow-hidden">
        {isLoading && <Loader />}
        {!isLoading && resultImage && (
          <img src={resultImage} alt="Generated result" className="object-contain max-w-full max-h-full" />
        )}
        {!isLoading && !resultImage && (
          <p className="text-slate-400">Your generated image will appear here</p>
        )}
      </div>
      {resultImage && !isLoading && (
        <button
          onClick={downloadImage}
          className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
        >
          <DownloadIcon />
          Download Image
        </button>
      )}
    </div>
  );
};

export default ResultDisplay;
