import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface FileUploadProps {
  id: string;
  name: string;
  label?: string;
  onChange: (file: File | null) => void;
  accept?: string;
  className?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ id, name, label, onChange, accept, className }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setSelectedFile(file ? file.name : null);
    onChange(file);
  };

  return (
    <div className="w-full">
      {label && <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
      <input
        id={id}
        name={name}
        type="file"
        accept={accept}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onChange={handleChange}
      />
      {selectedFile && (
        <p className="mt-1 text-xs text-muted-foreground">Selected: {selectedFile}</p>
      )}
    </div>
  );
};

export default FileUpload;
