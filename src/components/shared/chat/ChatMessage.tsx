
// src/components/shared/chat/ChatMessage.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { ChatMessage as MessageType } from "@/lib/types"; // Assuming ChatMessage type will be added to lib/types

interface ChatMessageProps {
  message: MessageType;
  isCurrentUser: boolean;
  userName: string;
  otherUserName: string;
}

export function ChatMessage({ message, isCurrentUser, userName, otherUserName }: ChatMessageProps) {
  const senderName = isCurrentUser ? userName : otherUserName;
  const avatarFallback = senderName ? senderName.charAt(0).toUpperCase() : "U";

  return (
    <div
      className={cn(
        "flex items-end gap-2 my-2",
        isCurrentUser ? "justify-end" : "justify-start"
      )}
    >
      {!isCurrentUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://placehold.co/40x40/777/FFF.png" alt={otherUserName} data-ai-hint="avatar user" />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      )}
      <Card
        className={cn(
          "max-w-[70%] p-3 rounded-xl",
          isCurrentUser
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-muted text-foreground rounded-bl-none"
        )}
      >
        <p className="text-sm">{message.text}</p>
        <p className={cn(
            "text-xs mt-1",
            isCurrentUser ? "text-primary-foreground/70 text-right" : "text-muted-foreground/70 text-left"
          )}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </Card>
      {isCurrentUser && (
         <Avatar className="h-8 w-8">
          <AvatarImage src="https://placehold.co/40x40.png" alt={userName} data-ai-hint="user avatar" />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
