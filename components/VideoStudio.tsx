import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import UploadIcon from './icons/UploadIcon';
import VideoIcon from './icons/VideoIcon';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

const loadingMessages = [
  "Warming up the digital director's chair...",
  "Composing the first shot...",
  "Adding cinematic flair...",
  "Rendering the final cut...",
  "Almost ready for the premiere!",
];

const VideoStudio: React.FC = () => {
  const [apiKeySelected, setApiKeySelected] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadingIntervalRef = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setApiKeySelected(hasKey);
      }
    };
    checkApiKey();

    return () => {
      if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
      if (generatedVideoUrl) URL.revokeObjectURL(generatedVideoUrl);
    };
  }, []);

  const handleSelectApiKey = async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
      setApiKeySelected(true);
      setError(null);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file.');
        return;
      }
      setError(null);
      setGeneratedVideoUrl(null);
      setImageFile(file);
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(URL.createObjectURL(file));
      const b64 = await fileToBase64(file);
      setImageBase64(b64);
    }
  };
  
  const resetState = () => {
      setImageFile(null);
      setImageBase64(null);
      if(imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
      setPrompt('');
      setGeneratedVideoUrl(null);
      setError(null);
  }

  const startLoadingMessages = () => {
    setLoadingMessage(loadingMessages[0]);
    let index = 1;
    loadingIntervalRef.current = window.setInterval(() => {
      setLoadingMessage(loadingMessages[index % loadingMessages.length]);
      index++;
    }, 5000);
  };

  const stopLoadingMessages = () => {
    if (loadingIntervalRef.current) {
      clearInterval(loadingIntervalRef.current);
      loadingIntervalRef.current = null;
    }
  };

  const generateVideo = async () => {
    if (!imageBase64 || !imageFile) {
      setError("Please upload an image first.");
      return;
    }
    if (!apiKeySelected) {
      setError("Please select an API key to proceed.");
      return;
    }

    setIsLoading(true);
    setGeneratedVideoUrl(null);
    setError(null);
    startLoadingMessages();

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt || 'Animate this image with beautiful motion.',
        image: { imageBytes: imageBase64, mimeType: imageFile.type },
        config: { numberOfVideos: 1, resolution: '720p', aspectRatio: aspectRatio }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      if (operation.error) {
        throw new Error(operation.error.message || 'The operation failed.');
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (!downloadLink) {
        throw new Error("Video generation succeeded, but no download link was found.");
      }
      
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      if (!response.ok) {
        throw new Error(`Failed to download video: ${response.statusText}`);
      }
      const videoBlob = await response.blob();
      if (generatedVideoUrl) URL.revokeObjectURL(generatedVideoUrl);
      setGeneratedVideoUrl(URL.createObjectURL(videoBlob));
    } catch (err: any) {
      let errorMessage = err.message || 'An unknown error occurred during video generation.';
      if (errorMessage.includes("Requested entity was not found.")) {
        errorMessage = "Your API key is invalid or not found. Please select a valid key.";
        setApiKeySelected(false);
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
      stopLoadingMessages();
    }
  };
  
  const mainContent = () => {
      if (isLoading) {
          return (
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
                  <h3 className="text-xl font-semibold text-gray-800 mt-6">Generating Your Masterpiece...</h3>
                  <p className="text-gray-500 mt-2">{loadingMessage}</p>
              </div>
          );
      }
      if (generatedVideoUrl) {
          return (
              <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 text-center">Video Premier</h2>
                <video src={generatedVideoUrl} controls autoPlay loop className="w-full rounded-lg" />
                <button onClick={resetState} className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition">
                  Create Another Video
                </button>
              </div>
          )
      }
      return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">1. Upload Your Image</h2>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
              <div onClick={() => fileInputRef.current?.click()} className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-500 transition">
                {imagePreviewUrl ? (
                    <img src={imagePreviewUrl} alt="Preview" className="max-h-60 rounded-lg object-contain" />
                ) : (
                    <div className="space-y-1 text-center py-8">
                        <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                            <p className="pl-1">Click to upload or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                )}
              </div>
            </div>
            <div className={`bg-white rounded-2xl shadow-lg p-6 space-y-4 ${!imageFile ? 'opacity-50' : ''}`}>
                <h2 className="text-xl font-bold text-gray-800">2. Configure & Generate</h2>
                <div>
                    <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">Prompt (Optional)</label>
                    <textarea id="prompt" rows={3} value={prompt} onChange={(e) => setPrompt(e.target.value)} disabled={!imageFile} placeholder="e.g., A cinematic shot, a beautiful sunset..." className="mt-1 block w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm disabled:bg-gray-100" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700">Aspect Ratio</h3>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                      <AspectRatioButton label="16:9 Landscape" value="16:9" selected={aspectRatio} onSelect={setAspectRatio} disabled={!imageFile} />
                      <AspectRatioButton label="9:16 Portrait" value="9:16" selected={aspectRatio} onSelect={setAspectRatio} disabled={!imageFile} />
                  </div>
                </div>
                <button onClick={generateVideo} disabled={!imageFile} className="w-full py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed">
                    <VideoIcon className="w-6 h-6" />
                    <span>Generate Video</span>
                </button>
            </div>
          </div>
      );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in-up">
      <h1 className="text-3xl font-bold text-gray-800">AI Video Studio</h1>
      
      {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>}

      {!apiKeySelected ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md text-yellow-800">
          <div className="flex">
            <div className="flex-shrink-0">
               <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                 <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
               </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">API Key Required</p>
              <p className="mt-1 text-sm">
                Video generation with Veo requires a valid API key. Please select a key to continue.
                For more information about pricing, please see the <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="font-medium underline">billing documentation</a>.
              </p>
              <div className="mt-4">
                <button onClick={handleSelectApiKey} className="bg-blue-600 text-white font-bold px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
                  Select API Key
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : mainContent()}
    </div>
  );
};

const AspectRatioButton: React.FC<{label: string, value: '16:9' | '9:16', selected: string, onSelect: (v: '16:9' | '9:16') => void, disabled: boolean}> = ({ label, value, selected, onSelect, disabled }) => {
    const isSelected = value === selected;
    return (
        <button onClick={() => onSelect(value)} disabled={disabled} className={`w-full p-3 rounded-lg border-2 text-sm font-semibold transition ${ isSelected ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400'} disabled:opacity-50 disabled:hover:border-gray-300`}>
            {label}
        </button>
    );
};

export default VideoStudio;