import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle,
  Coffee,
  Wifi,
  Phone,
  Monitor,
  Headphones,
  Zap,
  Lock
} from 'lucide-react';

interface Workspace {
  id: string;
  name: string;
  type: 'desk' | 'call-box';
  status: 'available' | 'occupied' | 'reserved';
  memberName?: string;
  amenities: string[];
  position: { row: number; col: number };
}

interface Booking {
  id: string;
  workspaceId: string;
  memberName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending';
}

const BookingCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Mock workspace data
  const workspaces: Workspace[] = [
    {
      id: 'desk-1',
      name: 'Desk 1',
      type: 'desk',
      status: 'available',
      amenities: ['wifi', 'power', 'monitor'],
      position: { row: 1, col: 1 }
    },
    {
      id: 'desk-2',
      name: 'Desk 2',
      type: 'desk',
      status: 'occupied',
      memberName: 'John Doe',
      amenities: ['wifi', 'power', 'monitor'],
      position: { row: 1, col: 2 }
    },
    {
      id: 'desk-3',
      name: 'Desk 3',
      type: 'desk',
      status: 'reserved',
      memberName: 'Sarah Wilson',
      amenities: ['wifi', 'power', 'monitor'],
      position: { row: 1, col: 3 }
    },
    {
      id: 'desk-4',
      name: 'Desk 4',
      type: 'desk',
      status: 'available',
      amenities: ['wifi', 'power'],
      position: { row: 2, col: 1 }
    },
    {
      id: 'desk-5',
      name: 'Desk 5',
      type: 'desk',
      status: 'available',
      amenities: ['wifi', 'power', 'monitor'],
      position: { row: 2, col: 2 }
    },
    {
      id: 'desk-6',
      name: 'Desk 6',
      type: 'desk',
      status: 'occupied',
      memberName: 'Mike Chen',
      amenities: ['wifi', 'power', 'monitor'],
      position: { row: 2, col: 3 }
    },
    {
      id: 'call-box-1',
      name: 'Call Box 1',
      type: 'call-box',
      status: 'available',
      amenities: ['wifi', 'power', 'privacy', 'acoustic'],
      position: { row: 3, col: 1 }
    }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'power': return <Zap className="w-4 h-4" />;
      case 'monitor': return <Monitor className="w-4 h-4" />;
      case 'privacy': return <Lock className="w-4 h-4" />;
      case 'acoustic': return <Headphones className="w-4 h-4" />;
      default: return <Coffee className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'occupied': return 'bg-red-100 text-red-800 border-red-200';
      case 'reserved': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleWorkspaceSelect = (workspaceId: string) => {
    if (selectedWorkspace === workspaceId) {
      setSelectedWorkspace(null);
    } else {
      setSelectedWorkspace(workspaceId);
    }
  };

  const handleBooking = () => {
    if (!selectedWorkspace) return;

    const workspace = workspaces.find(w => w.id === selectedWorkspace);
    if (!workspace || workspace.status !== 'available') return;

    const newBooking: Booking = {
      id: `booking_${Date.now()}`,
      workspaceId: selectedWorkspace,
      memberName: 'You',
      date: selectedDate.toISOString().split('T')[0],
      startTime: selectedTime,
      endTime: `${String(parseInt(selectedTime.split(':')[0]) + 1).padStart(2, '0')}:${selectedTime.split(':')[1]}`,
      status: 'confirmed'
    };

    setBookings(prev => [...prev, newBooking]);
    setSelectedWorkspace(null);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Date and Time Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Select Date & Time</span>
          </CardTitle>
          <CardDescription>
            Choose when you'd like to work
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Date Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">Date</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000))}
                >
                  ←
                </Button>
                <div className="flex-1 text-center p-3 bg-muted/50 rounded-lg">
                  {formatDate(selectedDate)}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000))}
                >
                  →
                </Button>
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <label className="text-sm font-medium mb-2 block">Start Time</label>
              <div className="grid grid-cols-5 gap-2">
                {timeSlots.map(time => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className="text-xs"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workspace Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Choose Your Workspace</span>
          </CardTitle>
          <CardDescription>
            Select an available workspace for your session
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Seating Chart */}
          <div className="space-y-6">
            {/* Desks Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Desks</span>
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {workspaces.filter(w => w.type === 'desk').map(workspace => (
                  <div
                    key={workspace.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedWorkspace === workspace.id 
                        ? 'ring-2 ring-primary ring-offset-2' 
                        : ''
                    } ${
                      workspace.status === 'available' 
                        ? 'hover:shadow-md' 
                        : 'cursor-not-allowed opacity-60'
                    } ${getStatusColor(workspace.status)}`}
                    onClick={() => workspace.status === 'available' && handleWorkspaceSelect(workspace.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{workspace.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {workspace.status}
                      </Badge>
                    </div>
                    
                    {workspace.memberName && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {workspace.status === 'occupied' ? 'Occupied by' : 'Reserved for'}: {workspace.memberName}
                      </p>
                    )}
                    
                    <div className="flex space-x-1">
                      {workspace.amenities.map(amenity => (
                        <div key={amenity} className="p-1 bg-background/50 rounded">
                          {getAmenityIcon(amenity)}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call Box Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Phone className="w-5 h-5 text-primary" />
                <span>Call Box</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {workspaces.filter(w => w.type === 'call-box').map(workspace => (
                  <div
                    key={workspace.id}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedWorkspace === workspace.id 
                        ? 'ring-2 ring-primary ring-offset-2' 
                        : ''
                    } ${
                      workspace.status === 'available' 
                        ? 'hover:shadow-md' 
                        : 'cursor-not-allowed opacity-60'
                    } ${getStatusColor(workspace.status)}`}
                    onClick={() => workspace.status === 'available' && handleWorkspaceSelect(workspace.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-lg">{workspace.name}</h4>
                      <Badge variant="outline">
                        {workspace.status}
                      </Badge>
                    </div>
                    
                    {workspace.memberName && (
                      <p className="text-sm text-muted-foreground mb-3">
                        {workspace.status === 'occupied' ? 'Occupied by' : 'Reserved for'}: {workspace.memberName}
                      </p>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      {workspace.amenities.map(amenity => (
                        <div key={amenity} className="flex items-center space-x-1 px-2 py-1 bg-background/50 rounded text-sm">
                          {getAmenityIcon(amenity)}
                          <span className="capitalize">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Action */}
          {selectedWorkspace && (
            <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Selected: {workspaces.find(w => w.id === selectedWorkspace)?.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(selectedDate)} at {selectedTime}
                  </p>
                </div>
                <Button onClick={handleBooking} className="bg-primary hover:bg-primary/90">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Coming Soon Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-primary" />
            <span>Additional Services</span>
          </CardTitle>
          <CardDescription>
            More booking options coming soon
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg border border-dashed">
              <div className="flex items-center space-x-2 mb-2">
                <Coffee className="w-5 h-5 text-muted-foreground" />
                <h4 className="font-medium">Meeting Rooms</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Book private meeting rooms for team sessions
              </p>
              <Badge variant="outline" className="text-xs">
                Coming Soon
              </Badge>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg border border-dashed">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-muted-foreground" />
                <h4 className="font-medium">Event Spaces</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Reserve larger spaces for workshops and events
              </p>
              <Badge variant="outline" className="text-xs">
                Coming Soon
              </Badge>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg border border-dashed">
              <div className="flex items-center space-x-2 mb-2">
                <Monitor className="w-5 h-5 text-muted-foreground" />
                <h4 className="font-medium">Equipment Rental</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Rent monitors, projectors, and other equipment
              </p>
              <Badge variant="outline" className="text-xs">
                Coming Soon
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Bookings */}
      {bookings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>Your Bookings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {bookings.map(booking => (
                <div key={booking.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div>
                    <h4 className="font-medium">{workspaces.find(w => w.id === booking.workspaceId)?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {booking.date} • {booking.startTime} - {booking.endTime}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {booking.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingCalendar;