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
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Reservation } from '@/lib/types';

const FridayReservations: React.FC = () => {
  const { user, isStaff } = useAuth();
  const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock reservations data
  const mockReservations: Reservation[] = [
    {
      id: '1',
      memberId: '1',
      date: '2024-01-05',
      start: '20:00',
      end: '11:00',
      status: 'active'
    },
    {
      id: '2',
      memberId: '2',
      date: '2024-01-05',
      start: '20:00',
      end: '11:00',
      status: 'active'
    }
  ];

  const timeSlots = [
    { value: '20:00-11:00', label: '8:00 PM - 11:00 AM (Full Night)', duration: '15 hours' }
  ];

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    loadReservations();
  }, [user, navigate, selectedDate]);

  const loadReservations = async () => {
    try {
      // Filter reservations for selected date
      const dateStr = selectedDate.toISOString().split('T')[0];
      const dayReservations = mockReservations.filter(r => r.date === dateStr);
      setReservations(dayReservations);
    } catch (error) {
      console.error('Error loading reservations:', error);
    }
  };

  const isFriday = (date: Date) => {
    return date.getDay() === 5; // Friday
  };

  const handleCreateReservation = async () => {
    if (!selectedTimeSlot) {
      setMessage({ type: 'error', text: 'Please select a time slot' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      // Check if it's Friday
      if (!isFriday(selectedDate)) {
        setMessage({ type: 'error', text: 'Reservations are only available for Fridays' });
        return;
      }

      // Check if slot is available
      const dateStr = selectedDate.toISOString().split('T')[0];
      const existingReservation = reservations.find(r => r.date === dateStr && r.status === 'active');
      
      if (existingReservation) {
        setMessage({ type: 'error', text: 'This time slot is already reserved' });
        return;
      }

      // Create reservation
      const newReservation: Reservation = {
        id: `reservation_${Date.now()}`,
        memberId: user?.id || '',
        date: dateStr,
        start: selectedTimeSlot.split('-')[0],
        end: selectedTimeSlot.split('-')[1],
        status: 'active'
      };

      setReservations(prev => [...prev, newReservation]);
      setMessage({ type: 'success', text: 'Reservation created successfully!' });
      
      // Auto-release after 30 minutes if no-show
      setTimeout(() => {
        setReservations(prev => 
          prev.map(r => 
            r.id === newReservation.id 
              ? { ...r, status: 'cancelled' as const }
              : r
          )
        );
      }, 30 * 60 * 1000); // 30 minutes

    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to create reservation' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelReservation = async (reservationId: string) => {
    try {
      setReservations(prev => 
        prev.map(r => 
          r.id === reservationId 
            ? { ...r, status: 'cancelled' as const }
            : r
        )
      );
      setMessage({ type: 'success', text: 'Reservation cancelled successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to cancel reservation' });
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

  const getNextFriday = () => {
    const today = new Date();
    const daysUntilFriday = (5 - today.getDay() + 7) % 7;
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + (daysUntilFriday === 0 ? 7 : daysUntilFriday));
    return nextFriday;
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-primary">
                Friday Reservations
              </h1>
              <p className="text-muted-foreground">Reserve your Friday night workspace</p>
            </div>
            {isStaff() && (
              <Button onClick={() => navigate('/admin')} variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Admin Dashboard
              </Button>
            )}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reservation Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  <span>Create Reservation</span>
                </CardTitle>
                <CardDescription>
                  Reserve your Friday night workspace (8PM-11AM)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Friday Date</label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    disabled={(date) => !isFriday(date) || date < new Date()}
                    className="rounded-md border"
                  />
                  {!isFriday(selectedDate) && (
                    <p className="text-sm text-muted-foreground">
                      Only Fridays are available for reservations
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Time Slot</label>
                  <Select value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map(slot => (
                        <SelectItem key={slot.value} value={slot.value}>
                          {slot.label} ({slot.duration})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleCreateReservation}
                  disabled={!isFriday(selectedDate) || !selectedTimeSlot || isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      Create Reservation
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* My Reservations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-primary" />
                  <span>My Reservations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {reservations.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    No reservations found
                  </p>
                ) : (
                  <div className="space-y-3">
                    {reservations.map(reservation => (
                      <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-semibold">{formatDate(new Date(reservation.date))}</p>
                          <p className="text-sm text-muted-foreground">
                            {reservation.start} - {reservation.end}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={reservation.status === 'active' ? 'default' : 'secondary'}>
                            {reservation.status}
                          </Badge>
                          {reservation.status === 'active' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleCancelReservation(reservation.id)}
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

          {/* Calendar & Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  <span>Friday Calendar</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground">
                    Next available Friday: {formatDate(getNextFriday())}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Available</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Open slots</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Reserved</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Booked</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  <span>Reservation Rules</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <p>• Reservations are only available for Fridays</p>
                  <p>• Time slot: 8:00 PM - 11:00 AM (15 hours)</p>
                  <p>• One reservation per member per Friday</p>
                  <p>• No-show auto-release after 30 minutes</p>
                  <p>• Reservations can be cancelled up to 2 hours before</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Current Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {reservations.filter(r => r.status === 'active').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Active Reservations</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold text-green-600">
                        {reservations.filter(r => r.status === 'active').length}
                      </div>
                      <div className="text-xs text-muted-foreground">Confirmed</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold text-red-600">
                        {reservations.filter(r => r.status === 'cancelled').length}
                      </div>
                      <div className="text-xs text-muted-foreground">Cancelled</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FridayReservations;
