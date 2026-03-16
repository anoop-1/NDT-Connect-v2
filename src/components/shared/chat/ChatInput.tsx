
// src/components/shared/chat/ChatInput.tsx
"use client";

import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Paperclip } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isLoading?: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [inputText, setInputText] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText("");
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onSendMessage(`Attached file: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
      // Reset file input to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-4 border-t bg-background">
      <Button 
        type="button" 
        variant="ghost" 
        size="icon" 
        onClick={handleFileSelect} 
        disabled={isLoading}
        aria-label="Attach file"
      >
        <Paperclip className="h-4 w-4" />
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        // Example: accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx" 
      />
      <Input
        type="text"
        placeholder="Type your message..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isLoading}
        className="flex-grow"
      />
      <Button 
        type="submit" 
        disabled={isLoading || (!inputText.trim() && (!fileInputRef.current || !fileInputRef.current.files || fileInputRef.current.files.length === 0))} 
        size="icon"
        aria-label="Send message"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
