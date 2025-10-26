import { Button } from "./ui/button";
import { Sparkles, LogOut } from "lucide-react";
import { User } from "firebase/auth";

interface HeaderProps {
  user: User | null;
  onSignOut: () => void;
}

const Header = ({ user, onSignOut }: HeaderProps) => {
  return (
    <header className="border-b border-border/50 backdrop-blur-sm bg-card/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-glow">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AltraChat
            </h1>
            <p className="text-xs text-muted-foreground">by AltraCloud</p>
          </div>
        </div>
        
        {user && (
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2">
              <img 
                src={user.photoURL || "https://via.placeholder.com/40"} 
                alt={user.displayName || "User"} 
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm text-foreground">{user.displayName}</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onSignOut}
              className="hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
