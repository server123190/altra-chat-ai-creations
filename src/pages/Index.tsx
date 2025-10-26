import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { auth, signInWithGoogle, logOut } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import LandingPage from "@/components/LandingPage";
import ChatInterface from "@/components/ChatInterface";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast({
        title: "Welcome!",
        description: "Successfully signed in with Google",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      toast({
        title: "Signed out",
        description: "Successfully signed out",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <LandingPage onSignIn={handleSignIn} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={user} onSignOut={handleSignOut} />
      <main className="flex-1">
        <ChatInterface />
      </main>
    </div>
  );
};

export default Index;
