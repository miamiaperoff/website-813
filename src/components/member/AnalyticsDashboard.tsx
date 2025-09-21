import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Users, 
  Calendar,
  Coffee,
  Wifi,
  Activity,
  Award,
  Target
} from 'lucide-react';

interface CheckInData {
  id: string;
  memberId: string;
  memberName: string;
  memberTier: 'basic' | 'premium' | 'vip';
  checkInTime: string;
  checkOutTime?: string;
  duration?: number;
  date: string;
}

interface MemberStats {
  memberId: string;
  memberName: string;
  memberTier: string;
  totalVisits: number;
  totalHours: number;
  averageSession: number;
  lastVisit: string;
  favoriteDay: string;
  favoriteTime: string;
}

interface DailyStats {
  date: string;
  totalCheckIns: number;
  totalHours: number;
  uniqueMembers: number;
  peakHour: string;
}

const AnalyticsDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [checkInData, setCheckInData] = useState<CheckInData[]>([]);
  const [memberStats, setMemberStats] = useState<MemberStats[]>([]);
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);

  // Mock data - in production, this would come from your database
  useEffect(() => {
    // Generate mock check-in data for the last 30 days
    const mockData: CheckInData[] = [];
    const members = [
      { id: '1', name: 'John Doe', tier: 'premium' },
      { id: '2', name: 'Sarah Wilson', tier: 'basic' },
      { id: '3', name: 'Mike Chen', tier: 'vip' },
      { id: '4', name: 'Ana Calubiran', tier: 'vip' },
      { id: '5', name: 'David Kim', tier: 'premium' }
    ];

    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Random check-ins per day (0-8)
      const checkInsToday = Math.floor(Math.random() * 9);
      
      for (let j = 0; j < checkInsToday; j++) {
        const member = members[Math.floor(Math.random() * members.length)];
        const checkInHour = 8 + Math.floor(Math.random() * 12); // 8 AM to 8 PM
        const duration = 60 + Math.floor(Math.random() * 480); // 1-8 hours
        
        const checkInTime = new Date(date);
        checkInTime.setHours(checkInHour, Math.floor(Math.random() * 60), 0);
        
        const checkOutTime = new Date(checkInTime);
        checkOutTime.setMinutes(checkOutTime.getMinutes() + duration);
        
        mockData.push({
          id: `checkin_${i}_${j}`,
          memberId: member.id,
          memberName: member.name,
          memberTier: member.tier as 'basic' | 'premium' | 'vip',
          checkInTime: checkInTime.toISOString(),
          checkOutTime: checkOutTime.toISOString(),
          duration,
          date: date.toISOString().split('T')[0]
        });
      }
    }
    
    setCheckInData(mockData);
    
    // Calculate member stats
    const stats: MemberStats[] = members.map(member => {
      const memberCheckIns = mockData.filter(d => d.memberId === member.id);
      const totalVisits = memberCheckIns.length;
      const totalHours = memberCheckIns.reduce((sum, d) => sum + (d.duration || 0), 0) / 60;
      const averageSession = totalHours / totalVisits || 0;
      const lastVisit = memberCheckIns.length > 0 
        ? memberCheckIns.sort((a, b) => new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime())[0].checkInTime
        : '';
      
      // Calculate favorite day and time
      const dayCounts: { [key: string]: number } = {};
      const hourCounts: { [key: string]: number } = {};
      
      memberCheckIns.forEach(checkIn => {
        const day = new Date(checkIn.checkInTime).toLocaleDateString('en-US', { weekday: 'long' });
        const hour = new Date(checkIn.checkInTime).getHours();
        dayCounts[day] = (dayCounts[day] || 0) + 1;
        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
      });
      
      const favoriteDay = Object.keys(dayCounts).reduce((a, b) => dayCounts[a] > dayCounts[b] ? a : b, 'Monday');
      const favoriteHour = Object.keys(hourCounts).reduce((a, b) => hourCounts[parseInt(a)] > hourCounts[parseInt(b)] ? a : b, '9');
      
      return {
        memberId: member.id,
        memberName: member.name,
        memberTier: member.tier,
        totalVisits,
        totalHours: Math.round(totalHours * 10) / 10,
        averageSession: Math.round(averageSession * 10) / 10,
        lastVisit,
        favoriteDay,
        favoriteTime: `${favoriteHour}:00`
      };
    });
    
    setMemberStats(stats);
    
    // Calculate daily stats
    const daily: DailyStats[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayData = mockData.filter(d => d.date === dateStr);
      const uniqueMembers = new Set(dayData.map(d => d.memberId)).size;
      const totalHours = dayData.reduce((sum, d) => sum + (d.duration || 0), 0) / 60;
      
      // Calculate peak hour
      const hourCounts: { [key: number]: number } = {};
      dayData.forEach(d => {
        const hour = new Date(d.checkInTime).getHours();
        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
      });
      const peakHour = Object.keys(hourCounts).reduce((a, b) => 
        hourCounts[parseInt(a)] > hourCounts[parseInt(b)] ? a : b, '9'
      );
      
      daily.push({
        date: dateStr,
        totalCheckIns: dayData.length,
        totalHours: Math.round(totalHours * 10) / 10,
        uniqueMembers,
        peakHour: `${peakHour}:00`
      });
    }
    
    setDailyStats(daily.reverse());
  }, []);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'vip': return 'bg-purple-100 text-purple-800';
      case 'premium': return 'bg-blue-100 text-blue-800';
      case 'basic': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const totalCheckIns = checkInData.length;
  const totalHours = checkInData.reduce((sum, d) => sum + (d.duration || 0), 0) / 60;
  const uniqueMembers = new Set(checkInData.map(d => d.memberId)).size;
  const averageSession = totalHours / totalCheckIns || 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Insights based on member check-in/out data
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{totalCheckIns}</p>
                <p className="text-sm text-muted-foreground">Total Check-ins</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-warm-accent/20 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-warm-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{Math.round(totalHours)}h</p>
                <p className="text-sm text-muted-foreground">Total Hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{uniqueMembers}</p>
                <p className="text-sm text-muted-foreground">Active Members</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{Math.round(averageSession * 10) / 10}h</p>
                <p className="text-sm text-muted-foreground">Avg Session</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Daily Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Daily Activity (Last 7 Days)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dailyStats.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{formatDate(day.date)}</p>
                    <p className="text-sm text-muted-foreground">
                      {day.uniqueMembers} members • Peak: {day.peakHour}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{day.totalCheckIns} check-ins</p>
                    <p className="text-sm text-muted-foreground">{day.totalHours}h total</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Member Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-primary" />
              <span>Top Members</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {memberStats
                .sort((a, b) => b.totalHours - a.totalHours)
                .slice(0, 5)
                .map((member, index) => (
                  <div key={member.memberId} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{member.memberName}</p>
                        <p className="text-sm text-muted-foreground">
                          {member.totalVisits} visits • {member.averageSession}h avg
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getTierColor(member.memberTier)}>
                        {member.memberTier}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {member.totalHours}h total
                      </p>
                    </div>
                  </div>
                ))
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Member Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <span>Member Statistics</span>
          </CardTitle>
          <CardDescription>
            Detailed breakdown of member activity and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Member</th>
                  <th className="text-left p-3 font-medium">Tier</th>
                  <th className="text-left p-3 font-medium">Visits</th>
                  <th className="text-left p-3 font-medium">Total Hours</th>
                  <th className="text-left p-3 font-medium">Avg Session</th>
                  <th className="text-left p-3 font-medium">Favorite Day</th>
                  <th className="text-left p-3 font-medium">Favorite Time</th>
                </tr>
              </thead>
              <tbody>
                {memberStats.map(member => (
                  <tr key={member.memberId} className="border-b">
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{member.memberName}</p>
                        <p className="text-sm text-muted-foreground">
                          Last visit: {member.lastVisit ? formatDate(member.lastVisit) : 'Never'}
                        </p>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge className={getTierColor(member.memberTier)}>
                        {member.memberTier}
                      </Badge>
                    </td>
                    <td className="p-3 font-medium">{member.totalVisits}</td>
                    <td className="p-3 font-medium">{member.totalHours}h</td>
                    <td className="p-3 font-medium">{member.averageSession}h</td>
                    <td className="p-3 text-muted-foreground">{member.favoriteDay}</td>
                    <td className="p-3 text-muted-foreground">{member.favoriteTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
