import React, { useState } from 'react';
import { dataService } from '@/lib/dataService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star, Users, Coffee, Wifi, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Plan } from '@/lib/types';

const PlanSelection: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const plans = dataService.getPlans();

  const handleSelectPlan = async (planId: string) => {
    setIsLoading(true);
    
    try {
      // Create subscription with pending status
      const subscription = dataService.createSubscription({
        memberId: 'temp_member', // In real app, this would be the logged-in user's ID
        status: 'pending'
      });
      
      // Create subscription period
      const now = new Date();
      const periodEnd = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
      
      dataService.createSubscriptionPeriod({
        memberId: 'temp_member',
        periodStart: now.toISOString(),
        periodEnd: periodEnd.toISOString(),
        isPaid: false,
        markedBy: 'system',
        markedAt: now.toISOString(),
        note: 'Subscription created - pending payment'
      });
      
      // Redirect to admin for activation
      navigate('/admin');
    } catch (error) {
      console.error('Error creating subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'flex': return <Calendar className="w-6 h-6" />;
      case 'save': return <Users className="w-6 h-6" />;
      case 'growth': return <Star className="w-6 h-6" />;
      case 'resident': return <Coffee className="w-6 h-6" />;
      default: return <Users className="w-6 h-6" />;
    }
  };

  const getPlanColor = (planId: string) => {
    switch (planId) {
      case 'flex': return 'border-orange-200 bg-orange-50';
      case 'save': return 'border-green-200 bg-green-50';
      case 'growth': return 'border-blue-200 bg-blue-50';
      case 'resident': return 'border-purple-200 bg-purple-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-serif font-bold text-primary text-center">
              Choose Your 813 Club Plan
            </h1>
            <p className="text-center text-muted-foreground mt-2">
              Select the plan that works best for you
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative hover:shadow-lg transition-all duration-300 cursor-pointer ${
                selectedPlan === plan.id ? 'ring-2 ring-primary' : ''
              } ${getPlanColor(plan.id)}`}
              onClick={() => setSelectedPlan(plan.id)}
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
                <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  {getPlanIcon(plan.id)}
                </div>
                <CardTitle className="text-xl font-serif">{plan.name}</CardTitle>
                <CardDescription className="text-sm">{plan.term}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {plan.id === 'flex' && '₱5,000'}
                    {plan.id === 'save' && '₱4,500'}
                    {plan.id === 'growth' && '₱4,000'}
                    {plan.id === 'resident' && '₱3,500'}
                  </div>
                  <div className="text-sm text-muted-foreground">/month</div>
                </div>

                <ul className="space-y-2">
                  {plan.perks.map((perk, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{perk}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full"
                  variant={selectedPlan === plan.id ? 'default' : 'outline'}
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Select Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Plan Comparison */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-center">Plan Comparison</CardTitle>
            <CardDescription className="text-center">
              All plans include 24/7 access and daily free drink
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Feature</th>
                    {plans.map(plan => (
                      <th key={plan.id} className="text-center py-3 font-semibold">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3">24/7 Coworking Access</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="text-center py-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Reserved Desk (8PM-11AM)</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="text-center py-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Daily Free Drink (₱150)</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="text-center py-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Guest Passes/Week</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="text-center py-3">
                        {plan.id === 'flex' && '0'}
                        {plan.id === 'save' && '0'}
                        {plan.id === 'growth' && '1'}
                        {plan.id === 'resident' && '2'}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3">Meeting Room Hours/Month</td>
                    {plans.map(plan => (
                      <td key={plan.id} className="text-center py-3">
                        {plan.id === 'resident' ? '1' : '0'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Terms */}
        <Card className="mt-8 bg-muted/50">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-primary mb-4">Payment & Terms</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    <span>Monthly billing, auto-renew</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    <span>Prepaid plans: discounted, non-refundable</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    <span>5-day grace for late payments</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-primary mr-2" />
                    <span>Non-transferable; individual use only</span>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <p className="text-sm text-muted-foreground">
                  Early Termination Fee: ₱1,500
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlanSelection;
