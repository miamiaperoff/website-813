import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar as CalendarIcon, Clock, CreditCard, User } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';
import { toast } from '../ui/use-toast';

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

interface SeatBookingFormProps {
  selectedSeat: Seat;
  onBookingComplete: (booking: any) => void;
  onCancel: () => void;
}

const SeatBookingForm: React.FC<SeatBookingFormProps> = ({
  selectedSeat,
  onBookingComplete,
  onCancel
}) => {
  const [date, setDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState('4');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate time slots
  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30'
  ];

  // Calculate total price
  const calculateTotal = () => {
    const hours = parseInt(duration);
    return selectedSeat.price * hours;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const booking = {
        id: `booking_${Date.now()}`,
        seatId: selectedSeat.id,
        seatNumber: selectedSeat.number,
        date: date,
        startTime: startTime,
        endTime: endTime,
        duration: parseInt(duration),
        totalPrice: calculateTotal(),
        status: 'confirmed',
        specialRequests,
        createdAt: new Date()
      };

      onBookingComplete(booking);
      
      toast({
        title: "Booking Confirmed!",
        description: `Your seat ${selectedSeat.number} has been booked successfully.`,
      });
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error processing your booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update end time when start time or duration changes
  React.useEffect(() => {
    if (startTime && duration) {
      const start = new Date(`2000-01-01T${startTime}:00`);
      const end = new Date(start.getTime() + parseInt(duration) * 60 * 60 * 1000);
      const endTimeString = end.toTimeString().slice(0, 5);
      setEndTime(endTimeString);
    }
  }, [startTime, duration]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Book Seat {selectedSeat.number}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Seat Details Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Selected Seat</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{selectedSeat.number} - {selectedSeat.type}</p>
                <p className="text-sm text-gray-600">{selectedSeat.location.area} area</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedSeat.amenities.map(amenity => (
                    <span key={amenity} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">${selectedSeat.price}/hour</p>
              </div>
            </div>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label>Select Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Select value={startTime} onValueChange={setStartTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select start time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(time => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 6, 8, 12].map(hours => (
                    <SelectItem key={hours} value={hours.toString()}>
                      {hours} {hours === 1 ? 'hour' : 'hours'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* End Time Display */}
          {endTime && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span>End Time: {endTime}</span>
              </div>
            </div>
          )}

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
            <Input
              id="specialRequests"
              placeholder="Any special requirements or notes..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
            />
          </div>

          {/* Pricing Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Booking Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Seat {selectedSeat.number} ({selectedSeat.type})</span>
                <span>${selectedSeat.price}/hour</span>
              </div>
              <div className="flex justify-between">
                <span>Duration</span>
                <span>{duration} {parseInt(duration) === 1 ? 'hour' : 'hours'}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-1">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={!startTime || !duration || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Confirm Booking
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SeatBookingForm;
