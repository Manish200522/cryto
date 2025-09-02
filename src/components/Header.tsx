import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-5"}`}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3 z-10">
              {/* <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 12h8"></path>
                    <path d="M12 8v8"></path>
                  </svg>
                </div>
                <div className="absolute -inset-1.5 bg-primary/30 rounded-xl blur-sm -z-10"></div>
              </div> */}
              <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">CryptoCoin</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className=" text-muted-foreground hover:text-foreground transition-all duration-300 flex flex-col items-center">
                <span>Features</span>
                <div className="h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a href="#markets" className=" text-muted-foreground hover:text-foreground transition-all duration-300 flex flex-col items-center">
                <span>Markets</span>
                <div className="h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a href="#about" className=" text-muted-foreground hover:text-foreground transition-all duration-300 flex flex-col items-center">
                <span>About</span>
                <div className="h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </a>
              <a href="#pricing" className=" text-muted-foreground hover:text-foreground transition-all duration-300 flex flex-col items-center">
                <span>Pricing</span>
                <div className="h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"></div>
              </a>
            </nav>
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-3 z-10">
              <Button variant="ghost" className="hidden md:inline-flex transition-all duration-300 hover:scale-105">
                Sign In
              </Button>
              <Button variant="cta" className="relative overflow-hidden group">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 transition-all duration-300 group-hover:scale-110"></div>
              </Button>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden ml-2 p-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div className="w-5 h-5 flex flex-col justify-center space-y-1.5">
                  <span className={`block h-0.5 w-5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block h-0.5 w-5 bg-foreground transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`block h-0.5 w-5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-lg border-b border-border transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 py-4' : 'max-h-0'}`}>
          <div className="container mx-auto px-4">
            <nav className="flex flex-col space-y-4">
              <a href="#features" className="py-2 text-muted-foreground hover:text-foreground transition-colors border-l-2 border-transparent hover:border-primary hover:pl-2">
                Features
              </a>
              <a href="#markets" className="py-2 text-muted-foreground hover:text-foreground transition-colors border-l-2 border-transparent hover:border-primary hover:pl-2">
                Markets
              </a>
              <a href="#about" className="py-2 text-muted-foreground hover:text-foreground transition-colors border-l-2 border-transparent hover:border-primary hover:pl-2">
                About
              </a>
              <a href="#pricing" className="py-2 text-muted-foreground hover:text-foreground transition-colors border-l-2 border-transparent hover:border-primary hover:pl-2">
                Pricing
              </a>
              <div className="pt-4 border-t border-border mt-2 flex flex-col space-y-3">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
                <Button variant="cta" className="w-full">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Add some spacing so content isn't hidden behind fixed header */}
      <div className="h-20"></div>
    </>
  );
};

export default Header;