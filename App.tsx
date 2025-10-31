
import React, { useState } from 'react';
import { Tool } from './types';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import BackgroundTool from './components/BackgroundTool';
import UpscaleTool from './components/UpscaleTool';
import ObjectTool from './components/ObjectTool';
import ToolTabs from './components/ToolTabs';
import { MagicWandIcon } from './components/icons/MagicWandIcon';

interface ImageData {
  base64: string;
  mimeType: string;
  originalFile: File;
}

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>(Tool.BACKGROUND);
  const [imageData, setImageData] = useState<ImageData | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64 = base64String.split(',')[1];
      setImageData({ base64, mimeType: file.type, originalFile: file });
    };
    reader.readAsDataURL(file);
  };

  const renderTool = () => {
    if (!imageData) return null;
    switch (activeTool) {
      case Tool.BACKGROUND:
        return <BackgroundTool imageData={imageData} />;
      case Tool.UPSCALE:
        return <UpscaleTool imageData={imageData} />;
      case Tool.OBJECT_MAGIC:
        return <ObjectTool imageData={imageData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <Header />
        <main className="mt-8">
          {!imageData ? (
            <ImageUploader onImageUpload={handleImageUpload} />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 xl:col-span-3">
                <div className="sticky top-8">
                  <h2 className="text-xl font-bold text-cyan-400 mb-2">Original Image</h2>
                  <img
                    src={URL.createObjectURL(imageData.originalFile)}
                    alt="Original Upload"
                    className="rounded-lg shadow-lg w-full object-contain"
                  />
                   <button
                      onClick={() => setImageData(null)}
                      className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                      Use Another Image
                    </button>
                  <div className="mt-6">
                    <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                        <MagicWandIcon />
                        Choose a Tool
                    </h3>
                    <ToolTabs activeTool={activeTool} setActiveTool={setActiveTool} />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 xl:col-span-9">
                {renderTool()}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
