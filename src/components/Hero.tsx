import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, Zap, ArrowRight, Play, Sparkles, Bitcoin, Circle } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Hero = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 3);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles with different properties
    const particles = [];
    const particleCount = 150;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.1,
        direction: Math.random() * Math.PI * 2,
        wobble: Math.random() * 0.05,
        wobbleSpeed: Math.random() * 0.05 + 0.01
      });
    }
    
    // Create connections between particles
    const drawConnections = (particles, maxDistance) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 1.5
      );
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.8)');
      gradient.addColorStop(0.4, 'rgba(15, 23, 42, 0.6)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.2)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        // Update position with wobble
        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;
        particle.direction += Math.sin(Date.now() * 0.001) * particle.wobble;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
        ctx.fill();
      });
      
      // Draw connections
      drawConnections(particles, 150);
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated canvas background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
        style={{ background: 'linear-gradient(125deg, #0f172a 0%, #1e293b 50%, #334155 100%)' }}
      />
      
      {/* Floating crypto icons */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-primary/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${Math.random() * 2 + 1}rem`
            }}
          >
            {i % 2 === 0 ? <Bitcoin size={40} /> : <Circle className="text-purple-500/20" size={40} />}
          </div>
        ))}
      </div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated trust badge */}
          <div className="inline-flex items-center justify-center mb-8 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Trusted by 500K+ users worldwide</span>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-muted-foreground text-sm">
            <div className="flex items-center space-x-2 bg-muted/50 px-3 py-1.5 rounded-lg backdrop-blur-sm">
              <div className="p-1 bg-primary/10 rounded-full">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <span>Bank-Level Security</span>
            </div>
            <div className="flex items-center space-x-2 bg-muted/50 px-3 py-1.5 rounded-lg backdrop-blur-sm">
              <div className="p-1 bg-green-500/10 rounded-full">
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <span>Real-Time Trading</span>
            </div>
            <div className="flex items-center space-x-2 bg-muted/50 px-3 py-1.5 rounded-lg backdrop-blur-sm">
              <div className="p-1 bg-blue-500/10 rounded-full">
                <Zap className="w-4 h-4 text-blue-500" />
              </div>
              <span>Lightning Fast</span>
            </div>
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            <span className="inline-block">Trade Crypto</span>
            <br />
            <span className="inline-block bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent relative">
              with Confidence
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-purple-600 rounded-full"></div>
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the most secure and user-friendly cryptocurrency platform. 
            Start trading with institutional-grade security and zero complexity.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button variant="default" size="lg" className="w-full sm:w-auto text-lg px-8 py-4 group relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                Start Trading Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600 transition-all duration-300 group-hover:scale-105"></div>
            </Button>
            
            <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4 group border-foreground/20 text-foreground">
              <span className="relative z-10 flex items-center">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </span>
            </Button>
          </div>
          
          {/* Animated Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6 rounded-xl bg-muted/30 border border-border/50 backdrop-blur-sm hover:bg-muted/50 transition-colors">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">$2.5B+</div>
              <div className="text-muted-foreground">Trading Volume</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-muted/30 border border-border/50 backdrop-blur-sm hover:bg-muted/50 transition-colors">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-muted/30 border border-border/50 backdrop-blur-sm hover:bg-muted/50 transition-colors">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating crypto cards */}
      <div className="absolute bottom-20 left-10 hidden lg:block">
        <div className="relative w-40 h-48 bg-gradient-to-br from-blue-500/10 to-blue-700/10 border border-blue-500/20 rounded-2xl p-4 backdrop-blur-sm rotate-12 shadow-lg animate-float">
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            <div className="w-6 h-6 bg-blue-500/30 rounded-full"></div>
          </div>
          <div className="mt-6">
            <div className="h-4 bg-blue-500/30 rounded-full mb-2"></div>
            <div className="h-4 bg-blue-500/20 rounded-full w-2/3"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-20 right-10 hidden lg:block">
        <div className="relative w-40 h-48 bg-gradient-to-br from-purple-500/10 to-purple-700/10 border border-purple-500/20 rounded-2xl p-4 backdrop-blur-sm -rotate-12 shadow-lg animate-float" style={{ animationDelay: '2s' }}>
          <div className="flex justify-between items-start">
            <div className="w-8 h-8 bg-purple-500 rounded-full"></div>
            <div className="w-6 h-6 bg-purple-500/30 rounded-full"></div>
          </div>
          <div className="mt-6">
            <div className="h-4 bg-purple-500/30 rounded-full mb-2"></div>
            <div className="h-4 bg-purple-500/20 rounded-full w-2/3"></div>
          </div>
        </div>
      </div>
      
      {/* Custom animations */}
      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(12deg); }
          33% { transform: translateY(-20px) rotate(15deg); }
          66% { transform: translateY(10px) rotate(9deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        .animate-float {
          animation: float 8s infinite ease-in-out;
        }
        
        .animate-pulse {
          animation: pulse 4s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Hero;