import React, { useState, useCallback, useRef } from 'react';
import { HeadshotStyle, ImageFile } from '../types';
import { generateHeadshot } from '../services/geminiService';
import StyleSelector from './StyleSelector';
import ImageCropper from './ImageCropper';
import { Spinner } from './Spinner';
import { UploadIcon } from './icons/UploadIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { CameraIcon } from './icons/CameraIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { CropIcon } from './icons/CropIcon';

const fileToImageFile = (file: File | Blob): Promise<ImageFile> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve({
        base64,
        url: URL.createObjectURL(file),
        mimeType: file.type,
      });
    };
    reader.onerror = (error) => reject(error);
  });
};

const HeadshotGenerator: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<ImageFile | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<HeadshotStyle | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [isCropping, setIsCropping] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setError(null);
      setGeneratedImage(null);
      
      if (uploadedImage?.url) {
        URL.revokeObjectURL(uploadedImage.url);
      }
      
      const imageFile = await fileToImageFile(file);
      setUploadedImage(imageFile);
      
      event.target.value = '';
    }
  };
  
  const openCamera = async () => {
    setError(null);
    setGeneratedImage(null);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraOpen(true);
      } catch (err) {
        console.error("Error accessing camera: ", err);
        setError("Could not access the camera. Please check permissions.");
      }
    } else {
      setError("Your browser does not support camera access.");
    }
  };

  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context?.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      if (blob) {
        if (uploadedImage?.url) {
          URL.revokeObjectURL(uploadedImage.url);
        }
        const imageFile = await fileToImageFile(blob);
        setUploadedImage(imageFile);
        closeCamera();
      } else {
         setError("Failed to process captured photo.");
         closeCamera();
      }
    }, 'image/jpeg');
  };

  const handleCropComplete = (imageFile: ImageFile) => {
    if (uploadedImage?.url) URL.revokeObjectURL(uploadedImage.url);
    setUploadedImage(imageFile);
    setIsCropping(false);
  };

  const handleCropCancel = () => {
    setIsCropping(false);
  };

  const handleGenerateClick = useCallback(async () => {
    if (!uploadedImage || !selectedStyle) {
      setError('Please upload a selfie and select a style.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setGeneratedImage(null);

    try {
      const result = await generateHeadshot(
        { data: uploadedImage.base64, mimeType: uploadedImage.mimeType },
        selectedStyle.prompt
      );
      setGeneratedImage(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [uploadedImage, selectedStyle]);

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'ai-headshot.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8">
       {isCameraOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-base-200 p-4 rounded-lg shadow-2xl max-w-lg w-full">
            <video ref={videoRef} autoPlay playsInline className="rounded-md w-full" muted></video>
            <div className="flex justify-center gap-4 mt-4">
              <button onClick={capturePhoto} className="flex-1 bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors">Capture</button>
              <button onClick={closeCamera} className="flex-1 bg-base-300 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancel</button>
            </div>
          </div>
          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
      )}
      {isCropping && uploadedImage && (
        <ImageCropper
          src={uploadedImage.url}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
        />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6 bg-base-200 p-6 rounded-lg">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">1. Provide a Selfie</h3>
            <div className="border-2 border-dashed border-base-300 rounded-lg p-4 text-center transition-colors duration-200 flex items-center justify-center min-h-[224px]">
               {uploadedImage ? (
                  <img src={uploadedImage.url} alt="Uploaded selfie" className="max-h-48 mx-auto rounded-lg shadow-lg" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-500">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <p>Your photo will appear here</p>
                  </div>
                )}
            </div>
             <div className="flex gap-4 mt-4">
               <label htmlFor="selfie-upload" className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-base-300 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                <UploadIcon className="w-5 h-5" />
                <span>{uploadedImage ? 'Change Image' : 'Upload Image'}</span>
              </label>
              <input id="selfie-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
              <button onClick={openCamera} className="flex-1 flex items-center justify-center gap-2 bg-base-300 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                <CameraIcon className="w-5 h-5" />
                <span>Take Photo</span>
              </button>
            </div>
            {uploadedImage && (
              <div className="mt-4">
                <button
                  onClick={() => setIsCropping(true)}
                  className="w-full flex items-center justify-center gap-2 bg-base-300/70 hover:bg-base-300 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                  aria-label="Crop uploaded image"
                >
                  <CropIcon className="w-5 h-5" />
                  <span>Crop Photo (Optional)</span>
                </button>
              </div>
            )}
          </div>
          <StyleSelector selectedStyleId={selectedStyle?.id || null} onSelectStyle={setSelectedStyle} />

          <button
            onClick={handleGenerateClick}
            disabled={!uploadedImage || !selectedStyle || isLoading}
            className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-secondary disabled:bg-base-300 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {isLoading ? (
              <>
                <Spinner className="w-5 h-5" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <SparklesIcon className="w-5 h-5" />
                <span>Generate Headshot</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-base-200 p-6 rounded-lg flex flex-col items-center justify-center min-h-[300px]">
          <h3 className="text-lg font-semibold text-white mb-4">Your AI Headshot</h3>
          <div className="w-full aspect-square bg-base-100 rounded-lg flex items-center justify-center relative">
            {isLoading && (
              <div className="flex flex-col items-center gap-4 text-gray-400 animate-pulse-fast">
                <Spinner className="w-16 h-16" />
                <p>Creating your professional look...</p>
              </div>
            )}
            {error && <p className="text-red-400 p-4 text-center">{error}</p>}
            {!isLoading && !generatedImage && !error && (
              <p className="text-gray-500">Your generated headshot will appear here.</p>
            )}
            {generatedImage && (
              <>
                <img src={generatedImage} alt="Generated headshot" className="w-full h-full object-cover rounded-lg animate-fade-in" />
                 <button
                  onClick={handleDownload}
                  className="absolute bottom-4 right-4 flex items-center gap-2 bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <DownloadIcon className="w-5 h-5" />
                  <span>Download</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadshotGenerator;
