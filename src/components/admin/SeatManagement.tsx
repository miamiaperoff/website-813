import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Settings, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  CheckCircle,
  XCircle,
  Wrench,
  Clock
} from 'lucide-react';
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

const SeatManagement: React.FC = () => {
  const [seats, setSeats] = useState<Seat[]>([
    // Mock data - in real app, this would come from API
    { id: '1', number: 'A1', type: 'desk', status: 'available', amenities: ['power', 'monitor'], price: 15, location: { row: 1, col: 1, area: 'window' } },
    { id: '2', number: 'A2', type: 'desk', status: 'booked', amenities: ['power', 'monitor'], price: 15, location: { row: 1, col: 2, area: 'window' } },
    { id: '3', number: 'A3', type: 'desk', status: 'available', amenities: ['power'], price: 12, location: { row: 1, col: 3, area: 'window' } },
    { id: '4', number: 'A4', type: 'desk', status: 'maintenance', amenities: ['power', 'monitor'], price: 15, location: { row: 1, col: 4, area: 'window' } },
    { id: '5', number: 'B1', type: 'desk', status: 'available', amenities: ['power', 'monitor', 'standing'], price: 18, location: { row: 2, col: 1, area: 'center' } },
    { id: '6', number: 'B2', type: 'desk', status: 'available', amenities: ['power'], price: 12, location: { row: 2, col: 2, area: 'center' } },
    { id: '7', number: 'B3', type: 'desk', status: 'booked', amenities: ['power', 'monitor'], price: 15, location: { row: 2, col: 3, area: 'center' } },
    { id: '8', number: 'B4', type: 'desk', status: 'available', amenities: ['power'], price: 12, location: { row: 2, col: 4, area: 'center' } },
    { id: '9', number: 'C1', type: 'booth', status: 'available', amenities: ['power', 'privacy', 'phone'], price: 25, location: { row: 3, col: 1, area: 'booth' } },
    { id: '10', number: 'C2', type: 'booth', status: 'booked', amenities: ['power', 'privacy'], price: 22, location: { row: 3, col: 2, area: 'booth' } },
    { id: '11', number: 'C3', type: 'booth', status: 'available', amenities: ['power', 'privacy'], price: 22, location: { row: 3, col: 3, area: 'booth' } },
    { id: '12', number: 'D1', type: 'conference', status: 'available', amenities: ['power', 'projector', 'whiteboard', 'phone'], price: 40, location: { row: 4, col: 1, area: 'conference' } },
    { id: '13', number: 'D2', type: 'conference', status: 'booked', amenities: ['power', 'projector', 'whiteboard'], price: 35, location: { row: 4, col: 2, area: 'conference' } },
  ]);

  const [editingSeat, setEditingSeat] = useState<Seat | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSeat, setNewSeat] = useState<Partial<Seat>>({
    number: '',
    type: 'desk',
    status: 'available',
    amenities: [],
    price: 12,
    location: { row: 1, col: 1, area: 'center' }
  });

  // Get status icon
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

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'booked':
        return 'bg-red-100 text-red-800';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800';
      case 'reserved':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Handle status change
  const handleStatusChange = (seatId: string, newStatus: string) => {
    setSeats(prev => prev.map(seat => 
      seat.id === seatId ? { ...seat, status: newStatus as any } : seat
    ));
    
    toast({
      title: "Status Updated",
      description: `Seat status updated to ${newStatus}`,
    });
  };

  // Handle seat edit
  const handleEditSeat = (seat: Seat) => {
    setEditingSeat({ ...seat });
  };

  // Handle save edit
  const handleSaveEdit = () => {
    if (editingSeat) {
      setSeats(prev => prev.map(seat => 
        seat.id === editingSeat.id ? editingSeat : seat
      ));
      setEditingSeat(null);
      
      toast({
        title: "Seat Updated",
        description: `Seat ${editingSeat.number} has been updated`,
      });
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingSeat(null);
  };

  // Handle add new seat
  const handleAddSeat = () => {
    if (newSeat.number && newSeat.price) {
      const seat: Seat = {
        id: Date.now().toString(),
        number: newSeat.number,
        type: newSeat.type as any,
        status: newSeat.status as any,
        amenities: newSeat.amenities || [],
        price: newSeat.price,
        location: newSeat.location || { row: 1, col: 1, area: 'center' }
      };
      
      setSeats(prev => [...prev, seat]);
      setNewSeat({
        number: '',
        type: 'desk',
        status: 'available',
        amenities: [],
        price: 12,
        location: { row: 1, col: 1, area: 'center' }
      });
      setShowAddForm(false);
      
      toast({
        title: "Seat Added",
        description: `New seat ${seat.number} has been added`,
      });
    }
  };

  // Handle delete seat
  const handleDeleteSeat = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    setSeats(prev => prev.filter(seat => seat.id !== seatId));
    
    toast({
      title: "Seat Deleted",
      description: `Seat ${seat?.number} has been removed`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Seat Management</h2>
          <p className="text-gray-600">Manage workspace seats and their availability</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Seat
        </Button>
      </div>

      {/* Add New Seat Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Seat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="seatNumber">Seat Number</Label>
                <Input
                  id="seatNumber"
                  value={newSeat.number}
                  onChange={(e) => setNewSeat(prev => ({ ...prev, number: e.target.value }))}
                  placeholder="e.g., A5"
                />
              </div>
              <div>
                <Label htmlFor="seatType">Type</Label>
                <Select value={newSeat.type} onValueChange={(value) => setNewSeat(prev => ({ ...prev, type: value as any }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desk">Desk</SelectItem>
                    <SelectItem value="booth">Booth</SelectItem>
                    <SelectItem value="conference">Conference Room</SelectItem>
                    <SelectItem value="phone">Phone Booth</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="seatPrice">Price ($/hour)</Label>
                <Input
                  id="seatPrice"
                  type="number"
                  value={newSeat.price}
                  onChange={(e) => setNewSeat(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  placeholder="12"
                />
              </div>
              <div>
                <Label htmlFor="seatArea">Area</Label>
                <Select value={newSeat.location?.area} onValueChange={(value) => setNewSeat(prev => ({ 
                  ...prev, 
                  location: { ...prev.location!, area: value }
                }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="window">Window</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="booth">Booth</SelectItem>
                    <SelectItem value="conference">Conference</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleAddSeat} disabled={!newSeat.number || !newSeat.price}>
                <Save className="h-4 w-4 mr-2" />
                Add Seat
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {seats.map(seat => (
          <Card key={seat.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{seat.number}</CardTitle>
                  <p className="text-sm text-gray-600 capitalize">{seat.type}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(seat.status)}
                  <Badge className={getStatusColor(seat.status)}>
                    {seat.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Price:</span>
                  <span className="font-semibold">${seat.price}/hr</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Area:</span>
                  <span className="text-sm capitalize">{seat.location.area}</span>
                </div>

                <div>
                  <span className="text-sm text-gray-600">Amenities:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {seat.amenities.map(amenity => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Status Change */}
                <div>
                  <Label htmlFor={`status-${seat.id}`} className="text-sm">Status:</Label>
                  <Select 
                    value={seat.status} 
                    onValueChange={(value) => handleStatusChange(seat.id, value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="booked">Booked</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="reserved">Reserved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditSeat(seat)}
                    className="flex-1"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteSeat(seat.id)}
                    className="flex-1"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      {editingSeat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit Seat {editingSeat.number}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="editNumber">Seat Number</Label>
                  <Input
                    id="editNumber"
                    value={editingSeat.number}
                    onChange={(e) => setEditingSeat(prev => ({ ...prev!, number: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="editType">Type</Label>
                  <Select value={editingSeat.type} onValueChange={(value) => setEditingSeat(prev => ({ ...prev!, type: value as any }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desk">Desk</SelectItem>
                      <SelectItem value="booth">Booth</SelectItem>
                      <SelectItem value="conference">Conference Room</SelectItem>
                      <SelectItem value="phone">Phone Booth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="editPrice">Price ($/hour)</Label>
                  <Input
                    id="editPrice"
                    type="number"
                    value={editingSeat.price}
                    onChange={(e) => setEditingSeat(prev => ({ ...prev!, price: parseFloat(e.target.value) || 0 }))}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSaveEdit} className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" onClick={handleCancelEdit} className="flex-1">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SeatManagement;
