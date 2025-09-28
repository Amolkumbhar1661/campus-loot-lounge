import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, TrendingUp, Shield, Users, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/ProductCard";
import heroImage from "@/assets/hero-marketplace.jpg";

// Mock data - Replace with API calls when backend is connected
const featuredProducts = [
  {
    id: "1",
    title: "MacBook Air M2 - Perfect for CS Students",
    price: 999,
    originalPrice: 1199,
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"],
    seller: {
      name: "Sarah Chen",
      college: "Stanford University",
      rating: 4.9,
      isVerified: true
    },
    condition: "Like New" as const,
    category: "Electronics",
    location: "Palo Alto, CA",
    discounts: {
      student: 15,
      sameCampus: 5
    },
    isFavorited: false
  },
  {
    id: "2",
    title: "Calculus Textbook - 12th Edition",
    price: 45,
    originalPrice: 89,
    images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400"],
    seller: {
      name: "Mike Rodriguez",
      college: "MIT",
      rating: 4.7,
      isVerified: true
    },
    condition: "Good" as const,
    category: "Textbooks",
    location: "Cambridge, MA",
    discounts: {
      student: 20,
      sameCampus: 10
    },
    isFavorited: true
  },
  {
    id: "3",
    title: "Dorm Mini Fridge - Compact & Clean",
    price: 120,
    images: ["https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400"],
    seller: {
      name: "Emma Thompson",
      college: "UCLA",
      rating: 4.8,
      isVerified: true
    },
    condition: "New" as const,
    category: "Dorm Essentials",
    location: "Los Angeles, CA",
    discounts: {
      student: 10,
      sameCampus: 5
    },
    isFavorited: false
  }
];

const stats = [
  { label: "Active Students", value: "50K+", icon: Users },
  { label: "Items Sold", value: "200K+", icon: TrendingUp },
  { label: "Universities", value: "500+", icon: Shield },
  { label: "Avg Savings", value: "35%", icon: Star }
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock user data - Replace with actual auth state
  const currentUser = {
    college: "Stanford University", // This would come from auth context
    isVerified: true
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/browse?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Hero Text */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                Buy & Sell with 
                <span className="block bg-gradient-to-r from-accent to-primary-light bg-clip-text text-transparent">
                  Student Discounts
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
                The marketplace built for students. Get verified student discounts up to 35% 
                and extra savings when buying from your campus community.
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for textbooks, electronics, furniture, and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-background/95 backdrop-blur border-0 shadow-glow"
                />
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  Search
                </Button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/browse" className="flex items-center space-x-2">
                  <span>Start Shopping</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                <Link to="/sell">Sell Your Items</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                  <stat.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover amazing deals from verified students in your area. 
              All items come with student discounts and campus bonuses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currentUserCollege={currentUser.college}
                onToggleFavorite={(id) => {
                  console.log("Toggle favorite for product:", id);
                  // This will be connected to backend later
                }}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/browse" className="flex items-center space-x-2">
                <span>View All Products</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose StudentMart?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-card rounded-xl shadow-card">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Students Only</h3>
              <p className="text-muted-foreground">
                All users are verified with their .edu email addresses for a safe, 
                trusted community marketplace.
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-xl shadow-card">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Student Discounts</h3>
              <p className="text-muted-foreground">
                Get automatic discounts on all purchases, plus extra savings when 
                buying from students at your campus.
              </p>
            </div>

            <div className="text-center p-6 bg-card rounded-xl shadow-card">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Campus Community</h3>
              <p className="text-muted-foreground">
                Connect with students from your university and nearby campuses 
                for easy local pickup and delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Start Saving?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of students who are already saving money and 
              decluttering their dorms with StudentMart.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/signup">Sign Up Free</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/browse">Browse Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;