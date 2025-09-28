import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";

// Mock products data - Replace with API call
const mockProducts = [
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
    discounts: { student: 15, sameCampus: 5 },
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
    discounts: { student: 20, sameCampus: 10 },
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
    discounts: { student: 10, sameCampus: 5 },
    isFavorited: false
  },
  {
    id: "4",
    title: "Chemistry Lab Goggles & Notebook Set",
    price: 25,
    images: ["https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400"],
    seller: {
      name: "Alex Johnson",
      college: "Stanford University",
      rating: 4.6,
      isVerified: true
    },
    condition: "New" as const,
    category: "School Supplies",
    location: "Palo Alto, CA",
    discounts: { student: 15, sameCampus: 5 },
    isFavorited: false
  },
  // Add more products...
];

const categories = [
  "All Categories",
  "Textbooks",
  "Electronics", 
  "Dorm Essentials",
  "School Supplies",
  "Furniture",
  "Clothing",
  "Sports & Recreation"
];

const conditions = ["All Conditions", "New", "Like New", "Good", "Fair"];

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedCondition, setSelectedCondition] = useState("All Conditions");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [showStudentOnly, setShowStudentOnly] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  // Mock user data
  const currentUser = {
    college: "Stanford University",
    isVerified: true
  };

  // Filter products based on current filters
  useEffect(() => {
    let filtered = [...mockProducts];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "All Categories") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Condition filter
    if (selectedCondition !== "All Conditions") {
      filtered = filtered.filter(product => product.condition === selectedCondition);
    }

    // Price range filter
    filtered = filtered.filter(product => {
      const finalPrice = calculateFinalPrice(product);
      return finalPrice >= priceRange[0] && finalPrice <= priceRange[1];
    });

    // Student verified filter
    if (showStudentOnly) {
      filtered = filtered.filter(product => product.seller.isVerified);
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => calculateFinalPrice(a) - calculateFinalPrice(b));
        break;
      case "price-high":
        filtered.sort((a, b) => calculateFinalPrice(b) - calculateFinalPrice(a));
        break;
      case "discount":
        filtered.sort((a, b) => {
          const discountA = ((a.price - calculateFinalPrice(a)) / a.price) * 100;
          const discountB = ((b.price - calculateFinalPrice(b)) / b.price) * 100;
          return discountB - discountA;
        });
        break;
      default: // newest
        // In a real app, this would sort by creation date
        break;
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, selectedCondition, priceRange, showStudentOnly, sortBy]);

  // Calculate final price with discounts
  const calculateFinalPrice = (product: any) => {
    let finalPrice = product.price;
    if (product.discounts?.student) {
      finalPrice = finalPrice * (1 - product.discounts.student / 100);
    }
    if (currentUser.college === product.seller.college && product.discounts?.sameCampus) {
      finalPrice = finalPrice * (1 - product.discounts.sameCampus / 100);
    }
    return finalPrice;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(searchQuery ? { search: searchQuery } : {});
  };

  const clearFilters = () => {
    setSelectedCategory("All Categories");
    setSelectedCondition("All Conditions");
    setPriceRange([0, 1000]);
    setShowStudentOnly(true);
    setSearchQuery("");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Browse Products</h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3"
              />
              <Button 
                type="submit" 
                variant="hero" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Filter Toggle & View Options */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </Button>
              
              {/* Active Filters */}
              <div className="flex flex-wrap gap-2">
                {selectedCategory !== "All Categories" && (
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <span>{selectedCategory}</span>
                    <button onClick={() => setSelectedCategory("All Categories")}>×</button>
                  </Badge>
                )}
                {showStudentOnly && (
                  <Badge variant="outline" className="border-success text-success">
                    Verified Students Only
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex bg-muted rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-background shadow-sm" : ""}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-background shadow-sm" : ""}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>

              {/* Sort Options */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="discount">Best Discounts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="lg:w-80 space-y-6 bg-card p-6 rounded-xl shadow-card h-fit">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <label className="font-medium">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Condition Filter */}
              <div className="space-y-3">
                <label className="font-medium">Condition</label>
                <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <label className="font-medium">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000}
                  min={0}
                  step={10}
                  className="w-full"
                />
              </div>

              {/* Student Verification Filter */}
              <div className="flex items-center space-x-2">
              <Checkbox
                id="student-only"
                checked={showStudentOnly}
                onCheckedChange={(checked) => setShowStudentOnly(checked === true)}
              />
                <label htmlFor="student-only" className="text-sm">
                  Verified students only
                </label>
              </div>
            </div>
          )}

          {/* Products Grid/List */}
          <div className="flex-1">
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {filteredProducts.length} results
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className={
                viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }>
                {filteredProducts.map((product) => (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;