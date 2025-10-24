import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import { ImageFile } from '../types';

// Minimal types for react-image-crop since we can't import them directly
interface Crop {
  x: number;
  y: number;
  width: number;
  height: number;
  unit: 'px' | '%';
}

interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
  unit: 'px';
}

interface ImageCropperProps {
  src: string;
  onCropComplete: (imageFile: ImageFile) => void;
  onCancel: () => void;
}

// Helper for centering the initial crop
const centerCrop = (mediaWidth: number, mediaHeight: number, aspect: number): Crop => {
  const mediaAspect = mediaWidth / mediaHeight;
  let width: number;
  let height: number;

  if (mediaAspect > aspect) {
    width = mediaHeight * aspect;
    height = mediaHeight;
  } else {
    width = mediaWidth;
    height = mediaWidth / aspect;
  }
  
  const x = (mediaWidth - width) / 2;
  const y = (mediaHeight - height) / 2;

  return {
    x,
    y,
    width,
    height,
    unit: 'px',
  };
};


const getCroppedImg = (
  image: HTMLImageElement,
  crop: PixelCrop
): Promise<ImageFile> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return reject(new Error('Could not get canvas context'));
    }
    
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          return reject(new Error('Canvas is empty'));
        }
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const result = reader.result as string;
          const base64 = result.split(',')[1];
          resolve({
            base64,
            url: URL.createObjectURL(blob),
            mimeType: blob.type,
          });
        };
        reader.onerror = (error) => reject(error);
      },
      'image/jpeg',
      0.95
    );
  });
};


const ImageCropper: React.FC<ImageCropperProps> = ({ src, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const initialCrop = centerCrop(width, height, 1);
    setCrop(initialCrop);
  }

  const handleCrop = async () => {
    if (completedCrop?.width && completedCrop?.height && imgRef.current) {
      try {
        const croppedImageFile = await getCroppedImg(
          imgRef.current,
          completedCrop
        );
        onCropComplete(croppedImageFile);
      } catch (e) {
        console.error('Error cropping image:', e);
        // Optionally, show an error to the user
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-base-200 p-4 rounded-lg shadow-2xl max-w-lg w-full">
        <h3 className="text-lg font-semibold text-white mb-4 text-center">Crop Your Photo</h3>
        <div className="flex justify-center bg-base-100 p-2 rounded-md">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              minWidth={100}
              minHeight={100}
            >
              <img
                ref={imgRef}
                alt="Crop me"
                src={src}
                onLoad={onImageLoad}
                style={{ maxHeight: '70vh' }}
              />
            </ReactCrop>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button onClick={handleCrop} className="flex-1 bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors">Crop & Confirm</button>
          <button onClick={onCancel} className="flex-1 bg-base-300 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;