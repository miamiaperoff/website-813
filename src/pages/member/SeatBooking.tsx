import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SeatingChart from '../../components/member/SeatingChart';
import SeatBookingForm from '../../components/member/SeatBookingForm';
import { toast } from '../../components/ui/use-toast';

interface Seat {
  id: string;
  number: string;
  type: 'desk' | 'booth' | 'conference' | 'phone';
  status: 'available' | 'booked' | 'maintenance' | 'reserved';
  amenities: string[];
  price: number;
  location: {
    row: number;
    col: number;
    area: string;
  };
}

interface Booking {
  id: string;
  seatId: string;
  seatNumber: string;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  specialRequests?: string;
  createdAt: Date;
}

const SeatBooking: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);

  // Handle seat selection
  const handleSeatSelect = (seat: Seat) => {
    setSelectedSeat(seat);
    setShowBookingForm(true);
  };

  // Handle booking completion
  const handleBookingComplete = (booking: Booking) => {
    setRecentBookings(prev => [booking, ...prev.slice(0, 4)]); // Keep only 5 recent bookings
    setShowBookingForm(false);
    setSelectedSeat(null);
    
    // Show success message
    toast({
      title: "Booking Successful!",
      description: `Your seat ${booking.seatNumber} has been confirmed for ${booking.date.toLocaleDateString()}.`,
    });
  };

  // Handle booking cancellation
  const handleBookingCancel = () => {
    setShowBookingForm(false);
    setSelectedSeat(null);
  };

  // Handle back navigation
  const handleBack = () => {
    if (showBookingForm) {
      handleBookingCancel();
    } else {
      navigate('/member/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Seat Booking</h1>
              <p className="text-gray-600">Reserve your workspace for productive sessions</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Available Seats</p>
                    <p className="text-2xl font-bold text-green-600">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Seats</p>
                    <p className="text-2xl font-bold text-blue-600">13</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Today's Bookings</p>
                    <p className="text-2xl font-bold text-purple-600">5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        {!showBookingForm ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Seating Chart */}
            <div className="lg:col-span-2">
              <SeatingChart
                selectedDate={new Date()}
                onSeatSelect={handleSeatSelect}
                selectedSeat={selectedSeat}
                userBookings={recentBookings}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Recent Bookings */}
              {recentBookings.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Recent Bookings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentBookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg p-3">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-semibold">Seat {booking.seatNumber}</p>
                              <p className="text-sm text-gray-600">
                                {booking.date.toLocaleDateString()}
                              </p>
                            </div>
                            <Badge 
                              variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>{booking.startTime} - {booking.endTime}</p>
                            <p className="font-semibold">${booking.totalPrice}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Booking Tips */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Booking Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <p>Desks are perfect for individual work with power outlets and monitors</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <p>Booths offer privacy for calls and focused work</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <p>Conference rooms are ideal for team meetings</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <p>Phone booths are great for private calls</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Amenities Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Available Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Power Outlets</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Monitors</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>Privacy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>Phone Access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span>Standing Desk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Projector</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <div className="max-w-4xl mx-auto">
            {selectedSeat && (
              <SeatBookingForm
                selectedSeat={selectedSeat}
                onBookingComplete={handleBookingComplete}
                onCancel={handleBookingCancel}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatBooking;
