# Seating Chart & Booking System

This document describes the new seating chart and booking system implemented for the 813 Cafe coworking space.

## Features

### 🪑 Interactive Seating Chart
- **Visual Layout**: Grid-based seating arrangement showing different areas (Window, Center, Booth, Conference)
- **Real-time Status**: Live updates showing seat availability (Available, Booked, Maintenance, Reserved)
- **Multiple Views**: Grid view for visual layout, List view for detailed information
- **Filtering**: Filter seats by type (Desk, Booth, Conference, Phone) and status
- **Amenities Display**: Shows available amenities for each seat (Power, Monitor, Privacy, etc.)

### 📅 Booking System
- **Date Selection**: Calendar picker for booking dates
- **Time Slots**: Flexible time selection with automatic end time calculation
- **Duration Options**: 1, 2, 3, 4, 6, 8, or 12-hour booking slots
- **Pricing**: Dynamic pricing based on seat type and duration
- **Special Requests**: Optional notes for specific requirements

### 🎯 Seat Types & Pricing
- **Desks**: $12-18/hour (basic to premium with standing desk option)
- **Booths**: $22-25/hour (privacy-focused workspaces)
- **Conference Rooms**: $35-40/hour (team meeting spaces)
- **Phone Booths**: Available for private calls

### 📍 Areas
- **Window Area**: Natural light desks with monitors
- **Center Area**: Main workspace with various desk types
- **Booth Area**: Private booths for focused work
- **Conference Area**: Meeting rooms with projectors and whiteboards

## Components

### SeatingChart.tsx
Main component displaying the interactive seating layout with filtering and selection capabilities.

**Props:**
- `selectedDate`: Date for booking
- `onSeatSelect`: Callback when a seat is selected
- `selectedSeat`: Currently selected seat
- `userBookings`: Array of user's existing bookings

### SeatBookingForm.tsx
Booking form component for confirming seat reservations with time and date selection.

**Props:**
- `selectedSeat`: The seat being booked
- `onBookingComplete`: Callback when booking is confirmed
- `onCancel`: Callback when booking is cancelled

### SeatBooking.tsx
Main booking page that integrates the seating chart and booking form.

### SeatManagement.tsx (Admin)
Admin component for managing seat configurations, status, and pricing.

## Usage

### For Members
1. Navigate to `/member/seat-booking` from the dashboard
2. View available seats in the interactive chart
3. Filter by seat type or status if needed
4. Click on an available seat to select it
5. Choose your date and time preferences
6. Confirm your booking and payment

### For Admins
1. Access the seat management interface
2. Add new seats with custom configurations
3. Update seat status (Available, Booked, Maintenance, Reserved)
4. Modify pricing and amenities
5. Delete or edit existing seats

## Integration

The seating chart integrates with:
- **Member Dashboard**: Quick access via "Book Seat" button
- **Authentication System**: Protected routes for members only
- **Booking System**: Seamless integration with existing booking infrastructure
- **Payment System**: Ready for payment processing integration

## Technical Details

### State Management
- React hooks for local state management
- Toast notifications for user feedback
- Real-time status updates

### Styling
- Tailwind CSS for responsive design
- Shadcn/ui components for consistent UI
- Color-coded status indicators
- Hover effects and animations

### Data Structure
```typescript
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
```

## Future Enhancements

- **Real-time Updates**: WebSocket integration for live seat status
- **Recurring Bookings**: Support for weekly/monthly recurring reservations
- **Waitlist System**: Queue for popular seats
- **Mobile App**: Native mobile application for booking
- **Analytics**: Usage statistics and seat utilization reports
- **Integration**: Calendar sync and email notifications

## Routes

- `/member/seat-booking` - Main seat booking interface
- `/member-portal/dashboard` - Updated dashboard with seat booking access
- Admin seat management (integrate with existing admin panel)

## Dependencies

- React 18+
- React Router DOM
- Lucide React (icons)
- date-fns (date formatting)
- Tailwind CSS
- Shadcn/ui components

---

*This seating chart system provides a comprehensive solution for workspace management and member booking, enhancing the overall coworking experience at 813 Cafe.*
