import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { Calendar, Clock, MapPin, Users, CheckCircle, XCircle, Wrench } from 'lucide-react';
import { toast } from '../ui/use-toast';

// Types for seat management
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
  userId: string;
  startTime: Date;
  endTime: Date;
  date: Date;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface SeatingChartProps {
  selectedDate?: Date;
  onSeatSelect?: (seat: Seat) => void;
  selectedSeat?: Seat | null;
  userBookings?: Booking[];
}

// Mock data for demonstration
const mockSeats: Seat[] = [
  // Row 1 - Window Desks
  { id: '1', number: 'A1', type: 'desk', status: 'available', amenities: ['power', 'monitor'], price: 15, location: { row: 1, col: 1, area: 'window' } },
  { id: '2', number: 'A2', type: 'desk', status: 'booked', amenities: ['power', 'monitor'], price: 15, location: { row: 1, col: 2, area: 'window' } },
  { id: '3', number: 'A3', type: 'desk', status: 'available', amenities: ['power'], price: 12, location: { row: 1, col: 3, area: 'window' } },
  { id: '4', number: 'A4', type: 'desk', status: 'maintenance', amenities: ['power', 'monitor'], price: 15, location: { row: 1, col: 4, area: 'window' } },
  
  // Row 2 - Center Desks
  { id: '5', number: 'B1', type: 'desk', status: 'available', amenities: ['power', 'monitor', 'standing'], price: 18, location: { row: 2, col: 1, area: 'center' } },
  { id: '6', number: 'B2', type: 'desk', status: 'available', amenities: ['power'], price: 12, location: { row: 2, col: 2, area: 'center' } },
  { id: '7', number: 'B3', type: 'desk', status: 'booked', amenities: ['power', 'monitor'], price: 15, location: { row: 2, col: 3, area: 'center' } },
  { id: '8', number: 'B4', type: 'desk', status: 'available', amenities: ['power'], price: 12, location: { row: 2, col: 4, area: 'center' } },
  
  // Row 3 - Booths
  { id: '9', number: 'C1', type: 'booth', status: 'available', amenities: ['power', 'privacy', 'phone'], price: 25, location: { row: 3, col: 1, area: 'booth' } },
  { id: '10', number: 'C2', type: 'booth', status: 'booked', amenities: ['power', 'privacy'], price: 22, location: { row: 3, col: 2, area: 'booth' } },
  { id: '11', number: 'C3', type: 'booth', status: 'available', amenities: ['power', 'privacy'], price: 22, location: { row: 3, col: 3, area: 'booth' } },
  
  // Row 4 - Conference Rooms
  { id: '12', number: 'D1', type: 'conference', status: 'available', amenities: ['power', 'projector', 'whiteboard', 'phone'], price: 40, location: { row: 4, col: 1, area: 'conference' } },
  { id: '13', number: 'D2', type: 'conference', status: 'booked', amenities: ['power', 'projector', 'whiteboard'], price: 35, location: { row: 4, col: 2, area: 'conference' } },
];

