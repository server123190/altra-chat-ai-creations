import { Button } from "./ui/button";
import { Sparkles, Image, Code, MessageSquare } from "lucide-react";

interface LandingPageProps {
  onSignIn: () => void;
}

const LandingPage = ({ onSignIn }: LandingPageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 animate-gradient-shift" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-float shadow-[0_0_50px_rgba(139,92,246,0.5)]">
          <Sparkles className="w-12 h-12 text-primary-foreground" />
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient-text">
          AltraChat
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-2">
          Powered by AltraCloud
        </p>
        
        <p className="text-sm text-muted-foreground/60 mb-12">
          Created by Mr. Masum Ahmed
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Chat</h3>
            <p className="text-sm text-muted-foreground">
              Intelligent conversations powered by advanced AI
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-secondary/10 flex items-center justify-center">
              <Image className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Image Generation</h3>
            <p className="text-sm text-muted-foreground">
              Create stunning visuals from text descriptions
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
              <Code className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Code Assistant</h3>
            <p className="text-sm text-muted-foreground">
              Get expert help with programming tasks
            </p>
          </div>
        </div>

        {/* CTA */}
        <Button
          onClick={onSignIn}
          size="lg"
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8 py-6 rounded-full shadow-[0_0_50px_rgba(139,92,246,0.5)] hover:shadow-[0_0_70px_rgba(139,92,246,0.7)] transition-all"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
