import { Button } from "./ui/button";
import { Sparkles, Shield, History, Bolt } from "lucide-react";

interface LandingPageProps {
  onSignIn: () => void;
}

const LandingPage = ({ onSignIn }: LandingPageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#667eea] animate-gradient-shift">
      <div className="max-w-md w-full">
        <div className="bg-white/95 dark:bg-card/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Logo */}
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 animate-float">
            <Sparkles className="w-10 h-10 text-white" />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
            AltraChat
          </h1>
          
          <p className="text-center text-muted-foreground mb-8 text-lg">
            Sign in to start chatting with AI
          </p>

          {/* Sign In Button */}
          <Button
            onClick={onSignIn}
            size="lg"
            className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-xl py-6 mb-6 shadow-sm"
            variant="outline"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </Button>

          {/* Features */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Bolt className="w-4 h-4 text-primary" />
              <span>Powered by Advanced AI</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Shield className="w-4 h-4 text-primary" />
              <span>Secure and private conversations</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <History className="w-4 h-4 text-primary" />
              <span>Chat history saved locally</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Powered by <span className="font-semibold text-foreground">AltraCloud</span>
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Created by Mr. Masum Ahmed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
