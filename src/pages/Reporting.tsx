import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Download, 
  Calendar as CalendarIcon, 
  BarChart3, 
  Users, 
  DollarSign,
  Clock,
  FileText,
  Filter,
  RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ReportData {
  sessions: any[];
  payments: any[];
  redemptions: any[];
  guestUses: any[];
  reservations: any[];
}

const Reporting: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  const [reportData, setReportData] = useState<ReportData>({
    sessions: [],
    payments: [],
    redemptions: [],
    guestUses: [],
    reservations: []
  });
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    to: new Date()
  });
  const [selectedReport, setSelectedReport] = useState<string>('sessions');
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock report data
  const mockData: ReportData = {
    sessions: [
      {
        id: '1',
        memberId: '1',
        memberName: 'John Doe',
        code: 'ABC123',
        startedAt: '2024-01-15T09:00:00Z',
        endedAt: '2024-01-15T17:00:00Z',
        duration: 480,
        status: 'completed'
      },
      {
        id: '2',
        memberId: '2',
        memberName: 'Sarah Wilson',
        code: 'DEF456',
        startedAt: '2024-01-15T10:30:00Z',
        endedAt: null,
        duration: null,
        status: 'active'
      }
    ],
    payments: [
      {
        id: '1',
        memberId: '1',
        memberName: 'John Doe',
        periodStart: '2024-01-01',
        periodEnd: '2024-01-31',
        isPaid: true,
        markedBy: 'hey@813cafe.com',
        markedAt: '2024-01-01T10:00:00Z',
        note: 'Payment received'
      },
      {
        id: '2',
        memberId: '2',
        memberName: 'Sarah Wilson',
        periodStart: '2024-01-01',
        periodEnd: '2024-01-31',
        isPaid: false,
        markedBy: 'hey@813cafe.com',
        markedAt: '2024-01-01T10:00:00Z',
        note: 'Payment pending'
      }
    ],
    redemptions: [
      {
        id: '1',
        memberId: '1',
        memberName: 'John Doe',
        cashier: 'barista1',
        redeemedAt: '2024-01-15T14:30:00Z',
        amount: 150,
        status: 'redeemed'
      },
      {
        id: '2',
        memberId: '2',
        memberName: 'Sarah Wilson',
        cashier: 'barista2',
        redeemedAt: '2024-01-15T16:00:00Z',
        amount: 120,
        status: 'redeemed'
      }
    ],
    guestUses: [
      {
        id: '1',
        memberId: '1',
        memberName: 'John Doe',
        guestCode: 'GHI789',
        usedAt: '2024-01-15T11:00:00Z',
        status: 'used'
      }
    ],
    reservations: [
      {
        id: '1',
        memberId: '1',
        memberName: 'John Doe',
        date: '2024-01-19',
        start: '20:00',
        end: '11:00',
        status: 'active'
      }
    ]
  };

  const reportTypes = [
    { value: 'sessions', label: 'Sessions', icon: Clock },
    { value: 'payments', label: 'Payments', icon: DollarSign },
    { value: 'redemptions', label: 'Drink Redemptions', icon: FileText },
    { value: 'guestUses', label: 'Guest Uses', icon: Users },
    { value: 'reservations', label: 'Reservations', icon: CalendarIcon }
  ];

  useEffect(() => {
    if (!isAdmin()) {
      navigate('/auth');
      return;
    }

    loadReportData();
  }, [isAdmin, navigate, dateRange]);

  const loadReportData = async () => {
    setIsLoading(true);
    try {
      // Filter data by date range
      const filteredData: ReportData = {
        sessions: mockData.sessions.filter(item => 
          isDateInRange(item.startedAt, dateRange.from, dateRange.to)
        ),
        payments: mockData.payments.filter(item => 
          isDateInRange(item.markedAt, dateRange.from, dateRange.to)
        ),
        redemptions: mockData.redemptions.filter(item => 
          isDateInRange(item.redeemedAt, dateRange.from, dateRange.to)
        ),
        guestUses: mockData.guestUses.filter(item => 
          isDateInRange(item.usedAt, dateRange.from, dateRange.to)
        ),
        reservations: mockData.reservations.filter(item => 
          isDateInRange(item.date, dateRange.from, dateRange.to)
        )
      };
      
      setReportData(filteredData);
    } catch (error) {
      console.error('Error loading report data:', error);
      setMessage({ type: 'error', text: 'Failed to load report data' });
    } finally {
      setIsLoading(false);
    }
  };

  const isDateInRange = (dateString: string, from?: Date, to?: Date): boolean => {
    const date = new Date(dateString);
    if (!from || !to) return true;
    return date >= from && date <= to;
  };

  const handleExportCSV = async (reportType: string) => {
    try {
      const data = reportData[reportType as keyof ReportData];
      if (!data || data.length === 0) {
        setMessage({ type: 'error', text: 'No data to export' });
        return;
      }

      // Convert data to CSV
      const csvContent = convertToCSV(data);
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${reportType}_${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      window.URL.revokeObjectURL(url);

      setMessage({ type: 'success', text: 'CSV file downloaded successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to export CSV' });
    }
  };

  const convertToCSV = (data: any[]): string => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        }).join(',')
      )
    ];
    
    return csvRows.join('\n');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getReportStats = () => {
    return {
      totalSessions: reportData.sessions.length,
      totalPayments: reportData.payments.length,
      paidPayments: reportData.payments.filter(p => p.isPaid).length,
      totalRedemptions: reportData.redemptions.length,
      totalGuestUses: reportData.guestUses.length,
      totalReservations: reportData.reservations.length
    };
  };

  const stats = getReportStats();

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-primary">
                Reporting Dashboard
              </h1>
              <p className="text-muted-foreground">Export data and generate reports</p>
            </div>
            <Button onClick={() => navigate('/admin')} variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Admin Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Messages */}
        {message && (
          <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className="mb-6">
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {/* Date Range Selector */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
              <span>Date Range</span>
            </CardTitle>
            <CardDescription>
              Select the date range for your reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">From Date</label>
                <Calendar
                  mode="single"
                  selected={dateRange.from}
                  onSelect={(date) => setDateRange(prev => ({ ...prev, from: date }))}
                  className="rounded-md border"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">To Date</label>
                <Calendar
                  mode="single"
                  selected={dateRange.to}
                  onSelect={(date) => setDateRange(prev => ({ ...prev, to: date }))}
                  className="rounded-md border"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button onClick={loadReportData} disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Sessions</p>
                  <p className="text-2xl font-bold text-primary">{stats.totalSessions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Payments</p>
                  <p className="text-2xl font-bold text-primary">{stats.paidPayments}/{stats.totalPayments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Redemptions</p>
                  <p className="text-2xl font-bold text-primary">{stats.totalRedemptions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Guest Uses</p>
                  <p className="text-2xl font-bold text-primary">{stats.totalGuestUses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CalendarIcon className="h-8 w-8 text-orange-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Reservations</p>
                  <p className="text-2xl font-bold text-primary">{stats.totalReservations}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Download className="h-8 w-8 text-gray-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Export All</p>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      reportTypes.forEach(report => handleExportCSV(report.value));
                    }}
                  >
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedReport} onValueChange={setSelectedReport} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            {reportTypes.map(report => (
              <TabsTrigger key={report.value} value={report.value} className="flex items-center space-x-2">
                <report.icon className="w-4 h-4" />
                <span>{report.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {reportTypes.map(report => (
            <TabsContent key={report.value} value={report.value} className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <report.icon className="w-5 h-5 text-primary" />
                        <span>{report.label} Report</span>
                      </CardTitle>
                      <CardDescription>
                        {reportData[report.value as keyof ReportData]?.length || 0} records found
                      </CardDescription>
                    </div>
                    <Button 
                      onClick={() => handleExportCSV(report.value)}
                      disabled={!reportData[report.value as keyof ReportData]?.length}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export CSV
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {!reportData[report.value as keyof ReportData]?.length ? (
                    <p className="text-center text-muted-foreground py-8">
                      No data found for the selected date range
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {reportData[report.value as keyof ReportData]?.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {Object.entries(item).map(([key, value]) => (
                                <div key={key}>
                                  <p className="text-sm font-medium text-muted-foreground capitalize">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                  </p>
                                  <p className="text-sm">
                                    {typeof value === 'boolean' 
                                      ? (value ? 'Yes' : 'No')
                                      : value?.toString() || 'N/A'
                                    }
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <Badge variant="outline">
                            {report.value}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Reporting;
