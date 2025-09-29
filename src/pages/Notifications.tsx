import { useState } from "react";
import { Bell, Check, Trash2, Settings as SettingsIcon, Package, Heart, MessageCircle, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock notifications data
const mockNotifications = [
  {
    id: "1",
    type: "sale",
    title: "Item Sold!",
    message: "Your iPhone 13 has been sold to Sarah Chen",
    timestamp: "2 minutes ago",
    isRead: false,
    icon: DollarSign,
    color: "text-success"
  },
  {
    id: "2", 
    type: "message",
    title: "New Message",
    message: "Mike Rodriguez sent you a message about MacBook Pro Charger",
    timestamp: "1 hour ago",
    isRead: false,
    icon: MessageCircle,
    color: "text-primary"
  },
  {
    id: "3",
    type: "favorite",
    title: "Item Favorited", 
    message: "Someone added your Data Structures textbook to their favorites",
    timestamp: "3 hours ago",
    isRead: true,
    icon: Heart,
    color: "text-destructive"
  },
  {
    id: "4",
    type: "order",
    title: "Order Update",
    message: "Your order for Organic Chemistry textbook has been shipped", 
    timestamp: "1 day ago",
    isRead: true,
    icon: Package,
    color: "text-secondary"
  },
  {
    id: "5",
    type: "sale",
    title: "Price Drop Alert",
    message: "The MacBook Pro you're watching has dropped in price by $50",
    timestamp: "2 days ago", 
    isRead: true,
    icon: DollarSign,
    color: "text-success"
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState("all");

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(notifs => 
      notifs.map(notif => 
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifs => 
      notifs.map(notif => ({ ...notif, isRead: true }))
    );
  };

  // Delete notification
  const deleteNotification = (id: string) => {
    setNotifications(notifs => notifs.filter(notif => notif.id !== id));
  };

  // Filter notifications by type
  const getFilteredNotifications = () => {
    if (activeTab === "all") return notifications;
    if (activeTab === "unread") return notifications.filter(n => !n.isRead);
    return notifications.filter(n => n.type === activeTab);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Bell className="h-8 w-8" />
            <div>
              <h1 className="text-3xl font-bold">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-muted-foreground">
                  You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                <Check className="h-4 w-4 mr-2" />
                Mark All Read
              </Button>
            )}
            <Button variant="ghost">
              <SettingsIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Notification Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">
              All ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="sale">Sales</TabsTrigger>
            <TabsTrigger value="message">Messages</TabsTrigger>
            <TabsTrigger value="order">Orders</TabsTrigger>
            <TabsTrigger value="favorite">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="space-y-4">
              {getFilteredNotifications().length > 0 ? (
                getFilteredNotifications().map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <Card 
                      key={notification.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        !notification.isRead ? 'border-l-4 border-l-primary bg-muted/30' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4">
                            <div className={`p-2 rounded-lg bg-muted ${notification.color}`}>
                              <IconComponent className="h-5 w-5" />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold">{notification.title}</h3>
                                {!notification.isRead && (
                                  <Badge variant="secondary" className="text-xs">New</Badge>
                                )}
                              </div>
                              <p className="text-muted-foreground mb-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {notification.timestamp}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {!notification.isRead && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="text-center py-16">
                  <Bell className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
                  <h2 className="text-2xl font-semibold mb-4">
                    {activeTab === "unread" ? "All caught up!" : "No notifications"}
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    {activeTab === "unread" 
                      ? "You've read all your notifications. Great job staying organized!"
                      : "We'll notify you when there's something new to see."
                    }
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Notifications;