import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 px-4 bg-gradient-subtle">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative">
          <div className="absolute inset-0 bg-gradient-hero opacity-10 blur-3xl rounded-full" />
          
          <div className="relative">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your{" "}
              <span className="bg-gradient-hero bg-clip-text ">
                Study Experience?
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already studying smarter with AI-generated notes. 
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/new-subject">
                <Button variant="hero" size="lg" className="group hover:bg-white hover:text-black border border-white">
                    Get Started
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
