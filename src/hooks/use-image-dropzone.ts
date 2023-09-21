import { useState } from 'react';
import { ChangeEvent, DragEvent } from 'react';

export function useImageDropzone(accept: string | undefined = '.jpg, .jpeg, .png, .gif') {
  const [files, setFiles] = useState<File[]>([]);
  
  const isImageValid = (file: File): boolean => {
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    if (extension) {
      return allowedExtensions.includes(extension);
    }
    
    return false;
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFiles = [...e.dataTransfer.files].filter(isImageValid);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };
  
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files;
    if (inputFiles) {
      const newFiles = Array.from(inputFiles).filter((file) => isImageValid(file));
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    }
  };
  
  return {
    files,
    handleDrop,
    handleFileInput,
    accept,
  };
}
