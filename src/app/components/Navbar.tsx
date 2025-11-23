import Link from "next/link";
import { Button } from "./ui/button";
import { BookOpen } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text">
              EduKai
            </span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-foreground/80 hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-foreground/80 hover:text-foreground transition-colors">
            How it Works
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/new-subject">
            <Button variant="hero" size="sm" className=" bg-white text-black hover:bg-black hover:text-white">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
