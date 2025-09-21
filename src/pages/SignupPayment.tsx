import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Mail, CheckCircle, ArrowLeft, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  plan: string;
  occupation: string;
  company: string;
  workStyle: string;
  goals: string;
  termsAccepted: boolean;
  marketingAccepted: boolean;
}

const SignupPayment: React.FC = () => {
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState<SignupData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('signup_data');
    if (storedData) {
      setSignupData(JSON.parse(storedData));
    } else {
      // Redirect to signup if no data found
      navigate('/signup');
    }
  }, [navigate]);

  const getPlanDetails = (plan: string) => {
    const plans = {
      flex: { name: 'Flex Plan', price: '₱5,000', period: 'Month-to-Month', description: 'Perfect for flexible schedules' },
      save: { name: 'Save Plan', price: '₱4,500', period: '3 Months', description: 'Great value for regular users' },
      growth: { name: 'Growth Plan', price: '₱4,000', period: '6 Months', description: 'Includes 1 guest pass/week' },
      resident: { name: 'Resident Plan', price: '₱3,500', period: '12 Months', description: 'Best value with 2 guest passes/week + meeting room' }
    };
    return plans[plan as keyof typeof plans] || plans.flex;
  };


  const handleEmailAna = () => {
    const planDetails = getPlanDetails(signupData?.plan || 'flex');
    const subject = `813 CLUB Membership Application - ${signupData?.firstName} ${signupData?.lastName}`;
    const body = `Hi Ana,

I would like to apply for 813 CLUB membership. I've completed the online registration form and would like to proceed with payment.

Membership Details:
- Plan: ${planDetails.name} (${planDetails.price}/${planDetails.period})
- Name: ${signupData?.firstName} ${signupData?.lastName}
- Email: ${signupData?.email}
- Phone: ${signupData?.phone}
- Occupation: ${signupData?.occupation}
- Company: ${signupData?.company || 'N/A'}

Work Profile:
- Work Style: ${signupData?.workStyle}
- Goals: ${signupData?.goals}

I have read and accepted the terms and conditions. Please let me know the payment process and when I can expect to receive my member portal access.

Thank you for your time!

Best regards,
${signupData?.firstName} ${signupData?.lastName}`;

    const emailUrl = `mailto:hey@813cafe.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(emailUrl, '_blank');
  };

  if (!signupData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-warm p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p>Loading your registration details...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const planDetails = getPlanDetails(signupData.plan);

  return (
    <div className="min-h-screen bg-gradient-warm p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <CreditCard className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-serif text-primary mb-2">Complete Your Registration</h1>
          <p className="text-muted-foreground">Contact Ana to finalize your membership and payment</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Registration Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Registration Complete
              </CardTitle>
              <CardDescription>
                Your membership application has been submitted
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Personal Information</h3>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p><strong>Name:</strong> {signupData.firstName} {signupData.lastName}</p>
                  <p><strong>Email:</strong> {signupData.email}</p>
                  <p><strong>Phone:</strong> {signupData.phone}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Work Profile</h3>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p><strong>Occupation:</strong> {signupData.occupation}</p>
                  <p><strong>Company:</strong> {signupData.company || 'N/A'}</p>
                  <p><strong>Work Style:</strong> {signupData.workStyle}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-2">Selected Plan</h3>
                <Badge className="bg-primary text-primary-foreground">
                  {planDetails.name}
                </Badge>
                <p className="text-sm text-muted-foreground mt-1">
                  {planDetails.price}/{planDetails.period}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
              <CardDescription>
                Contact Ana Calubiran to complete your membership
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-primary/5 rounded-lg p-4">
                <h3 className="font-semibold text-primary mb-2">Payment Process</h3>
                <ol className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                    Contact Ana via email
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                    Confirm your selected plan and payment method
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                    Complete payment processing
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5">4</span>
                    Receive your member portal credentials
                  </li>
                </ol>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={handleEmailAna}
                  className="w-full"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Ana via Email
                </Button>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">Contact Information</h4>
                <div className="text-sm space-y-1 text-muted-foreground">
                  <p><strong>Ana Calubiran</strong></p>
                  <p>Coworking Space Manager</p>
                  <p>📞 (+63) 9709617206</p>
                  <p>📧 hey@813cafe.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/signup')}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Registration
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate('/coworking')}
          >
            View Coworking Page
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupPayment;
