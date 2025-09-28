import { Link } from "react-router-dom";
import { Heart, MapPin, GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  images: string[];
  seller: {
    name: string;
    college: string;
    rating: number;
    isVerified: boolean;
  };
  condition: "New" | "Like New" | "Good" | "Fair";
  category: string;
  location: string;
  discounts?: {
    student: number; // percentage discount for students
    sameCampus: number; // additional discount for same campus
  };
  isFavorited?: boolean;
}

interface ProductCardProps {
  product: Product;
  currentUserCollege?: string; // Current user's college for discount calculation
  onToggleFavorite?: (productId: string) => void;
}

const ProductCard = ({ product, currentUserCollege, onToggleFavorite }: ProductCardProps) => {
  // Calculate final price with discounts
  const calculateFinalPrice = () => {
    let finalPrice = product.price;
    
    if (product.discounts?.student) {
      finalPrice = finalPrice * (1 - product.discounts.student / 100);
    }
    
    if (currentUserCollege && currentUserCollege === product.seller.college && product.discounts?.sameCampus) {
      finalPrice = finalPrice * (1 - product.discounts.sameCampus / 100);
    }
    
    return finalPrice;
  };

  const finalPrice = calculateFinalPrice();
  const hasDiscount = finalPrice < product.price;
  const totalDiscount = Math.round(((product.price - finalPrice) / product.price) * 100);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking favorite
    e.stopPropagation();
    onToggleFavorite?.(product.id);
  };

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="bg-card border rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 transform group-hover:scale-[1.02]">
        {/* Product Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Favorite Button */}
          <button
            onClick={handleFavoriteToggle}
            className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
          >
            <Heart 
              className={`h-4 w-4 ${
                product.isFavorited 
                  ? "fill-destructive text-destructive" 
                  : "text-muted-foreground hover:text-destructive"
              }`}
            />
          </button>

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 left-3">
              <Badge variant="destructive" className="bg-accent text-accent-foreground">
                {totalDiscount}% OFF
              </Badge>
            </div>
          )}

          {/* Condition Badge */}
          <div className="absolute bottom-3 left-3">
            <Badge 
              variant="secondary" 
              className={
                product.condition === "New" 
                  ? "bg-success text-success-foreground" 
                  : "bg-secondary text-secondary-foreground"
              }
            >
              {product.condition}
            </Badge>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4 space-y-3">
          {/* Title and Category */}
          <div>
            <h3 className="font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>

          {/* Pricing */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-primary">
              ${finalPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Discount Details */}
          {product.discounts && (
            <div className="space-y-1">
              <div className="flex items-center space-x-1 text-xs text-success">
                <GraduationCap className="h-3 w-3" />
                <span>{product.discounts.student}% student discount</span>
              </div>
              {currentUserCollege === product.seller.college && product.discounts.sameCampus > 0 && (
                <div className="flex items-center space-x-1 text-xs text-secondary">
                  <Users className="h-3 w-3" />
                  <span>+{product.discounts.sameCampus}% same campus bonus</span>
                </div>
              )}
            </div>
          )}

          {/* Seller Info */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-xs text-primary-foreground font-medium">
                  {product.seller.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">
                  {product.seller.name}
                  {product.seller.isVerified && (
                    <span className="ml-1 text-success">✓</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">{product.seller.college}</p>
              </div>
            </div>
            
            {/* Location */}
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              <span>{product.location}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;