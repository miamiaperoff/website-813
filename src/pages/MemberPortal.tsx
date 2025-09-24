import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/authContext';
import { dataService } from '@/lib/dataService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { 
  Play, 
  Square, 
  Clock, 
  Users, 
  Coffee, 
  Wifi,
  AlertCircle,
  CheckCircle,
  XCircle,
  LogOut
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MemberSession } from '@/lib/types';

const MemberPortal: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [currentSession, setCurrentSession] = useState<MemberSession | null>(null);
  const [sessionCode, setSessionCode] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSessions, setActiveSessions] = useState<MemberSession[]>([]);
  const [isMembersOnly, setIsMembersOnly] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    loadData();
    
    // Check Members-Only hours
    const checkMembersOnly = () => {
      setIsMembersOnly(dataService.isMembersOnlyHours());
    };
    
    checkMembersOnly();
    const interval = setInterval(checkMembersOnly, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [user, navigate]);

  const loadData = async () => {
    try {
      const sessions = dataService.getActiveSessions();
      setActiveSessions(sessions);
      
      // Find current user's session
      const userSession = sessions.find(s => s.memberId === user?.id);
      setCurrentSession(userSession || null);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleStartSession = async () => {
    if (!user) return;
    
    setIsLoading(true);
    setMessage(null);
    
    try {
      const result = dataService.startSession(user.id);
      
      if (result.success && result.session) {
        setCurrentSession(result.session);
        setMessage({ 
          type: 'success', 
          text: `Session started! Your code is: ${result.session.code}` 
        });
        loadData();
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to start session' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndSession = async () => {
    if (!currentSession) return;
    
    setIsLoading(true);
    setMessage(null);
    
    try {
      const result = dataService.endSession(currentSession.id);
      
      if (result.success) {
        setCurrentSession(null);
        setMessage({ type: 'success', text: 'Session ended successfully' });
        loadData();
      } else {
        setMessage({ type: 'error', text: 'Failed to end session' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidateCode = async () => {
    if (!sessionCode) return;
    
    setIsLoading(true);
    setMessage(null);
    
    try {
      const result = dataService.validateSessionCode(sessionCode);
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Valid session code!' });
        setSessionCode('');
      } else {
        setMessage({ type: 'error', text: result.error || 'Invalid session code' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-serif font-bold text-primary">
                813 Cafe Member Portal
              </h1>
              <p className="text-muted-foreground">Welcome, {user?.name}</p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* Current Session Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Current Session</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentSession ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Active Session</h3>
                    <p className="text-sm text-muted-foreground">
                      Started at {formatTime(currentSession.startedAt)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Your session code: <span className="font-mono font-bold text-primary">{currentSession.code}</span>
                    </p>
                  </div>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Active
                  </Badge>
                </div>
                
                <Button 
                  onClick={handleEndSession}
                  variant="destructive"
                  disabled={isLoading}
                  className="w-full"
                >
                  <Square className="w-4 h-4 mr-2" />
                  End Session
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">No Active Session</h3>
                  <p className="text-muted-foreground mb-4">
                    Start a session to begin working in the space
                  </p>
                  
                  <Button 
                    onClick={handleStartSession}
                    disabled={isLoading}
                    className="w-full"
                    size="lg"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Session
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Session Code Validation */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>Validate Session Code</span>
            </CardTitle>
            <CardDescription>
              Enter a 6-digit session code to validate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                placeholder="Enter 6-digit code (e.g., ABC123)"
                value={sessionCode}
                onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
                maxLength={6}
                className="text-center text-lg font-mono"
              />
              <Button 
                onClick={handleValidateCode}
                disabled={!sessionCode || isLoading}
                className="w-full"
              >
                Validate Code
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Space Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Space Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Currently In:</span>
                  <span className="font-semibold">{activeSessions.length}/13</span>
                </div>
                <div className="flex justify-between">
                  <span>Members-Only Hours:</span>
                  <Badge variant={isMembersOnly ? 'default' : 'secondary'}>
                    {isMembersOnly ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="text-sm text-muted-foreground">
                    {dataService.getManilaTime().toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Coffee className="w-5 h-5 text-primary" />
                <span>Member Benefits</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Wifi className="w-4 h-4 text-primary" />
                  <span className="text-sm">Free WiFi Access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Coffee className="w-4 h-4 text-primary" />
                  <span className="text-sm">Daily Free Drink (up to ₱150)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm">Community Events</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Sessions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <span>Currently In Space ({activeSessions.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeSessions.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                No members currently in the space
              </p>
            ) : (
              <div className="space-y-3">
                {activeSessions.map(session => (
                  <div key={session.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Session {session.code}</p>
                      <p className="text-sm text-muted-foreground">
                        Started: {formatTime(session.startedAt)}
                      </p>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemberPortal;
