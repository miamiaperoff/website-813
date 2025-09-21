import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Coffee, Loader2, User, Mail, Phone, MapPin, Calendar, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SignupFormData {
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

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    plan: '',
    occupation: '',
    company: '',
    workStyle: '',
    goals: '',
    termsAccepted: false,
    marketingAccepted: false
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (field: keyof SignupFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.plan) newErrors.plan = 'Please select a membership plan';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.occupation.trim()) newErrors.occupation = 'Occupation is required';
    if (!formData.workStyle) newErrors.workStyle = 'Please select your work style';
    if (!formData.goals.trim()) newErrors.goals = 'Please tell us about your goals';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      setErrors({ termsAccepted: 'You must accept the terms and conditions' });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call - in production, this would send data to your backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store form data in localStorage for the payment step
      localStorage.setItem('signup_data', JSON.stringify(formData));
      
      // Redirect to payment/contact step
      navigate('/signup/payment');
    } catch (error) {
      console.error('Signup failed:', error);
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <h2 className="text-2xl font-serif text-primary mb-2">Personal Information</h2>
        <p className="text-muted-foreground">Let's start with your basic details</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            placeholder="Enter your first name"
            className={errors.firstName ? 'border-destructive' : ''}
          />
          {errors.firstName && <p className="text-sm text-destructive">{errors.firstName}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            placeholder="Enter your last name"
            className={errors.lastName ? 'border-destructive' : ''}
          />
          {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="your@email.com"
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          placeholder="+63 912 345 6789"
          className={errors.phone ? 'border-destructive' : ''}
        />
        {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="plan">Membership Plan *</Label>
        <Select value={formData.plan} onValueChange={(value) => handleInputChange('plan', value)}>
          <SelectTrigger className={errors.plan ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select your preferred plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flex">Flex Plan - ₱5,000/month (Month-to-Month)</SelectItem>
            <SelectItem value="save">Save Plan - ₱4,500/month (3 Months)</SelectItem>
            <SelectItem value="growth">Growth Plan - ₱4,000/month (6 Months)</SelectItem>
            <SelectItem value="resident">Resident Plan - ₱3,500/month (12 Months)</SelectItem>
          </SelectContent>
        </Select>
        {errors.plan && <p className="text-sm text-destructive">{errors.plan}</p>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-warm-accent/20 rounded-full flex items-center justify-center">
            <Coffee className="w-8 h-8 text-warm-accent" />
          </div>
        </div>
        <h2 className="text-2xl font-serif text-primary mb-2">Work Profile</h2>
        <p className="text-muted-foreground">Help us understand your work needs</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="occupation">Occupation/Profession *</Label>
        <Input
          id="occupation"
          value={formData.occupation}
          onChange={(e) => handleInputChange('occupation', e.target.value)}
          placeholder="e.g., Software Developer, Designer, Consultant"
          className={errors.occupation ? 'border-destructive' : ''}
        />
        {errors.occupation && <p className="text-sm text-destructive">{errors.occupation}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company/Organization</Label>
        <Input
          id="company"
          value={formData.company}
          onChange={(e) => handleInputChange('company', e.target.value)}
          placeholder="Your company name (optional)"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="workStyle">Work Style *</Label>
        <Select value={formData.workStyle} onValueChange={(value) => handleInputChange('workStyle', value)}>
          <SelectTrigger className={errors.workStyle ? 'border-destructive' : ''}>
            <SelectValue placeholder="How do you prefer to work?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="focused">Focused individual work</SelectItem>
            <SelectItem value="collaborative">Collaborative and team-based</SelectItem>
            <SelectItem value="mixed">Mix of focused and collaborative</SelectItem>
            <SelectItem value="flexible">Flexible - adapts to the day</SelectItem>
          </SelectContent>
        </Select>
        {errors.workStyle && <p className="text-sm text-destructive">{errors.workStyle}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="goals">What are your main goals for joining 813 CLUB? *</Label>
        <Textarea
          id="goals"
          value={formData.goals}
          onChange={(e) => handleInputChange('goals', e.target.value)}
          placeholder="Tell us about your professional goals and what you hope to achieve..."
          className={errors.goals ? 'border-destructive' : ''}
          rows={4}
        />
        {errors.goals && <p className="text-sm text-destructive">{errors.goals}</p>}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Calendar className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-serif text-primary mb-2">Terms & Agreements</h2>
        <p className="text-muted-foreground">Please review and accept our terms</p>
      </div>

      <div className="bg-muted/50 rounded-lg p-6 space-y-4">
        <div className="space-y-3">
          <h3 className="font-semibold text-primary">Membership Terms</h3>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• Membership is limited to 13 active members</li>
            <li>• 24/7 access to coworking space</li>
            <li>• Reserved desk during Members-Only Hours (8PM-11AM, except Fridays)</li>
            <li>• 1 free drink per day (up to ₱150 value)</li>
            <li>• Monthly billing with auto-renewal</li>
            <li>• 5-day grace period for late payments</li>
            <li>• Early termination fee: ₱1,500</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-primary">Community Guidelines</h3>
          <ul className="text-sm space-y-2 text-muted-foreground">
            <li>• Use headphones for calls and audio</li>
            <li>• Respect the 1-hour grace period for desk occupation</li>
            <li>• Maintain a professional and respectful environment</li>
            <li>• No transferable memberships - individual use only</li>
            <li>• Guests allowed only with day pass during open seating</li>
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={formData.termsAccepted}
            onCheckedChange={(checked) => handleInputChange('termsAccepted', checked as boolean)}
            className={errors.termsAccepted ? 'border-destructive' : ''}
          />
          <div className="space-y-1">
            <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              I agree to the membership terms and community guidelines *
            </Label>
            <p className="text-xs text-muted-foreground">
              By checking this box, you agree to abide by all terms and conditions of 813 CLUB membership.
            </p>
            {errors.termsAccepted && <p className="text-sm text-destructive">{errors.termsAccepted}</p>}
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="marketing"
            checked={formData.marketingAccepted}
            onCheckedChange={(checked) => handleInputChange('marketingAccepted', checked as boolean)}
          />
          <div className="space-y-1">
            <Label htmlFor="marketing" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              I'd like to receive updates about member events and special offers
            </Label>
            <p className="text-xs text-muted-foreground">
              Optional: Receive notifications about networking events, workshops, and member benefits.
            </p>
          </div>
        </div>
      </div>

      {errors.submit && (
        <Alert variant="destructive">
          <AlertDescription>{errors.submit}</AlertDescription>
        </Alert>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-warm p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-serif text-primary">
            Join 813 CLUB
          </CardTitle>
          <CardDescription>
            Become part of our exclusive coworking community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            
            <div className="flex justify-between pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                Back
              </Button>
              
              {currentStep < 3 ? (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !formData.termsAccepted}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Complete Registration'
                  )}
                </Button>
              )}
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Step {currentStep} of 3</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;
