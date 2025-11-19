import { Brain, Zap, Shield, FileText, Download, Star } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

const features = [
  {
    icon: Brain,
    title: "Advanced AI Analysis",
    description: "Our AI understands context and creates notes that capture key concepts and learning objectives.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate comprehensive notes in seconds, not hours. Save time for actual studying.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your documents are encrypted and never shared. Complete privacy guaranteed.",
  },
  {
    icon: FileText,
    title: "Multiple Formats",
    description: "Export notes as PDF, Word, Markdown, or sync with popular note-taking apps.",
  },
  {
    icon: Download,
    title: "Offline Access",
    description: "Download your notes and access them anywhere, anytime, even without internet.",
  },
  {
    icon: Star,
    title: "Smart Highlights",
    description: "Important concepts are automatically highlighted and organized for easy review.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Powerful <span className="bg-gradient-hero bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create perfect study notes from any syllabus
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-soft group"
            >
              <CardContent className="p-6 space-y-4">
                <div className="relative w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-gradient-hero group-hover:shadow-soft transition-all duration-300">
                  <feature.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
