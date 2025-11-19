import { Upload, Sparkles, BookOpen } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

const steps = [
  {
    icon: Upload,
    title: "Upload Your Syllabus",
    description: "Simply upload your course syllabus in PDF, Word, or text format. Our AI accepts any document type.",
  },
  {
    icon: Sparkles,
    title: "AI Generates Notes",
    description: "Our advanced AI analyzes your syllabus and creates comprehensive, organized study notes in seconds.",
  },
  {
    icon: BookOpen,
    title: "Study Smarter",
    description: "Download your notes, review them online, or export to your favorite study platform. It's that easy!",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            How It <span className="bg-gradient-hero bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform your syllabus into perfect study notes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-soft group">
                <CardContent className="p-8 space-y-4">
                  <div className="relative">
                    <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-hero opacity-20 rounded-full blur-xl group-hover:opacity-40 transition-opacity" />
                    <div className="relative w-14 h-14 bg-gradient-hero rounded-xl flex items-center justify-center shadow-soft">
                      <step.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-primary-glow" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
