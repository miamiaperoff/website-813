import React, { useState } from 'react';
import MemberLayout from '@/components/member/MemberLayout';
import PaymentForm from '@/components/member/PaymentForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, CreditCard, Calendar, Users, Wifi, Coffee } from 'lucide-react';

const Payment: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const plans = [
    {
      id: 'flex',
      name: 'Flex Plan',
      price: 5000,
      duration: 'Month-to-Month',
      features: [
        '24/7 coworking access',
        'Reserved desk (8PM-11AM)',
        '1 free drink/day (up to ₱150)',
        'Fast WiFi & power',
        'Bi-weekly member events'
      ]
    },
    {
      id: 'save',
      name: 'Save Plan',
      price: 4500,
      duration: '3 Months',
      features: [
        '24/7 coworking access',
        'Reserved desk (8PM-11AM)',
        '1 free drink/day (up to ₱150)',
        'Fast WiFi & power',
        'Bi-weekly member events',
        'Priority support'
      ]
    },
    {
      id: 'growth',
      name: 'Growth Plan',
      price: 4000,
      duration: '6 Months',
      features: [
        '24/7 coworking access',
        'Reserved desk (8PM-11AM)',
        '1 free drink/day (up to ₱150)',
        'Fast WiFi & power',
        '1 guest day pass/week',
        'Bi-weekly member events',
        'Priority support'
      ]
    },
    {
      id: 'resident',
      name: 'Resident Plan',
      price: 3500,
      duration: '12 Months',
      features: [
        '24/7 coworking access',
        'Reserved desk (8PM-11AM)',
        '1 free drink/day (up to ₱150)',
        'Fast WiFi & power',
        '2 guest passes/week',
        '1 meeting room hour/month',
        'Bi-weekly member events',
        'Priority support',
        'Preferred pricing'
      ]
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setShowPaymentForm(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentForm(false);
    setSelectedPlan('');
    // Handle successful payment
  };

  if (showPaymentForm && selectedPlan) {
    const plan = plans.find(p => p.id === selectedPlan);
    if (plan) {
      return (
        <MemberLayout>
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-primary mb-2">
                Complete Your Payment
              </h1>
              <p className="text-muted-foreground">
                Secure your membership with a quick and easy payment
              </p>
            </div>
            <PaymentForm plan={plan} onSuccess={handlePaymentSuccess} />
          </div>
        </MemberLayout>
      );
    }
  }

  return (
    <MemberLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">
            Choose Your Plan
          </h1>
          <p className="text-muted-foreground">
            Select the membership plan that best fits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative hover:shadow-warm transition-all duration-300 hover:-translate-y-1 ${
                selectedPlan === plan.id ? 'ring-2 ring-primary' : ''
              }`}
            >
              {plan.id === 'growth' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Popular
                  </Badge>
                </div>
              )}
              {plan.id === 'resident' && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-warm-accent text-primary px-4 py-1">
                    Best Value
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-serif">{plan.name}</CardTitle>
                <CardDescription>{plan.duration}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">₱{plan.price.toLocaleString()}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full mt-6" 
                  onClick={() => handlePlanSelect(plan.id)}
                  variant={plan.id === 'growth' ? 'default' : 'outline'}
                >
                  Select Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5 text-primary" />
              <span>Accepted Payment Methods</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CreditCard className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-medium mb-1">Credit Cards</h4>
                <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-8 h-8 bg-green-500 rounded"></div>
                </div>
                <h4 className="font-medium mb-1">GCash</h4>
                <p className="text-sm text-muted-foreground">Mobile wallet payments</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-8 h-8 bg-purple-500 rounded"></div>
                </div>
                <h4 className="font-medium mb-1">PayMaya</h4>
                <p className="text-sm text-muted-foreground">Digital wallet payments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms and Conditions */}
        <Card>
          <CardHeader>
            <CardTitle>Terms & Conditions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Billing</h4>
                <ul className="space-y-1">
                  <li>• Monthly billing, auto-renewal</li>
                  <li>• 5-day grace period for late payments</li>
                  <li>• Early termination fee: ₱1,500</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Membership</h4>
                <ul className="space-y-1">
                  <li>• Non-transferable, individual use only</li>
                  <li>• Limited to 13 members total</li>
                  <li>• Subject to 813 CLUB rules and guidelines</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MemberLayout>
  );
};

export default Payment;
