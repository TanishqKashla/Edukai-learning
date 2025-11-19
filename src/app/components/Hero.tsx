import Link from "next/link";
import { Button } from "../components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "../assets/hero-illustration.jpg";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-subtle">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary font-medium">
              <Sparkles className="h-4 w-4" />
              AI-Powered Note Generation
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Transform Your{" "}
              <span className="bg-gradient-hero bg-clip-text ">
                Syllabus
              </span>{" "}
              into Perfect Notes
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Upload your course syllabus and let AI create comprehensive, 
              organized study notes in seconds. Save hours of manual work 
              and focus on what matters—learning.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/new-subject">
                <Button variant="hero" size="lg" className="group hover:bg-white hover:text-black border border-white">
                    Start Generating Notes
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                {/* <div className="text-2xl font-bold text-foreground">10,000+</div> */}
                {/* <div className="text-sm text-muted-foreground">Notes Generated</div> */}
                <div className="text-foreground">Notes Generated</div>
              </div>
              <div className="h-12 w-px bg-border border" />
              <div>
                {/* <div className="text-2xl font-bold text-foreground">5,000+</div> */}
                {/* <div className="text-sm text-muted-foreground">Happy Students</div> */}
                <div className="text-foreground">Happy Students</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-hero opacity-20 blur-3xl rounded-full" />
            <img
              src={heroImage.src}
              alt="AI Notes Generation Illustration"
              className="relative rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
