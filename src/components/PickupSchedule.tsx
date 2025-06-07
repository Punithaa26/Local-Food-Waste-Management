
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Clock, User, Truck, Navigation } from 'lucide-react';

interface PickupScheduleProps {
  onBack: () => void;
}

const PickupSchedule = ({ onBack }: PickupScheduleProps) => {
  const [selectedDate, setSelectedDate] = useState('today');

  const schedules = [
    {
      id: 1,
      time: '10:30 AM',
      foodType: 'Vegetable Curry & Rice',
      donor: 'Green Valley Restaurant',
      recipient: 'Hope Foundation NGO',
      location: 'Downtown, 0.8 km',
      status: 'confirmed',
      urgency: 'high',
      quantity: '25 servings',
      volunteer: 'Raj Patel'
    },
    {
      id: 2,
      time: '2:00 PM',
      foodType: 'Wedding Leftovers',
      donor: 'Paradise Banquet Hall',
      recipient: 'Child Care Center',
      location: 'Sector 15, 2.1 km',
      status: 'pending',
      urgency: 'high',
      quantity: '100+ servings',
      volunteer: 'Priya Sharma'
    },
    {
      id: 3,
      time: '4:30 PM',
      foodType: 'Fresh Bread & Pastries',
      donor: 'Sunrise Bakery',
      recipient: 'Senior Care Home',
      location: 'Mall Road, 1.2 km',
      status: 'confirmed',
      urgency: 'medium',
      quantity: '40 pieces',
      volunteer: 'Amit Kumar'
    },
    {
      id: 4,
      time: '6:15 PM',
      foodType: 'Fresh Fruits',
      donor: 'City Fresh Mart',
      recipient: 'Community Kitchen',
      location: 'Central Market, 1.5 km',
      status: 'in-progress',
      urgency: 'low',
      quantity: '20 kg',
      volunteer: 'Sarah Wilson'
    }
  ];

  const optimizedRoute = [
    { order: 1, location: 'Green Valley Restaurant', time: '10:30 AM', distance: '0.8 km' },
    { order: 2, location: 'Sunrise Bakery', time: '11:15 AM', distance: '0.4 km from stop 1' },
    { order: 3, location: 'City Fresh Mart', time: '12:00 PM', distance: '0.3 km from stop 2' },
    { order: 4, location: 'Paradise Banquet Hall', time: '2:00 PM', distance: '0.9 km from stop 3' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button 
            onClick={onBack} 
            variant="ghost" 
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pickup Schedule</h1>
          <p className="text-gray-600">Manage and optimize food pickup routes</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Schedule List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date Filter */}
            <div className="flex space-x-2">
              <Button
                variant={selectedDate === 'today' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDate('today')}
              >
                Today
              </Button>
              <Button
                variant={selectedDate === 'tomorrow' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDate('tomorrow')}
              >
                Tomorrow
              </Button>
              <Button
                variant={selectedDate === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedDate('week')}
              >
                This Week
              </Button>
            </div>

            {/* Schedule Cards */}
            <div className="space-y-4">
              {schedules.map((schedule) => (
                <Card key={schedule.id} className="card-hover">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <CardTitle className="text-lg">{schedule.time}</CardTitle>
                        <Badge className={getStatusColor(schedule.status)}>
                          {schedule.status}
                        </Badge>
                        <Badge className={getUrgencyColor(schedule.urgency)}>
                          {schedule.urgency} priority
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{schedule.foodType}</h4>
                        <p className="text-sm text-gray-600">{schedule.quantity}</p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="flex items-center text-gray-600 mb-1">
                            <User className="w-4 h-4 mr-1" />
                            <span className="font-medium">Donor:</span>
                          </div>
                          <p>{schedule.donor}</p>
                        </div>
                        <div>
                          <div className="flex items-center text-gray-600 mb-1">
                            <Heart className="w-4 h-4 mr-1" />
                            <span className="font-medium">Recipient:</span>
                          </div>
                          <p>{schedule.recipient}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1" />
                          {schedule.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Truck className="w-4 h-4 mr-1" />
                          {schedule.volunteer}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        <Button size="sm" variant="outline">
                          <MapPin className="w-4 h-4 mr-1" />
                          View Route
                        </Button>
                        <Button size="sm" variant="outline">
                          Contact Donor
                        </Button>
                        {schedule.status === 'pending' && (
                          <Button size="sm" className="btn-primary">
                            Confirm Pickup
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Route Optimization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  🤖 AI Route Optimization
                </CardTitle>
                <CardDescription>
                  Optimized pickup sequence to minimize travel time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {optimizedRoute.map((stop) => (
                    <div key={stop.order} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                        {stop.order}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{stop.location}</p>
                        <p className="text-xs text-gray-600">{stop.time} • {stop.distance}</p>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-green-800">Total Route:</span>
                      <span className="text-green-600">2.4 km • 3.5 hours</span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">
                      Saves 1.2 km compared to individual trips
                    </p>
                  </div>
                </div>
                <Button className="w-full mt-4" size="sm">
                  <Navigation className="w-4 h-4 mr-1" />
                  Start Navigation
                </Button>
              </CardContent>
            </Card>

            {/* Today's Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Pickups</span>
                    <span className="font-medium">4</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Confirmed</span>
                    <span className="font-medium text-green-600">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pending</span>
                    <span className="font-medium text-yellow-600">1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">In Progress</span>
                    <span className="font-medium text-blue-600">1</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Meals</span>
                      <span className="font-bold text-lg text-primary">185+</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="outline" size="sm">
                  <Truck className="w-4 h-4 mr-2" />
                  Add New Pickup
                </Button>
                <Button className="w-full" variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Assign Volunteer
                </Button>
                <Button className="w-full" variant="outline" size="sm">
                  <MapPin className="w-4 h-4 mr-2" />
                  View All Routes
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupSchedule;
