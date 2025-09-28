import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-card border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                StudentMart
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              The trusted marketplace for verified students. Buy and sell with exclusive 
              student discounts and connect with your campus community.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Marketplace</h3>
            <div className="space-y-2">
              <Link 
                to="/browse" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Browse Products
              </Link>
              <Link 
                to="/browse?category=Electronics" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Electronics
              </Link>
              <Link 
                to="/browse?category=Textbooks" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Textbooks
              </Link>
              <Link 
                to="/browse?category=Dorm Essentials" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Dorm Essentials
              </Link>
              <Link 
                to="/sell" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Sell Your Items
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <div className="space-y-2">
              <a 
                href="#" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Help Center
              </a>
              <a 
                href="#" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Safety Guidelines
              </a>
              <a 
                href="#" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Payment Protection
              </a>
              <a 
                href="#" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Student Verification
              </a>
              <a 
                href="#" 
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Get notified about new deals and campus-specific offers.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your .edu email"
                className="text-sm"
              />
              <Button variant="hero" size="sm" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © 2024 StudentMart. All rights reserved.
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6">
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>support@studentmart.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>1-800-STUDENT</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;