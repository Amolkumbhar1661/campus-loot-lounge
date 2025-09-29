import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock cart items data
const mockCartItems = [
  {
    id: "1",
    title: "iPhone 13 - Excellent Condition",
    price: 599,
    originalPrice: 699,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300",
    seller: "Alex Johnson",
    condition: "Like New",
    quantity: 1,
    discounts: { student: 10, sameCampus: 5 }
  },
  {
    id: "2", 
    title: "Data Structures & Algorithms Textbook",
    price: 35,
    originalPrice: 79,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300",
    seller: "Sarah Chen",
    condition: "Good", 
    quantity: 1,
    discounts: { student: 15, sameCampus: 10 }
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const studentDiscount = cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity * item.discounts.student / 100), 0);
  const campusDiscount = cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity * item.discounts.sameCampus / 100), 0);
  const totalSavings = studentDiscount + campusDiscount;
  const finalTotal = subtotal;

  // Update item quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/browse" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Continue Shopping</span>
              </Link>
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            <Badge variant="secondary">{cartItems.length} items</Badge>
          </div>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Sold by {item.seller} • {item.condition}
                        </p>
                        
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center space-x-1">
                            <Badge variant="outline" className="border-success text-success">
                              {item.discounts.student}% Student
                            </Badge>
                            <Badge variant="outline" className="border-primary text-primary">
                              {item.discounts.sameCampus}% Campus
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-medium">{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className="text-lg font-semibold">${item.price}</p>
                              <p className="text-sm text-muted-foreground line-through">
                                ${item.originalPrice}
                              </p>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-success">
                    <span>Student Discount</span>
                    <span>-${studentDiscount.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-primary">
                    <span>Campus Discount</span>
                    <span>-${campusDiscount.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-success mt-1">
                      You saved ${totalSavings.toFixed(2)}!
                    </p>
                  </div>

                  <Button variant="hero" className="w-full" size="lg">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Proceed to Checkout
                  </Button>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/browse">Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          // Empty Cart State
          <div className="text-center py-16">
            <ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. 
              Start browsing to find great deals from fellow students!
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/browse">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;