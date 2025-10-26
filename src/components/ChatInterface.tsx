import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Send, Image, Code, Loader2, Sparkles } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
  type?: "text" | "image" | "code";
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"chat" | "image" | "code">("chat");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat-ai", {
        body: { message: input, mode }
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response,
        type: mode === "image" ? "image" : mode === "code" ? "code" : "text"
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to get response",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Mode Selector */}
      <div className="flex gap-2 p-4 border-b border-border/50">
        <Button
          variant={mode === "chat" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("chat")}
          className="gap-2"
        >
          <Send className="w-4 h-4" />
          Chat
        </Button>
        <Button
          variant={mode === "image" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("image")}
          className="gap-2"
        >
          <Image className="w-4 h-4" />
          Image
        </Button>
        <Button
          variant={mode === "code" ? "default" : "outline"}
          size="sm"
          onClick={() => setMode("code")}
          className="gap-2"
        >
          <Code className="w-4 h-4" />
          Code
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-float">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to AltraChat
            </h2>
            <p className="text-muted-foreground">
              Ask anything, generate images, or get coding help!
            </p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground"
                  : "bg-card border border-border"
              }`}
            >
              {msg.type === "image" && msg.role === "assistant" ? (
                <img src={msg.content} alt="Generated" className="rounded-lg max-w-full" />
              ) : msg.type === "code" ? (
                <pre className="text-sm overflow-x-auto">
                  <code>{msg.content}</code>
                </pre>
              ) : (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-card border border-border rounded-2xl px-4 py-3">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={
              mode === "image"
                ? "Describe the image you want to generate..."
                : mode === "code"
                ? "Ask for coding help..."
                : "Type your message..."
            }
            className="resize-none bg-background"
            rows={3}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="h-full bg-gradient-to-br from-primary to-secondary hover:opacity-90"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
