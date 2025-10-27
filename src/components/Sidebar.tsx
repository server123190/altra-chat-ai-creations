import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Plus, MessageSquare, Trash2, LogOut, Download } from "lucide-react";
import { User } from "firebase/auth";
import { useState, useEffect } from "react";
import { useToast } from "./ui/use-toast";

interface Chat {
  id: string;
  title: string;
  createdAt: string;
}

interface SidebarProps {
  user: User;
  chats: Chat[];
  currentChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  onSignOut: () => void;
  isOpen?: boolean;
}

const Sidebar = ({
  user,
  chats,
  currentChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onSignOut,
  isOpen = false
}: SidebarProps) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallButton(false);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      toast({
        title: "Install AltraChat",
        description: "Use your browser's menu to install this app",
      });
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      toast({
        title: "Success!",
        description: "AltraChat has been installed",
      });
      setShowInstallButton(false);
    }
    
    setDeferredPrompt(null);
  };

  return (
    <div className={`w-[280px] bg-sidebar-bg border-r border-border flex flex-col h-full fixed lg:relative z-50 transition-transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Header */}
      <div className="p-6 border-b border-border flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">AC</span>
        </div>
        <h2 className="text-lg font-semibold">AltraChat</h2>
      </div>

      {/* New Chat Button */}
      <div className="p-4 space-y-2">
        <Button
          onClick={onNewChat}
          className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Chat
        </Button>
        
        {showInstallButton && (
          <Button
            onClick={handleInstallClick}
            variant="outline"
            className="w-full rounded-xl"
          >
            <Download className="w-4 h-4 mr-2" />
            Install App
          </Button>
        )}
      </div>

      {/* Chat History */}
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1">
          <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Recent Chats
          </div>
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`group flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all border-l-2 ${
                currentChatId === chat.id
                  ? 'bg-sidebar-active border-l-primary'
                  : 'border-l-transparent hover:bg-sidebar-hover'
              }`}
              onClick={() => onSelectChat(chat.id)}
            >
              <MessageSquare className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="flex-1 text-sm font-medium truncate">{chat.title}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteChat(chat.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-destructive/10 rounded-md transition-all"
              >
                <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* User Info */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
            {user.displayName?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">{user.displayName}</div>
            <div className="text-xs text-muted-foreground truncate">{user.email}</div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onSignOut}
            className="hover:bg-sidebar-hover hover:text-destructive flex-shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
