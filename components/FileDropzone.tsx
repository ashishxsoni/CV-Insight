"use client";

import { useState, useRef } from "react";

interface FileDropzoneProps {
  label: string;
  accept?: string;
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
  selectedFiles?: File[];
}

export function FileDropzone({
  label,
  accept = ".pdf,.txt",
  multiple = false,
  onFilesSelected,
  selectedFiles = [],
}: FileDropzoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    onFilesSelected(Array.from(files));
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={`
        border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all text-center select-none
        ${dragging
          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
          : "border-zinc-300 dark:border-zinc-600 hover:border-indigo-400 bg-zinc-50 dark:bg-zinc-800"
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="text-2xl mb-2">📄</div>
      <p className="font-medium text-zinc-700 dark:text-zinc-300">{label}</p>
      {selectedFiles.length > 0 ? (
        <ul className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 space-y-0.5">
          {selectedFiles.map((f) => (
            <li key={f.name} className="truncate max-w-xs mx-auto">✓ {f.name}</li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-zinc-400 mt-1">Click or drag &amp; drop · {accept}</p>
      )}
    </div>
  );
}
