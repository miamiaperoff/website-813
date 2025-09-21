import React from 'react';
import MemberLayout from '@/components/member/MemberLayout';
import BookingCalendar from '@/components/member/BookingCalendar';

const Booking: React.FC = () => {
  return (
    <MemberLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">
            Book Your Workspace
          </h1>
          <p className="text-muted-foreground">
            Reserve your spot for productive work sessions
          </p>
        </div>

        <BookingCalendar />
      </div>
    </MemberLayout>
  );
};

export default Booking;