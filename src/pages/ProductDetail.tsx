import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Heart, 
  Share2, 
  MapPin, 
  Star, 
  Shield, 
  MessageCircle, 
  GraduationCap, 
  Users,
  ArrowLeft,
  Plus,
  Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Mock product data - Replace with API call
const mockProduct = {
  id: "1",
  title: "MacBook Air M2 - Perfect for CS Students",
  description: "Excellent condition MacBook Air with M2 chip, 8GB RAM, and 256GB storage. Perfect for computer science students and coding. Comes with original charger and box. Used for only 6 months, upgrading to a Pro model. No scratches or damage.",
  price: 999,
  originalPrice: 1199,
  images: [
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
    "https://images.unsplash.com/photo-1504707748692-419802cf939d?w=800"
  ],
  seller: {
    id: "seller1",
    name: "Sarah Chen",
    college: "Stanford University", 
    rating: 4.9,
    reviewCount: 47,
    isVerified: true,
    memberSince: "September 2023",
    responseTime: "Usually responds within 2 hours"
  },
  condition: "Like New",
  category: "Electronics",
  subcategory: "Laptops",
  location: "Palo Alto, CA",
  discounts: {
    student: 15,
    sameCampus: 5
  },
  specifications: {
    "Brand": "Apple",
    "Model": "MacBook Air M2",
    "RAM": "8GB",
    "Storage": "256GB SSD",
    "Screen Size": "13.6 inches",
    "Color": "Space Gray"
  },
  tags: ["programming", "student", "laptop", "apple"],
  views: 234,
  favorites: 18,
  postedDate: "2 days ago"
};

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  
  // Mock current user data
  const currentUser = {
    college: "Stanford University",
    isVerified: true
  };

  // Calculate discounted price
  const calculateFinalPrice = () => {
    let finalPrice = mockProduct.price;
    
    if (mockProduct.discounts.student) {
      finalPrice = finalPrice * (1 - mockProduct.discounts.student / 100);
    }
    
    if (currentUser.college === mockProduct.seller.college && mockProduct.discounts.sameCampus) {
      finalPrice = finalPrice * (1 - mockProduct.discounts.sameCampus / 100);
    }
    
    return finalPrice;
  };

  const finalPrice = calculateFinalPrice();
  const totalDiscount = Math.round(((mockProduct.price - finalPrice) / mockProduct.price) * 100);
  const savings = mockProduct.price - finalPrice;

  const handleAddToCart = () => {
    console.log("Adding to cart:", { productId: id, quantity });
    // This will integrate with cart system when backend is connected
  };

  const handleBuyNow = () => {
    console.log("Buy now:", { productId: id, quantity });
    // This will redirect to checkout when payment system is connected
  };

  const handleContactSeller = () => {
    console.log("Contact seller:", mockProduct.seller.id);
    // This will open chat when messaging system is connected
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/browse" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Browse</span>
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-muted rounded-xl overflow-hidden">
              <img
                src={mockProduct.images[selectedImageIndex]}
                alt={mockProduct.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {mockProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square bg-muted rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index 
                      ? "border-primary" 
                      : "border-transparent hover:border-muted-foreground"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${mockProduct.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Title and Actions */}
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-2xl lg:text-3xl font-bold mb-2">{mockProduct.title}</h1>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>{mockProduct.category}</span>
                  <span>•</span>
                  <span>{mockProduct.postedDate}</span>
                  <span>•</span>
                  <span>{mockProduct.views} views</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Heart className={`h-5 w-5 ${isFavorited ? "fill-destructive text-destructive" : ""}`} />
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Pricing */}
            <div className="space-y-3">
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl font-bold text-primary">
                  ${finalPrice.toFixed(2)}
                </span>
                {savings > 0 && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${mockProduct.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              {savings > 0 && (
                <div className="space-y-2">
                  <Badge variant="destructive" className="bg-accent text-accent-foreground">
                    {totalDiscount}% OFF - Save ${savings.toFixed(2)}
                  </Badge>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm text-success">
                      <GraduationCap className="h-4 w-4" />
                      <span>{mockProduct.discounts.student}% student discount applied</span>
                    </div>
                    
                    {currentUser.college === mockProduct.seller.college && (
                      <div className="flex items-center space-x-2 text-sm text-secondary">
                        <Users className="h-4 w-4" />
                        <span>+{mockProduct.discounts.sameCampus}% same campus bonus</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Condition and Location */}
            <div className="flex items-center space-x-4">
              <Badge 
                variant="secondary"
                className={
                  mockProduct.condition === "New" 
                    ? "bg-success text-success-foreground" 
                    : "bg-secondary text-secondary-foreground"
                }
              >
                {mockProduct.condition}
              </Badge>
              
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{mockProduct.location}</span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="font-medium">Quantity</label>
              <div className="flex items-center space-x-3">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
                onClick={handleBuyNow}
              >
                Buy Now - ${(finalPrice * quantity).toFixed(2)}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              
              <Button 
                variant="secondary" 
                size="lg" 
                className="w-full"
                onClick={handleContactSeller}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Message Seller
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="bg-muted/30 rounded-lg p-4 space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="h-4 w-4 text-success" />
                <span>Protected purchase with StudentMart guarantee</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <GraduationCap className="h-4 w-4 text-primary" />
                <span>Both buyer and seller are verified students</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{mockProduct.description}</p>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Specifications</h2>
              <div className="space-y-2">
                {Object.entries(mockProduct.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b">
                    <span className="font-medium">{key}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {mockProduct.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Seller Information */}
          <div className="bg-card rounded-xl p-6 shadow-card h-fit space-y-6">
            <h2 className="text-xl font-semibold">Seller Information</h2>
            
            {/* Seller Profile */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                    {mockProduct.seller.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold">{mockProduct.seller.name}</h3>
                    {mockProduct.seller.isVerified && (
                      <Badge variant="outline" className="border-success text-success">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{mockProduct.seller.college}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-medium">{mockProduct.seller.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({mockProduct.seller.reviewCount} reviews)
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Member since {mockProduct.seller.memberSince}</p>
                <p>{mockProduct.seller.responseTime}</p>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button variant="hero" className="w-full" onClick={handleContactSeller}>
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Seller
              </Button>
              
              <Button variant="outline" className="w-full" asChild>
                <Link to={`/seller/${mockProduct.seller.id}`}>
                  View Profile
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;