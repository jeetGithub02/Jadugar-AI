import React, { useState, useCallback } from 'react';
import { ImageData } from '../types';
import { editImage } from '../services/geminiService';
import { BACKGROUND_IMAGES, GRADIENTS } from '../constants';
import ResultDisplay from './ResultDisplay';

interface BackgroundToolProps {
  imageData: ImageData & { originalFile: File };
}

type BackgroundType = 'color' | 'gradient' | 'image' | 'upload';
type BlurStrength = 'none' | 'low' | 'medium' | 'high';

const BackgroundTool: React.FC<BackgroundToolProps> = ({ imageData }) => {
  const [bgType, setBgType] = useState<BackgroundType>('image');
  const [color, setColor] = useState('#1a2b3c');
  const [gradient, setGradient] = useState(GRADIENTS[0].value);
  const [imagePrompt, setImagePrompt] = useState(BACKGROUND_IMAGES[0].prompt);
  const [blur, setBlur] = useState<BlurStrength>('low');
  const [customBg, setCustomBg] = useState<{base64: string, mimeType: string, previewUrl: string} | null>(null);


  const [isLoading, setIsLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCustomBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setCustomBg({
          base64: base64String.split(',')[1],
          mimeType: file.type,
          previewUrl: URL.createObjectURL(file),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePrompt = useCallback(() => {
    if (bgType === 'upload') {
        return "Using the second image as a background, place the foreground subject from the first image onto it. Make it look natural and seamless.";
    }

    let prompt = `Remove the background of this image. Replace it with a new background.`;

    switch (bgType) {
      case 'color':
        prompt += ` The new background should be a solid color: ${color}.`;
        break;
      case 'gradient':
        prompt += ` The new background should be a gradient: ${gradient}.`;
        break;
      case 'image':
        prompt += ` The new background should be a photorealistic image of: ${imagePrompt}.`;
        break;
    }

    if (bgType === 'image' && blur !== 'none') {
      prompt += ` Apply a ${blur} amount of blur to the new background only, keeping the foreground subject sharp.`;
    }

    return prompt;
  }, [bgType, color, gradient, imagePrompt, blur]);

  const handleSubmit = async () => {
    setIsLoading(true);
    setResultImage(null);
    setError(null);
    try {
      const prompt = generatePrompt();
      let backgroundImage: { base64: string, mimeType: string } | undefined = undefined;

      if (bgType === 'upload') {
        if (customBg) {
          backgroundImage = { base64: customBg.base64, mimeType: customBg.mimeType };
        } else {
          setError("Please upload a background image first.");
          setIsLoading(false);
          return;
        }
      }

      const result = await editImage(imageData.base64, imageData.mimeType, prompt, backgroundImage);
      setResultImage(`data:image/png;base64,${result}`);
    } catch (e) {
      setError('An error occurred. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-slate-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Background Settings</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Background Type</label>
            <div className="grid grid-cols-4 gap-2 rounded-lg bg-slate-700 p-1">
              {(['upload', 'image', 'gradient', 'color'] as BackgroundType[]).map((type) => (
                <button key={type} onClick={() => setBgType(type)} className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${bgType === type ? 'bg-cyan-500 text-white' : 'text-slate-300 hover:bg-slate-600'}`}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {bgType === 'upload' && (
             <div>
              {!customBg ? (
                <div>
                    <label htmlFor="custom-bg-upload" className="block text-sm font-medium text-slate-300 mb-2">Upload Custom Background</label>
                    <div className="relative mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-600 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-slate-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <div className="flex text-sm text-slate-400">
                            <label htmlFor="custom-bg-upload" className="relative cursor-pointer bg-slate-800 rounded-md font-medium text-cyan-400 hover:text-cyan-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-slate-800 focus-within:ring-cyan-500">
                            <span>Upload a file</span>
                            <input id="custom-bg-upload" name="custom-bg-upload" type="file" className="sr-only" onChange={handleCustomBgUpload} accept="image/png, image/jpeg, image/webp" />
                            </label>
                        </div>
                        <p className="text-xs text-slate-500">PNG, JPG, WEBP</p>
                        </div>
                    </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Background Preview</label>
                  <div className="relative mt-2">
                    <img src={customBg.previewUrl} alt="Custom background preview" className="w-full h-32 object-cover rounded-md" />
                    <button onClick={() => setCustomBg(null)} className="absolute top-2 right-2 bg-red-600/80 text-white rounded-full p-1 leading-none hover:bg-red-700 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {bgType === 'color' && (
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-slate-300 mb-2">Select Color</label>
              <input type="color" id="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 p-1 bg-slate-700 border border-slate-600 rounded-lg cursor-pointer" />
            </div>
          )}

          {bgType === 'gradient' && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Select Gradient</label>
              <div className="grid grid-cols-4 gap-2">
                {GRADIENTS.map(g => (
                    <div key={g.id} onClick={() => setGradient(g.value)} style={{ background: g.value }} className={`h-12 rounded-lg cursor-pointer transition-all ${gradient === g.value ? 'ring-2 ring-offset-2 ring-offset-slate-800 ring-cyan-400' : ''}`} />
                ))}
              </div>
            </div>
          )}

          {bgType === 'image' && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Select Background Image</label>
              <div className="grid grid-cols-3 gap-2">
                {BACKGROUND_IMAGES.map(img => (
                  <img key={img.id} src={img.url} alt={img.prompt} onClick={() => setImagePrompt(img.prompt)} className={`w-full aspect-square object-cover rounded-lg cursor-pointer transition-all ${imagePrompt === img.prompt ? 'ring-2 ring-offset-2 ring-offset-slate-800 ring-cyan-400' : 'opacity-70 hover:opacity-100'}`} />
                ))}
              </div>

              <div className="mt-4">
                <label htmlFor="blur" className="block text-sm font-medium text-slate-300">Blur Strength</label>
                <select id="blur" value={blur} onChange={(e) => setBlur(e.target.value as BlurStrength)} className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm">
                  <option value="none">None</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          )}
        </div>
        
        <button onClick={handleSubmit} disabled={isLoading} className="mt-8 w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-fuchsia-700 hover:to-purple-700 transition-all duration-300">
          {isLoading ? 'Generating...' : 'Apply Magic'}
        </button>
        {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
      </div>

      <ResultDisplay isLoading={isLoading} resultImage={resultImage} originalFileName={imageData.originalFile.name} />
    </div>
  );
};

export default BackgroundTool;