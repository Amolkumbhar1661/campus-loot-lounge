import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X, Plus, DollarSign, Tag, MapPin, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = [
  "Electronics",
  "Textbooks", 
  "School Supplies",
  "Dorm Essentials",
  "Furniture",
  "Clothing",
  "Sports & Recreation",
  "Other"
];

const conditions = ["New", "Like New", "Good", "Fair"];

const Sell = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    price: "",
    originalPrice: "",
    location: "",
    tags: "",
    allowStudentDiscount: true,
    studentDiscountPercent: 15,
    allowCampusDiscount: true,
    campusDiscountPercent: 5
  });
  
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock user data
  const currentUser = {
    college: "Stanford University",
    isVerified: true
  };

  // Handle form input changes
  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle image upload (mock implementation)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, you would upload these files to a storage service
      // For now, we'll use placeholder URLs
      const newImages = Array.from(files).map((file, index) => 
        `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&${index}`
      );
      setImages(prev => [...prev, ...newImages].slice(0, 5)); // Max 5 images
    }
  };

  // Remove image
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // Calculate final pricing with discounts
  const calculatePricing = () => {
    const basePrice = parseFloat(formData.price) || 0;
    let finalPrice = basePrice;
    
    if (formData.allowStudentDiscount) {
      finalPrice = finalPrice * (1 - formData.studentDiscountPercent / 100);
    }
    
    if (formData.allowCampusDiscount) {
      finalPrice = finalPrice * (1 - formData.campusDiscountPercent / 100);
    }
    
    return {
      basePrice,
      studentPrice: formData.allowStudentDiscount ? basePrice * (1 - formData.studentDiscountPercent / 100) : basePrice,
      campusPrice: finalPrice,
      totalDiscount: formData.allowStudentDiscount && formData.allowCampusDiscount ? 
        formData.studentDiscountPercent + formData.campusDiscountPercent : 
        formData.allowStudentDiscount ? formData.studentDiscountPercent : 0
    };
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock submission - Replace with actual API call when backend is connected
    try {
      console.log("Submitting product:", {
        ...formData,
        images,
        seller: currentUser,
        pricing: calculatePricing()
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Redirect to product page or profile
      navigate("/profile?tab=listings");
    } catch (error) {
      console.error("Error creating listing:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const pricing = calculatePricing();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">List Your Item</h1>
            <p className="text-muted-foreground">
              Create a listing to sell your items to fellow students with automatic discounts.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Images */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Camera className="h-5 w-5" />
                      <span>Photos</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Upload up to 5 photos. The first photo will be your main image.
                      </p>
                      
                      {/* Image Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                            <img src={image} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            {index === 0 && (
                              <Badge className="absolute bottom-2 left-2">Main Photo</Badge>
                            )}
                          </div>
                        ))}
                        
                        {/* Upload Button */}
                        {images.length < 5 && (
                          <label className="aspect-square border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                            <span className="text-sm text-muted-foreground text-center">
                              Add Photo
                            </span>
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Product Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., MacBook Air M2 - Perfect for CS Students"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your item's condition, features, and any included accessories..."
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        rows={4}
                        required
                      />
                    </div>

                    {/* Category and Condition */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Category *</Label>
                        <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
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

                      <div className="space-y-2">
                        <Label>Condition *</Label>
                        <Select value={formData.condition} onValueChange={(value) => handleInputChange("condition", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
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
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <Label htmlFor="location">Pickup Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="location"
                          placeholder="e.g., Stanford Campus, Building Name"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                      <Label htmlFor="tags">Tags (optional)</Label>
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          id="tags"
                          placeholder="e.g., programming, student, laptop (comma separated)"
                          value={formData.tags}
                          onChange={(e) => handleInputChange("tags", e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Pricing */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5" />
                      <span>Pricing</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Base Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Your Price *</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={(e) => handleInputChange("price", e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="originalPrice">Original Price (optional)</Label>
                        <Input
                          id="originalPrice"
                          type="number"
                          placeholder="0.00"
                          value={formData.originalPrice}
                          onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Student Discount */}
                    <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="student-discount"
                          checked={formData.allowStudentDiscount}
                          onCheckedChange={(checked) => handleInputChange("allowStudentDiscount", checked === true)}
                        />
                        <Label htmlFor="student-discount" className="text-sm font-medium">
                          Offer student discount
                        </Label>
                      </div>
                      
                      {formData.allowStudentDiscount && (
                        <div className="space-y-2">
                          <Label>Student Discount Percentage</Label>
                          <Input
                            type="number"
                            min="0"
                            max="50"
                            value={formData.studentDiscountPercent}
                            onChange={(e) => handleInputChange("studentDiscountPercent", parseInt(e.target.value) || 0)}
                          />
                        </div>
                      )}
                    </div>

                    {/* Campus Discount */}
                    <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="campus-discount"
                          checked={formData.allowCampusDiscount}
                          onCheckedChange={(checked) => handleInputChange("allowCampusDiscount", checked === true)}
                        />
                        <Label htmlFor="campus-discount" className="text-sm font-medium">
                          Extra discount for {currentUser.college} students
                        </Label>
                      </div>
                      
                      {formData.allowCampusDiscount && (
                        <div className="space-y-2">
                          <Label>Additional Campus Discount Percentage</Label>
                          <Input
                            type="number"
                            min="0"
                            max="25"
                            value={formData.campusDiscountPercent}
                            onChange={(e) => handleInputChange("campusDiscountPercent", parseInt(e.target.value) || 0)}
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar - Pricing Preview */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle>Pricing Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Your Price:</span>
                        <span className="font-semibold">${pricing.basePrice.toFixed(2)}</span>
                      </div>
                      
                      {formData.allowStudentDiscount && (
                        <div className="flex justify-between">
                          <span className="text-sm text-success">Student Price:</span>
                          <span className="font-semibold text-success">
                            ${pricing.studentPrice.toFixed(2)}
                          </span>
                        </div>
                      )}
                      
                      {formData.allowCampusDiscount && formData.allowStudentDiscount && (
                        <div className="flex justify-between">
                          <span className="text-sm text-secondary">Same Campus Price:</span>
                          <span className="font-semibold text-secondary">
                            ${pricing.campusPrice.toFixed(2)}
                          </span>
                        </div>
                      )}
                      
                      {pricing.totalDiscount > 0 && (
                        <div className="pt-2 border-t">
                          <Badge variant="destructive" className="bg-accent text-accent-foreground w-full justify-center">
                            Up to {pricing.totalDiscount}% OFF for students
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t">
                      <Button 
                        type="submit" 
                        variant="hero" 
                        className="w-full" 
                        disabled={isSubmitting || !formData.title || !formData.price}
                      >
                        {isSubmitting ? "Creating Listing..." : "List Item"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Sell;