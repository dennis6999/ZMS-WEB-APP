import React, { useState, useRef } from 'react';
import { PageTemplate } from '@/components/layout/PageTemplate';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Smartphone, 
  LogOut,
  CreditCard,
  Download,
  Camera,
  UserCircle2,
  X
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ProfilePage = () => {
  const { toast } = useToast();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [profileImage, setProfileImage] = useState("https://i.pravatar.cc/150?img=68");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileData, setProfileData] = useState({
    fullName: 'Wangari Dennis',
    email: 'dennisndirangu699@gmail.com',
    role: 'Senior Wildlife Officer',
    department: 'Conservation',
    phoneNumber: '+254 712 345 678',
    location: 'Nairobi National Park',
    bio: 'Wildlife conservation specialist with over 7 years of experience in animal tracking and habitat preservation.'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    appNotifications: true,
    weeklyReports: true,
    securityAlerts: true
  });

  const handleImageClick = () => {
    setShowImageDialog(true);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        setShowImageDialog(false);
        toast({
          title: "Profile picture updated",
          description: "Your profile picture has been updated successfully"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage("");
    setShowImageDialog(false);
    toast({
      title: "Profile picture removed",
      description: "Your profile picture has been removed"
    });
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully"
    });
  };

  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <PageTemplate 
      title="My Profile" 
      description="Manage your account information"
      icon={<UserCircle2 className="h-6 w-6" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative mb-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profileImage} alt={profileData.fullName} />
                  <AvatarFallback>{profileData.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8"
                  onClick={handleImageClick}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <h3 className="text-lg font-medium">{profileData.fullName}</h3>
              <p className="text-sm text-muted-foreground">{profileData.email}</p>
              
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">{profileData.role}</Badge>
                <Badge variant="outline">{profileData.department}</Badge>
              </div>

              <div className="w-full mt-6 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="text-sm">
                    <p className="text-muted-foreground">Location</p>
                    <p>{profileData.location}</p>
                  </div>
                </div>
                
                <div className="flex items-start justify-between">
                  <div className="text-sm">
                    <p className="text-muted-foreground">Phone</p>
                    <p>{profileData.phoneNumber}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between border-t pt-5">
              <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Profile</Button>
              <Button variant="outline" className="text-destructive" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="personal">
                <User className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Personal Info</span>
              </TabsTrigger>
              <TabsTrigger value="security">
                <Lock className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input 
                          id="fullName" 
                          value={profileData.fullName} 
                          onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={profileData.email} 
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input 
                          id="role" 
                          value={profileData.role} 
                          onChange={(e) => setProfileData({...profileData, role: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input 
                          id="department" 
                          value={profileData.department} 
                          onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input 
                          id="phoneNumber" 
                          value={profileData.phoneNumber} 
                          onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          value={profileData.location} 
                          onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea 
                          id="bio" 
                          value={profileData.bio} 
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          disabled={!isEditing}
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                    {isEditing && (
                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button type="submit">Save Changes</Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your password and account security</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Change Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input id="currentPassword" type="password" />
                      </div>
                      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <Button>Update Password</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="2fa">Enable 2FA</Label>
                        <p className="text-sm text-muted-foreground">Additional security for your account</p>
                      </div>
                      <Switch id="2fa" />
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium">Account Activity</h3>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download Activity Log
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Alerts</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.emailAlerts} 
                        onCheckedChange={() => handleNotificationChange('emailAlerts')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS Alerts</Label>
                        <p className="text-sm text-muted-foreground">Receive urgent notifications via SMS</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.smsAlerts} 
                        onCheckedChange={() => handleNotificationChange('smsAlerts')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>App Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive in-app notifications</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.appNotifications} 
                        onCheckedChange={() => handleNotificationChange('appNotifications')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Weekly Reports</Label>
                        <p className="text-sm text-muted-foreground">Receive weekly summary reports</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.weeklyReports} 
                        onCheckedChange={() => handleNotificationChange('weeklyReports')}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Security Alerts</Label>
                        <p className="text-sm text-muted-foreground">Receive alerts about security incidents</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.securityAlerts} 
                        onCheckedChange={() => handleNotificationChange('securityAlerts')}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={() => toast({
                      title: "Preferences saved",
                      description: "Your notification preferences have been updated"
                    })}>
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Profile Picture</DialogTitle>
            <DialogDescription>
              Upload a new profile picture or remove the existing one.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={profileImage} alt={profileData.fullName} />
                <AvatarFallback>{profileData.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Upload New Picture
                </Button>
                {profileImage && (
                  <Button
                    variant="outline"
                    className="text-destructive"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove Picture
                  </Button>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowImageDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageTemplate>
  );
};

export default ProfilePage;
