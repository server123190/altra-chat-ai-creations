import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "./ui/button";

interface MessageProps {
  content: string;
  sender: "user" | "ai";
  timestamp: string;
}

const Message = ({ content, sender, timestamp }: MessageProps) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const formatContent = (text: string) => {
    // Check if content has images (markdown or base64)
    if (text.includes('![') || text.includes('data:image')) {
      const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
      const parts = text.split(imageRegex);
      
      return parts.map((part, index) => {
        // Every third item starting from index 2 is an image URL
        if (index % 3 === 2) {
          return (
            <img 
              key={index}
              src={part}
              alt={parts[index - 1] || 'Generated image'}
              className="my-3 rounded-lg max-w-full h-auto"
              style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
          );
        } else if (index % 3 === 1) {
          // Skip alt text as it's used in the img tag
          return null;
        }
        return <span key={index}>{part}</span>;
      });
    }
    
    // Check if content has code blocks
    if (text.includes('```')) {
      const parts = text.split('```');
      return parts.map((part, index) => {
        if (index % 2 === 1) {
          // This is a code block
          const lines = part.split('\n');
          const language = lines[0].trim();
          const code = lines.slice(1).join('\n').trim();
          
          return (
            <div key={index} className="relative my-3 rounded-lg overflow-hidden bg-muted">
              {language && (
                <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border">
                  {language}
                </div>
              )}
              <pre className="p-4 overflow-x-auto text-sm">
                <code>{code}</code>
              </pre>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 h-8 px-2"
                onClick={() => copyToClipboard(code)}
              >
                {copiedCode === code ? (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          );
        }
        // Regular text
        return (
          <span key={index} className="whitespace-pre-wrap">
            {part}
          </span>
        );
      });
    }

    return <span className="whitespace-pre-wrap">{text}</span>;
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
    >
      <div
        className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
          sender === 'user'
            ? 'bg-primary text-primary-foreground rounded-br-sm'
            : 'bg-card border border-border rounded-bl-sm'
        }`}
      >
        <div className="text-sm leading-relaxed">
          {formatContent(content)}
        </div>
        <div className={`text-xs mt-2 ${sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
          {formatTime(timestamp)}
        </div>
      </div>
    </div>
  );
};

export default Message;
