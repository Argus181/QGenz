import React, { useState, useRef } from 'react';
import { FilePlus, FileText, Upload, X } from 'lucide-react';
import { useUser } from '../../context/UserContext';

const ResumeUploader = () => {
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef(null);
  const { uploadResume, resumeFile } = useUser();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file) => {
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!validTypes.includes(file.type)) {
      setFileError('Invalid file type. Please upload a PDF, DOCX, JPG, or PNG file.');
      return false;
    }
    
    if (file.size > maxSize) {
      setFileError('File is too large. Maximum size is 5MB.');
      return false;
    }
    
    setFileError('');
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        uploadResume(file);
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        uploadResume(file);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const removeFile = () => {
    uploadResume(null);
    setFileError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileIcon = () => {
    if (!resumeFile) return <Upload className="h-8 w-8 text-gray-400 dark:text-gray-500" />;
    
    switch (resumeFile.type) {
      case 'application/pdf':
        return <FileText className="h-10 w-10 text-primary-500" />;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return <FilePlus className="h-10 w-10 text-primary-500" />;
      case 'image/jpeg':
      case 'image/png':
        return <img 
          src={URL.createObjectURL(resumeFile)} 
          alt="Resume preview" 
          className="h-20 w-20 rounded-lg object-cover border border-gray-200 dark:border-gray-700" 
        />;
      default:
        return <FileText className="h-10 w-10 text-primary-500" />;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div 
        className={`file-upload-container ${dragActive ? 'border-primary-500 bg-primary-50 dark:bg-gray-800' : ''} ${resumeFile ? 'has-file' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={!resumeFile ? handleClick : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          accept=".pdf,.docx,.jpg,.jpeg,.png"
        />
        
        {resumeFile ? (
          <div className="flex flex-col items-center">
            {getFileIcon()}
            <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{resumeFile.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="mt-4 flex items-center gap-1 rounded-lg bg-red-50 px-3 py-1 text-sm text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
            >
              <X className="h-4 w-4" />
              Remove
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="mb-2 h-8 w-8 text-gray-400 dark:text-gray-500" />
            <p className="mb-1 text-lg font-medium text-gray-700 dark:text-gray-300">
              Drag and drop your resume here
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              or click to browse files
            </p>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Supports PDF, DOCX, JPG, PNG (max 5MB)
            </p>
          </div>
        )}
      </div>
      
      {fileError && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{fileError}</p>
      )}
    </div>
  );
};

export default ResumeUploader;