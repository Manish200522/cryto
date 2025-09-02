import { Shield, Zap, PieChart, Users, Lock, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const features = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "Your funds are protected with military-grade encryption and cold storage technology.",
    gradient: "from-blue-500/20 to-blue-700/20"
  },
  {
    icon: Zap,
    title: "Lightning Fast Trades",
    description: "Execute trades in milliseconds with our advanced matching engine and real-time data.",
    gradient: "from-purple-500/20 to-purple-700/20"
  },
  {
    icon: PieChart,
    title: "Ultra-Low Fees",
    description: "Enjoy competitive trading fees starting from 0.1% with our tiered fee structure.",
    gradient: "from-green-500/20 to-green-700/20"
  },
  {
    icon: Users,
    title: "24/7 Expert Support",
    description: "Get help when you need it with our around-the-clock customer support team.",
    gradient: "from-orange-500/20 to-orange-700/20"
  },
  {
    icon: Lock,
    title: "Secure Wallets",
    description: "Multi-signature wallets with hardware security modules for maximum protection.",
    gradient: "from-red-500/20 to-red-700/20"
  },
  {
    icon: TrendingUp,
    title: "Advanced Analytics",
    description: "Professional trading tools with real-time charts and technical indicators.",
    gradient: "from-cyan-500/20 to-cyan-700/20"
  }
];

const Features = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [visibleFeatures, setVisibleFeatures] = useState([]);

  useEffect(() => {
    // Animate features in one by one
    const timer = setTimeout(() => {
      setVisibleFeatures([0]);
    }, 100);

    const intervals = features.map((_, i) => {
      return setTimeout(() => {
        setVisibleFeatures(prev => [...prev, i]);
      }, 200 * (i + 1));
    });

    return () => {
      clearTimeout(timer);
      intervals.forEach(interval => clearTimeout(interval));
    };
  }, []);

  return (
    <section id="features" className="py-20 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Premium Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Choose <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">CryptoCoin</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built for both beginners and professionals, our platform combines ease of use 
            with enterprise-grade security and features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-sm transition-all duration-500 transform ${
                visibleFeatures.includes(index) 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              } ${
                hoveredIndex === index 
                  ? "shadow-xl -translate-y-2 border-primary/30" 
                  : "shadow-md hover:shadow-lg"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 ${
                hoveredIndex === index ? "opacity-100" : ""
              }`}></div>
              
              <div className="relative z-10 p-8">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 transition-transform duration-300 ${
                  hoveredIndex === index ? "scale-110" : ""
                }`}>
                  <div className="w-12 h-12 bg-background/80 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center">
                  {feature.title}
                  {hoveredIndex === index && (
                    <ArrowRight className="w-5 h-5 ml-2 text-primary transition-all duration-300" />
                  )}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hover effect line */}
                <div className={`h-0.5 bg-gradient-to-r from-primary to-purple-600 mt-4 transition-all duration-300 ${
                  hoveredIndex === index ? "w-full" : "w-0"
                }`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 rounded-xl bg-gradient-to-b from-muted/30 to-muted/10 border border-border/50 backdrop-blur-sm">
            <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-muted-foreground">Uptime</div>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-b from-muted/30 to-muted/10 border border-border/50 backdrop-blur-sm">
            <div className="text-3xl font-bold text-primary mb-2">500K+</div>
            <div className="text-muted-foreground">Users</div>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-b from-muted/30 to-muted/10 border border-border/50 backdrop-blur-sm">
            <div className="text-3xl font-bold text-primary mb-2">150+</div>
            <div className="text-muted-foreground">Countries</div>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-b from-muted/30 to-muted/10 border border-border/50 backdrop-blur-sm">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;