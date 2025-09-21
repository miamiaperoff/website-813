import React from 'react';
import MemberLayout from '@/components/member/MemberLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Wifi, 
  Printer, 
  Coffee, 
  CreditCard, 
  Shield, 
  Clock,
  Copy,
  Check
} from 'lucide-react';
import { useState } from 'react';

const Services: React.FC = () => {
  const [wifiCredentials, setWifiCredentials] = useState({
    network: '813-Cafe',
    password: 'olivegreen'
  });
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MemberLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">
            Member Services
          </h1>
          <p className="text-muted-foreground">
            Access your member benefits and services
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* WiFi Access */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wifi className="w-5 h-5 text-primary" />
                <span>WiFi Access</span>
              </CardTitle>
              <CardDescription>
                High-speed internet powered by Starlink technology
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-foreground">Network Name</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="flex-1 px-3 py-2 bg-background border rounded-md text-sm font-mono">
                        {wifiCredentials.network}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(wifiCredentials.network)}
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="flex-1 px-3 py-2 bg-background border rounded-md text-sm font-mono">
                        {wifiCredentials.password}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(wifiCredentials.password)}
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Secure connection with WPA2 encryption</span>
              </div>
            </CardContent>
          </Card>

          {/* Printing Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Printer className="w-5 h-5 text-primary" />
                <span>Printing Services</span>
              </CardTitle>
              <CardDescription>
                Professional printing and scanning services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Black & White</p>
                    <p className="text-xs text-muted-foreground">Standard printing</p>
                  </div>
                  <span className="text-sm font-medium">₱2/page</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Color</p>
                    <p className="text-xs text-muted-foreground">High-quality color</p>
                  </div>
                  <span className="text-sm font-medium">₱5/page</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Scanning</p>
                    <p className="text-xs text-muted-foreground">Document scanning</p>
                  </div>
                  <span className="text-sm font-medium">₱1/page</span>
                </div>
              </div>
              <Button className="w-full">
                Request Printing
              </Button>
            </CardContent>
          </Card>

          {/* Coffee & Food */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Coffee className="w-5 h-5 text-primary" />
                <span>Coffee & Food</span>
              </CardTitle>
              <CardDescription>
                Order from our cafe menu with member discounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Member Discount</span>
                  <Badge className="bg-warm-accent text-primary">10% OFF</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">VIP Members</span>
                  <Badge className="bg-purple-100 text-purple-800">15% OFF</Badge>
                </div>
              </div>
              <Button className="w-full" variant="outline">
                View Menu & Order
              </Button>
            </CardContent>
          </Card>

          {/* Payment & Billing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-primary" />
                <span>Payment & Billing</span>
              </CardTitle>
              <CardDescription>
                Manage your membership payments and billing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Current Plan</p>
                    <p className="text-xs text-muted-foreground">Premium Membership</p>
                  </div>
                  <span className="text-sm font-medium">₱2,500/month</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Next Billing</p>
                    <p className="text-xs text-muted-foreground">Auto-renewal</p>
                  </div>
                  <span className="text-sm font-medium">Dec 1, 2024</span>
                </div>
              </div>
              <div className="space-y-2">
                <Button className="w-full" variant="outline" size="sm">
                  Update Payment Method
                </Button>
                <Button className="w-full" variant="outline" size="sm">
                  View Billing History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Service Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Service Status</span>
            </CardTitle>
            <CardDescription>
              Current status of all member services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-sm">WiFi Network</p>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-sm">Printing Services</p>
                  <p className="text-xs text-muted-foreground">Available</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-sm">Cafe Services</p>
                  <p className="text-xs text-muted-foreground">Open</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MemberLayout>
  );
};

export default Services;
