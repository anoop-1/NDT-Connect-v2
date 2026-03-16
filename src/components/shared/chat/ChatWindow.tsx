// src/components/shared/chat/ChatWindow.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { User } from "@/lib/types";
import type { ChatMessage as MessageType } from "@/lib/types";

interface ChatWindowProps {
  currentUser: User | null; // Can be client or provider
  otherPartyName: string;
  otherPartyRole: 'client' | 'provider';
  requestId: string; // To scope messages if stored locally
}

const MOCK_PROVIDER_RESPONSES = [
  "Understood, I'll look into that.",
  "Thanks for the update!",
  "Okay, I'll get back to you shortly.",
  "Processing your request...",
  "Let me check on that for you.",
];

export function ChatWindow({ currentUser, otherPartyName, otherPartyRole, requestId }: ChatWindowProps) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isSending, setIsSending] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Load initial messages from localStorage (scoped by requestId)
  useEffect(() => {
    const storedMessages = localStorage.getItem(`chat_${requestId}`);
    if (storedMessages) {
      try {
        setMessages(JSON.parse(storedMessages));
      } catch (e) {
        console.error("Failed to parse stored chat messages", e);
        localStorage.removeItem(`chat_${requestId}`); // Clear corrupted data
      }
    } else {
        // Add an initial system message if no messages are stored
        setMessages([
          {
            id: `sys-${Date.now()}`,
            text: `Chat started with ${otherPartyName} (${otherPartyRole}). This is a simulated chat.`,
            senderId: "system",
            timestamp: new Date().toISOString(),
          }
        ]);
    }
  }, [requestId, otherPartyName, otherPartyRole]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) { // Only save if there are messages (to avoid empty storage item)
        localStorage.setItem(`chat_${requestId}`, JSON.stringify(messages));
    }
  }, [messages, requestId]);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!currentUser) return;
    setIsSending(true);

    const newMessage: MessageType = {
      id: `${currentUser.id}-${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // Simulate provider response
    setTimeout(() => {
      const randomResponse = MOCK_PROVIDER_RESPONSES[Math.floor(Math.random() * MOCK_PROVIDER_RESPONSES.length)];
      const providerResponse: MessageType = {
        id: `provider-${Date.now()}`,
        senderId: "provider-simulated", // Simulated provider ID
        text: randomResponse,
        timestamp: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, providerResponse]);
      setIsSending(false);
    }, 1000 + Math.random() * 1000);
  };
  
  if (!currentUser) {
    return <p className="text-muted-foreground text-sm p-4">Login to use chat.</p>;
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            message={msg}
            isCurrentUser={msg.senderId === currentUser.id}
            userName={currentUser.name || "You"}
            otherUserName={otherPartyName}
          />
        ))}
      </ScrollArea>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isSending} />
    </div>
  );
}
