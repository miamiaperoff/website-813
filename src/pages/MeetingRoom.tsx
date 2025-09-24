import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { dataService } from '@/lib/dataService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  User,
  Settings,
  Building
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MeetingRoomBooking {
  id: string;
  memberId: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  status: 'active' | 'cancelled' | 'completed';
  createdAt: string;
}

const MeetingRoom: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedStartTime, setSelectedStartTime] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('');
  const [bookings, setBookings] = useState<MeetingRoomBooking[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [monthlyHoursUsed, setMonthlyHoursUsed] = useState(0);
  const [monthlyHoursRemaining, setMonthlyHoursRemaining] = useState(60); // 1 hour = 60 minutes

  // Mock bookings data
  const mockBookings: MeetingRoomBooking[] = [
    {
      id: '1',
      memberId: user?.id || '',
      date: '2024-01-15',
      startTime: '10:00',
      endTime: '11:00',
      duration: 60,
      status: 'active',
      createdAt: new Date().toISOString()
    }
  ];

  const timeSlots = [
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '13:00', label: '1:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '17:00', label: '5:00 PM' }
  ];

  const durationOptions = [
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' }
  ];

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    loadBookings();
    loadMonthlyUsage();
  }, [user, navigate, selectedDate]);

  const loadBookings = async () => {
    try {
      const dateStr = selectedDate.toISOString().split('T')[0];
      const dayBookings = mockBookings.filter(b => b.date === dateStr);
      setBookings(dayBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
    }
  };

  const loadMonthlyUsage = async () => {
    try {
      // Calculate monthly usage
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      
      const monthlyBookings = mockBookings.filter(booking => {
        const bookingDate = new Date(booking.date);
        return bookingDate >= startOfMonth && bookingDate <= endOfMonth && booking.status !== 'cancelled';
      });
      
      const totalMinutes = monthlyBookings.reduce((sum, booking) => sum + booking.duration, 0);
      setMonthlyHoursUsed(totalMinutes);
      setMonthlyHoursRemaining(Math.max(0, 60 - totalMinutes)); // 60 minutes = 1 hour limit
    } catch (error) {
      console.error('Error loading monthly usage:', error);
    }
  };

  const handleCreateBooking = async () => {
    if (!selectedStartTime || !selectedDuration) {
      setMessage({ type: 'error', text: 'Please select start time and duration' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const duration = parseInt(selectedDuration);
      
      // Check if user has enough remaining hours
      if (monthlyHoursRemaining < duration) {
        setMessage({ 
          type: 'error', 
          text: `Insufficient remaining hours. You have ${monthlyHoursRemaining} minutes left this month.` 
        });
        return;
      }

      // Check for conflicts
      const dateStr = selectedDate.toISOString().split('T')[0];
      const startTime = selectedStartTime;
      const endTime = calculateEndTime(selectedStartTime, duration);
      
      const conflict = bookings.find(booking => {
        if (booking.status === 'cancelled') return false;
        
        const bookingStart = booking.startTime;
        const bookingEnd = booking.endTime;
        
        return (startTime < bookingEnd && endTime > bookingStart);
      });

      if (conflict) {
        setMessage({ type: 'error', text: 'Time slot conflicts with existing booking' });
        return;
      }

      // Create booking
      const newBooking: MeetingRoomBooking = {
        id: `booking_${Date.now()}`,
        memberId: user?.id || '',
        date: dateStr,
        startTime,
        endTime,
        duration,
        status: 'active',
        createdAt: new Date().toISOString()
      };

      setBookings(prev => [...prev, newBooking]);
      setMessage({ type: 'success', text: 'Meeting room booked successfully!' });
      
      // Update monthly usage
      setMonthlyHoursUsed(prev => prev + duration);
      setMonthlyHoursRemaining(prev => prev - duration);

    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to create booking' });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateEndTime = (startTime: string, duration: number): string => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startMinutes = hours * 60 + minutes;
    const endMinutes = startMinutes + duration;
    
    const endHours = Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;
    
    return `${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking) return;

      setBookings(prev => 
        prev.map(b => 
          b.id === bookingId 
            ? { ...b, status: 'cancelled' as const }
            : b
        )
      );
      
      // Update monthly usage
      setMonthlyHoursUsed(prev => prev - booking.duration);
      setMonthlyHoursRemaining(prev => prev + booking.duration);
      
      setMessage({ type: 'success', text: 'Booking cancelled successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to cancel booking' });
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getAvailableTimeSlots = () => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    const dayBookings = bookings.filter(b => b.date === dateStr && b.status === 'active');
    
    return timeSlots.filter(slot => {
      const slotStart = slot.value;
      const slotEnd = calculateEndTime(slotStart, parseInt(selectedDuration || '60'));
      
      return !dayBookings.some(booking => {
        return (slotStart < booking.endTime && slotEnd > booking.startTime);
      });
    });
  };

  const availableSlots = getAvailableTimeSlots();

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-primary">
                Meeting Room Booking
              </h1>
              <p className="text-muted-foreground">Reserve the meeting room for your team</p>
            </div>
            <Button onClick={() => navigate('/member')} variant="outline">
              <User className="w-4 h-4 mr-2" />
              Member Portal
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Messages */}
        {message && (
          <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className="mb-6">
            {message.type === 'error' ? (
              <XCircle className="h-4 w-4" />
            ) : (
              <CheckCircle className="h-4 w-4" />
            )}
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {/* Monthly Usage Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Hours Used This Month</p>
                  <p className="text-2xl font-bold text-primary">{Math.floor(monthlyHoursUsed / 60)}h {monthlyHoursUsed % 60}m</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Hours Remaining</p>
                  <p className="text-2xl font-bold text-primary">{Math.floor(monthlyHoursRemaining / 60)}h {monthlyHoursRemaining % 60}m</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building className="h-8 w-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Monthly Limit</p>
                  <p className="text-2xl font-bold text-primary">1 Hour</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  <span>Book Meeting Room</span>
                </CardTitle>
                <CardDescription>
                  Reserve the meeting room for your team meetings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Date</label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Duration</label>
                  <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {durationOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Time</label>
                  <Select value={selectedStartTime} onValueChange={setSelectedStartTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSlots.map(slot => (
                        <SelectItem key={slot.value} value={slot.value}>
                          {slot.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleCreateBooking}
                  disabled={!selectedStartTime || !selectedDuration || isLoading || monthlyHoursRemaining < parseInt(selectedDuration || '0')}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    <>
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      Book Meeting Room
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* My Bookings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-primary" />
                  <span>My Bookings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    No bookings found
                  </p>
                ) : (
                  <div className="space-y-3">
                    {bookings.map(booking => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-semibold">{formatDate(new Date(booking.date))}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Duration: {booking.duration} minutes
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={booking.status === 'active' ? 'default' : 'secondary'}>
                            {booking.status}
                          </Badge>
                          {booking.status === 'active' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Room Info & Guidelines */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="w-5 h-5 text-primary" />
                  <span>Meeting Room Info</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-2">Room Features</h3>
                    <div className="space-y-2 text-sm">
                      <p>• Capacity: 8 people</p>
                      <p>• Projector and screen</p>
                      <p>• Whiteboard and markers</p>
                      <p>• High-speed WiFi</p>
                      <p>• Air conditioning</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold mb-2 text-blue-900">Booking Rules</h3>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p>• Residents: 1 hour per month included</p>
                      <p>• Bookings must be made at least 2 hours in advance</p>
                      <p>• Maximum booking duration: 2 hours</p>
                      <p>• Cancellations must be made 1 hour before start time</p>
                      <p>• No-show bookings are automatically cancelled</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  <span>Usage Guidelines</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Keep the room clean and organized</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Turn off all equipment when finished</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Respect other members' booking times</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Report any issues to staff immediately</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Today's Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    No bookings today
                  </p>
                ) : (
                  <div className="space-y-3">
                    {bookings.map(booking => (
                      <div key={booking.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">{formatTime(booking.startTime)} - {formatTime(booking.endTime)}</p>
                          <p className="text-sm text-muted-foreground">
                            Duration: {booking.duration} minutes
                          </p>
                        </div>
                        <Badge variant={booking.status === 'active' ? 'default' : 'secondary'}>
                          {booking.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoom;
