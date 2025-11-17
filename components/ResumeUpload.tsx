import React, { useState, useCallback } from 'react';
import { UploadIcon } from './Icons';

interface ResumeUploadProps {
  onUpload: (text: string) => void;
}

const ResumeUpload: React.FC<ResumeUploadProps> = ({ onUpload }) => {
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setError('');
      setFileName(file.name);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        // A simple heuristic to check if it's likely a resume. A real app might need more robust parsing.
        if (text && text.length > 100) {
            onUpload(text);
        } else {
            setError('The file seems to be empty or not a valid text resume. Please try another file.');
            setFileName('');
        }
        setIsUploading(false);
      };
      reader.onerror = () => {
        setError('Failed to read the file. Please try again.');
        setIsUploading(false);
        setFileName('');
      };
      
      const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

      if (fileExtension === '.txt' || fileExtension === '.md') {
        reader.readAsText(file);
      } else if (fileExtension === '.pdf') {
        setError('PDF upload is not directly supported. Please open your PDF, copy the text, and paste it into a .txt file.');
        setFileName('');
        setIsUploading(false);
      } else {
        setError('Please upload a .txt or .md file.');
        setFileName('');
        setIsUploading(false);
      }
    }
  }, [onUpload]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-base-200 p-8 rounded-lg shadow-2xl animate-fade-in">
      <h2 className="text-3xl font-bold text-center text-brand-primary mb-2">Step 1: Upload Your Resume</h2>
      <p className="text-center text-content/80 mb-8">Provide your resume as a .txt or .md file. The AI will analyze it to personalize your assessment.</p>
      
      <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-base-300 border-dashed rounded-lg cursor-pointer bg-base-100 hover:bg-base-300 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadIcon className="w-10 h-10 mb-3 text-content/70" />
                  <p className="mb-2 text-sm text-content/70"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-content/50">TXT or MD (Max 800KB)</p>
                  {fileName && <p className="text-sm text-brand-secondary mt-4">{fileName}</p>}
                  {isUploading && <p className="text-sm text-brand-primary mt-4">Processing...</p>}
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept=".txt,.md" />
          </label>
      </div> 
      {error && <p className="text-red-400 text-center mt-4">{error}</p>}
    </div>
  );
};

export default ResumeUpload;