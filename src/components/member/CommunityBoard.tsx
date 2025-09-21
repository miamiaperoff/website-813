import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  MessageCircle, 
  Users, 
  Calendar, 
  MapPin, 
  Coffee, 
  Lightbulb, 
  Heart,
  Share2,
  Plus,
  Search
} from 'lucide-react';

interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar?: string;
    memberTier: 'basic' | 'premium' | 'vip';
  };
  content: string;
  type: 'announcement' | 'collaboration' | 'event' | 'general';
  timestamp: string;
  likes: number;
  comments: number;
  tags: string[];
}

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  organizer: string;
}

const CommunityBoard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newPost, setNewPost] = useState('');
  const [showNewPost, setShowNewPost] = useState(false);

  // Mock data - in production, this would come from an API
  const posts: CommunityPost[] = [
    {
      id: '1',
      author: {
        name: 'Ana Calubiran',
        memberTier: 'vip'
      },
      content: 'Join us for Tech Tuesday this week! We\'ll be discussing the latest trends in remote work and productivity tools. Coffee and snacks provided!',
      type: 'event',
      timestamp: '2 hours ago',
      likes: 8,
      comments: 3,
      tags: ['tech-tuesday', 'networking', 'productivity']
    },
    {
      id: '2',
      author: {
        name: 'John Doe',
        memberTier: 'premium'
      },
      content: 'Looking for a collaborator for a web development project. Anyone interested in React and TypeScript? Let\'s grab coffee and discuss!',
      type: 'collaboration',
      timestamp: '4 hours ago',
      likes: 5,
      comments: 2,
      tags: ['collaboration', 'web-development', 'react']
    },
    {
      id: '3',
      author: {
        name: 'Sarah Wilson',
        memberTier: 'basic'
      },
      content: 'The new coffee machine is amazing! Thanks to the team for upgrading our workspace. The espresso shots are perfect for those late-night coding sessions.',
      type: 'general',
      timestamp: '1 day ago',
      likes: 12,
      comments: 4,
      tags: ['coffee', 'workspace', 'appreciation']
    }
  ];

  const events: CommunityEvent[] = [
    {
      id: '1',
      title: 'Tech Tuesday: Remote Work Trends',
      description: 'Join us for an engaging discussion about the latest trends in remote work and productivity tools.',
      date: '2024-01-23',
      time: '6:00 PM',
      location: '813 Cafe Meeting Room',
      attendees: 8,
      maxAttendees: 15,
      organizer: 'Ana Calubiran'
    },
    {
      id: '2',
      title: 'Coffee & Code Session',
      description: 'Bring your laptop and work on your projects together. Great for networking and getting feedback.',
      date: '2024-01-25',
      time: '2:00 PM',
      location: 'Open Workspace',
      attendees: 5,
      maxAttendees: 20,
      organizer: 'John Doe'
    }
  ];

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'announcement': return <MessageCircle className="w-4 h-4" />;
      case 'collaboration': return <Users className="w-4 h-4" />;
      case 'event': return <Calendar className="w-4 h-4" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'vip': return 'bg-purple-100 text-purple-800';
      case 'premium': return 'bg-blue-100 text-blue-800';
      case 'basic': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPosts = posts.filter(post => 
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">
            Community Board
          </h1>
          <p className="text-muted-foreground">
            Connect with fellow members, share ideas, and collaborate
          </p>
        </div>
        <Button onClick={() => setShowNewPost(!showNewPost)} className="flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Post</span>
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search posts, tags, or members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* New Post Form */}
      {showNewPost && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
            <CardDescription>Share something with the community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="What's on your mind? Share updates, ask questions, or start a discussion..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewPost(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                // Handle post creation
                setNewPost('');
                setShowNewPost(false);
              }}>
                Post
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Upcoming Events</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map(event => (
              <div key={event.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{event.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3" />
                      <span>{event.attendees}/{event.maxAttendees} attending</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Posts */}
      <div className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-primary">Recent Posts</h2>
        {filteredPosts.map(post => (
          <Card key={post.id} className="hover:shadow-warm transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>
                    {post.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-medium text-foreground">{post.author.name}</h4>
                    <Badge className={getTierColor(post.author.memberTier)}>
                      {post.author.memberTier.toUpperCase()}
                    </Badge>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      {getPostIcon(post.type)}
                      <span className="text-sm capitalize">{post.type}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                  </div>
                  <p className="text-foreground mb-3">{post.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center space-x-2 h-12">
              <Coffee className="w-4 h-4" />
              <span>Organize Coffee Meetup</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2 h-12">
              <Users className="w-4 h-4" />
              <span>Find Collaborators</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2 h-12">
              <Calendar className="w-4 h-4" />
              <span>Create Event</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommunityBoard;