const SeatingChart: React.FC<SeatingChartProps> = ({
  selectedDate = new Date(),
  onSeatSelect,
  selectedSeat,
  userBookings = []
}) => {
  const [seats, setSeats] = useState<Seat[]>(mockSeats);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get seat status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'booked':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'maintenance':
        return <Wrench className="h-4 w-4 text-yellow-500" />;
      case 'reserved':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  // Get seat type color
  const getSeatTypeColor = (type: string) => {
    switch (type) {
      case 'desk':
        return 'bg-blue-100 border-blue-300';
      case 'booth':
        return 'bg-purple-100 border-purple-300';
      case 'conference':
        return 'bg-green-100 border-green-300';
      case 'phone':
        return 'bg-orange-100 border-orange-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  // Filter seats based on selected filters
  const filteredSeats = seats.filter(seat => {
    const typeMatch = filterType === 'all' || seat.type === filterType;
    const statusMatch = filterStatus === 'all' || seat.status === filterStatus;
    return typeMatch && statusMatch;
  });

  // Handle seat selection
  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'available' || seat.status === 'reserved') {
      onSeatSelect?.(seat);
      toast({
        title: "Seat Selected",
        description: `Selected ${seat.number} - ${seat.type} for $${seat.price}/hour`,
      });
    } else {
      toast({
        title: "Seat Unavailable",
        description: `Seat ${seat.number} is currently ${seat.status}`,
        variant: "destructive",
      });
    }
  };

  // Check if seat is selected
  const isSeatSelected = (seat: Seat) => {
    return selectedSeat?.id === seat.id;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Seating Chart</h2>
          <p className="text-gray-600">Select your preferred workspace</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Grid View
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            List View
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Type:</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="all">All Types</option>
                <option value="desk">Desks</option>
                <option value="booth">Booths</option>
                <option value="conference">Conference Rooms</option>
                <option value="phone">Phone Booths</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Status:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="booked">Booked</option>
                <option value="reserved">Reserved</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">Maintenance</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Reserved</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seating Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Available Seats</CardTitle>
        </CardHeader>
        <CardContent>
          {viewMode === 'grid' ? (
            <div className="space-y-4">
              {/* Window Area */}
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Window Area
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {filteredSeats.filter(seat => seat.location.area === 'window').map(seat => (
                    <div
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      className={`
                        p-3 border-2 rounded-lg cursor-pointer transition-all duration-200
                        ${getSeatTypeColor(seat.type)}
                        ${isSeatSelected(seat) ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                        ${seat.status === 'available' || seat.status === 'reserved' ? 'hover:shadow-md' : 'opacity-50 cursor-not-allowed'}
                      `}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-sm">{seat.number}</span>
                        {getStatusIcon(seat.status)}
                      </div>
                      <div className="text-xs text-gray-600">
                        <div>{seat.type}</div>
                        <div className="font-semibold">${seat.price}/hr</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center Area */}
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Center Area
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {filteredSeats.filter(seat => seat.location.area === 'center').map(seat => (
                    <div
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      className={`
                        p-3 border-2 rounded-lg cursor-pointer transition-all duration-200
                        ${getSeatTypeColor(seat.type)}
                        ${isSeatSelected(seat) ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                        ${seat.status === 'available' || seat.status === 'reserved' ? 'hover:shadow-md' : 'opacity-50 cursor-not-allowed'}
                      `}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-sm">{seat.number}</span>
                        {getStatusIcon(seat.status)}
                      </div>
                      <div className="text-xs text-gray-600">
                        <div>{seat.type}</div>
                        <div className="font-semibold">${seat.price}/hr</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booth Area */}
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Booth Area
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {filteredSeats.filter(seat => seat.location.area === 'booth').map(seat => (
                    <div
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      className={`
                        p-3 border-2 rounded-lg cursor-pointer transition-all duration-200
                        ${getSeatTypeColor(seat.type)}
                        ${isSeatSelected(seat) ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                        ${seat.status === 'available' || seat.status === 'reserved' ? 'hover:shadow-md' : 'opacity-50 cursor-not-allowed'}
                      `}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-sm">{seat.number}</span>
                        {getStatusIcon(seat.status)}
                      </div>
                      <div className="text-xs text-gray-600">
                        <div>{seat.type}</div>
                        <div className="font-semibold">${seat.price}/hr</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conference Area */}
              <div>
                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Conference Rooms
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {filteredSeats.filter(seat => seat.location.area === 'conference').map(seat => (
                    <div
                      key={seat.id}
                      onClick={() => handleSeatClick(seat)}
                      className={`
                        p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                        ${getSeatTypeColor(seat.type)}
                        ${isSeatSelected(seat) ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
                        ${seat.status === 'available' || seat.status === 'reserved' ? 'hover:shadow-md' : 'opacity-50 cursor-not-allowed'}
                      `}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold">{seat.number}</span>
                        {getStatusIcon(seat.status)}
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>{seat.type}</div>
                        <div className="font-semibold">${seat.price}/hr</div>
                        <div className="mt-1">
                          {seat.amenities.map(amenity => (
                            <Badge key={amenity} variant="secondary" className="mr-1 mb-1 text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // List View
            <div className="space-y-3">
              {filteredSeats.map(seat => (
                <div
                  key={seat.id}
                  onClick={() => handleSeatClick(seat)}
                  className={`
                    p-4 border rounded-lg cursor-pointer transition-all duration-200
                    ${isSeatSelected(seat) ? 'ring-2 ring-blue-500 ring-offset-2 bg-blue-50' : 'hover:bg-gray-50'}
                    ${seat.status !== 'available' && seat.status !== 'reserved' ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-lg">{seat.number}</span>
                        <Badge variant="outline">{seat.type}</Badge>
                        {getStatusIcon(seat.status)}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-4">
                          <span>Area: {seat.location.area}</span>
                          <span className="font-semibold">${seat.price}/hour</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {seat.amenities.map(amenity => (
                          <Badge key={amenity} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selected Seat Details */}
      {selectedSeat && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Selected Seat Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{selectedSeat.number}</h3>
                  <p className="text-gray-600 capitalize">{selectedSeat.type} • {selectedSeat.location.area} area</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">${selectedSeat.price}</div>
                  <div className="text-sm text-gray-600">per hour</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Amenities:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSeat.amenities.map(amenity => (
                    <Badge key={amenity} variant="outline">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  This seat is available for booking. Proceed to select your time slot.
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SeatingChart;
