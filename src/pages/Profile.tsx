import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Settings, 
  Edit3, 
  Star, 
  MapPin, 
  Mail, 
  GraduationCap,
  Shield,
  Eye,
  Heart,
  Package,
  DollarSign,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";

// Mock user data - Replace with actual user data from auth context
const mockUser = {
  id: "user1",
  name: "Alex Johnson",
  email: "alex.johnson@stanford.edu",
  college: "Stanford University",
  major: "Computer Science",
  year: "Junior",
  location: "Palo Alto, CA",
  bio: "CS major passionate about technology and sustainable living. Looking to buy and sell tech items, textbooks, and dorm essentials. Always interested in connecting with fellow students!",
  isVerified: true,
  memberSince: "August 2023",
  rating: 4.8,
  reviewCount: 23,
  stats: {
    totalSales: 1250,
    itemsSold: 15,
    itemsBought: 8,
    favorites: 12
  }
};

// Mock user's listings
const userListings = [
  {
    id: "1",
    title: "iPhone 13 - Excellent Condition",
    price: 599,
    originalPrice: 699,
    images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400"],
    seller: mockUser,
    condition: "Like New" as const,
    category: "Electronics",
    location: "Palo Alto, CA",
    discounts: { student: 10, sameCampus: 5 },
    isFavorited: false
  },
  {
    id: "2",
    title: "Data Structures & Algorithms Textbook",
    price: 35,
    originalPrice: 79,
    images: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400"],
    seller: mockUser,
    condition: "Good" as const,
    category: "Textbooks",
    location: "Palo Alto, CA",
    discounts: { student: 15, sameCampus: 10 },
    isFavorited: false
  }
];

// Mock purchase history
const purchaseHistory = [
  {
    id: "p1",
    title: "MacBook Pro Charger",
    price: 45,
    purchaseDate: "2024-01-15",
    seller: "Sarah Chen",
    status: "Delivered"
  },
  {
    id: "p2",
    title: "Organic Chemistry Textbook",
    price: 89,
    purchaseDate: "2024-01-10",
    seller: "Mike Rodriguez", 
    status: "Delivered"
  }
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-card rounded-xl shadow-card p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h1 className="text-2xl font-bold">{mockUser.name}</h1>
                  {mockUser.isVerified && (
                    <Badge variant="outline" className="border-success text-success">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified Student
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>{mockUser.major} • {mockUser.year} • {mockUser.college}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>{mockUser.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Member since {mockUser.memberSince}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-center">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="font-semibold">{mockUser.rating}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {mockUser.reviewCount} reviews
                </div>
              </div>

              <Button variant="outline" asChild>
                <Link to="/settings" className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Bio */}
          {mockUser.bio && (
            <div className="mb-6">
              <p className="text-muted-foreground">{mockUser.bio}</p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <DollarSign className="h-5 w-5 text-success" />
              </div>
              <div className="text-lg font-semibold">${mockUser.stats.totalSales}</div>
              <div className="text-xs text-muted-foreground">Total Sales</div>
            </div>

            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div className="text-lg font-semibold">{mockUser.stats.itemsSold}</div>
              <div className="text-xs text-muted-foreground">Items Sold</div>
            </div>

            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Eye className="h-5 w-5 text-secondary" />
              </div>
              <div className="text-lg font-semibold">{mockUser.stats.itemsBought}</div>
              <div className="text-xs text-muted-foreground">Items Bought</div>
            </div>

            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                <Heart className="h-5 w-5 text-destructive" />
              </div>
              <div className="text-lg font-semibold">{mockUser.stats.favorites}</div>
              <div className="text-xs text-muted-foreground">Favorites</div>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="purchases">Purchases</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Listed "iPhone 13"</span>
                    <span className="text-muted-foreground">2 days ago</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Sold "Data Structures Book"</span>
                    <span className="text-muted-foreground">1 week ago</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Purchased "MacBook Charger"</span>
                    <span className="text-muted-foreground">2 weeks ago</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="hero" className="w-full" asChild>
                    <Link to="/sell">
                      <Edit3 className="h-4 w-4 mr-2" />
                      List New Item
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/browse">
                      <Eye className="h-4 w-4 mr-2" />
                      Browse Products
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/settings">
                      <Settings className="h-4 w-4 mr-2" />
                      Account Settings
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Listings Tab */}
          <TabsContent value="listings">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">My Active Listings ({userListings.length})</h2>
                <Button variant="hero" asChild>
                  <Link to="/sell">Add New Listing</Link>
                </Button>
              </div>

              {userListings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userListings.map((product) => (
                    <div key={product.id} className="relative">
                      <ProductCard 
                        product={product}
                        currentUserCollege={mockUser.college}
                      />
                      <div className="absolute top-3 right-3 flex space-x-1">
                        <Button variant="outline" size="sm">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No listings yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start selling your items to fellow students!
                  </p>
                  <Button variant="hero" asChild>
                    <Link to="/sell">Create Your First Listing</Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Purchases Tab */}
          <TabsContent value="purchases">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Purchase History</h2>

              {purchaseHistory.length > 0 ? (
                <div className="space-y-4">
                  {purchaseHistory.map((purchase) => (
                    <Card key={purchase.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{purchase.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              Sold by {purchase.seller} • {new Date(purchase.purchaseDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">${purchase.price}</p>
                            <Badge variant="outline" className="border-success text-success">
                              {purchase.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Eye className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No purchases yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Browse products to start shopping!
                  </p>
                  <Button variant="hero" asChild>
                    <Link to="/browse">Start Shopping</Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Favorite Items</h2>
              
              <div className="text-center py-12">
                <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                <p className="text-muted-foreground mb-4">
                  Save items you're interested in to view them later!
                </p>
                <Button variant="hero" asChild>
                  <Link to="/browse">Browse Products</Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;