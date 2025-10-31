
import React, { useState } from 'react';
import { ImageData } from '../types';
import { editImage } from '../services/geminiService';
import ResultDisplay from './ResultDisplay';

interface UpscaleToolProps {
  imageData: ImageData & { originalFile: File };
}

const UpscaleTool: React.FC<UpscaleToolProps> = ({ imageData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpscale = async () => {
    setIsLoading(true);
    setResultImage(null);
    setError(null);
    try {
      const prompt = "Upscale this image. Enhance its details, sharpness, and clarity to make it look like a high-resolution 4K photograph. Do not change the content or composition of the image.";
      const result = await editImage(imageData.base64, imageData.mimeType, prompt);
      setResultImage(`data:image/png;base64,${result}`);
    } catch (e) {
      setError('An error occurred during upscaling. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-800 p-6 rounded-lg shadow-xl flex flex-col justify-between">
            <div>
                <h2 className="text-2xl font-bold text-cyan-400 mb-4">Upscale Image</h2>
                <p className="text-slate-300 mb-6">
                Increase the resolution and enhance the details of your image. This tool will make your photo sharper and clearer, perfect for printing or high-resolution displays.
                </p>
            </div>
            <button onClick={handleUpscale} disabled={isLoading} className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-fuchsia-700 hover:to-purple-700 transition-all duration-300">
            {isLoading ? 'Upscaling...' : 'Enhance to 4K Quality'}
            </button>
            {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
        </div>

        <ResultDisplay isLoading={isLoading} resultImage={resultImage} originalFileName={imageData.originalFile.name} />
    </div>
  );
};

export default UpscaleTool;
