
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, TrendingUp, Users, Utensils, Truck, MapPin, Clock, Heart, Star } from 'lucide-react';

interface DashboardProps {
  onBack: () => void;
}

const Dashboard = ({ onBack }: DashboardProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const stats = {
    week: {
      mealsServed: 847,
      foodSaved: '2.3 tons',
      donations: 156,
      pickups: 89,
      volunteers: 23,
      co2Saved: '1.8 tons'
    },
    month: {
      mealsServed: 3420,
      foodSaved: '9.2 tons',
      donations: 678,
      pickups: 342,
      volunteers: 67,
      co2Saved: '7.1 tons'
    },
    year: {
      mealsServed: 28340,
      foodSaved: '78.5 tons',
      donations: 5234,
      pickups: 2890,
      volunteers: 189,
      co2Saved: '62.3 tons'
    }
  };

  const currentStats = stats[selectedPeriod as keyof typeof stats];

  const recentActivity = [
    {
      id: 1,
      type: 'donation',
      title: 'New food donation',
      description: 'Green Valley Restaurant donated 25 servings of curry',
      time: '2 minutes ago',
      icon: Utensils,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'pickup',
      title: 'Pickup completed',
      description: 'Hope Foundation collected bread from Sunrise Bakery',
      time: '15 minutes ago',
      icon: Truck,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'volunteer',
      title: 'New volunteer joined',
      description: 'Sarah Wilson signed up as a pickup volunteer',
      time: '1 hour ago',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'request',
      title: 'Food request fulfilled',
      description: 'Community Kitchen received 100+ servings',
      time: '2 hours ago',
      icon: Heart,
      color: 'text-red-600'
    }
  ];

  const topDonors = [
    { name: 'Green Valley Restaurant', donations: 45, meals: 1250 },
    { name: 'Paradise Banquet Hall', donations: 23, meals: 890 },
    { name: 'Sunrise Bakery', donations: 67, meals: 780 },
    { name: 'City Fresh Mart', donations: 34, meals: 650 }
  ];

  const wasteHotspots = [
    { area: 'Downtown', waste: 'High', trend: 'up', color: 'text-red-600' },
    { area: 'Mall Road', waste: 'Medium', trend: 'down', color: 'text-yellow-600' },
    { area: 'Sector 15', waste: 'Medium', trend: 'stable', color: 'text-yellow-600' },
    { area: 'Central Market', waste: 'Low', trend: 'down', color: 'text-green-600' }
  ];

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
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600">Track your community's food rescue impact</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={selectedPeriod === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod('week')}
              >
                This Week
              </Button>
              <Button
                variant={selectedPeriod === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod('month')}
              >
                This Month
              </Button>
              <Button
                variant={selectedPeriod === 'year' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod('year')}
              >
                This Year
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <Utensils className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-gray-900">{currentStats.mealsServed}</div>
              <div className="text-sm text-gray-600">Meals Served</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-gray-900">{currentStats.foodSaved}</div>
              <div className="text-sm text-gray-600">Food Saved</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Heart className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <div className="text-2xl font-bold text-gray-900">{currentStats.donations}</div>
              <div className="text-sm text-gray-600">Donations</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Truck className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold text-gray-900">{currentStats.pickups}</div>
              <div className="text-sm text-gray-600">Pickups</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-gray-900">{currentStats.volunteers}</div>
              <div className="text-sm text-gray-600">Volunteers</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">🌱</div>
              <div className="text-2xl font-bold text-gray-900">{currentStats.co2Saved}</div>
              <div className="text-sm text-gray-600">CO₂ Saved</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your food rescue network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`mt-1 ${activity.color}`}>
                        <activity.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  🤖 AI Insights & Predictions
                </CardTitle>
                <CardDescription>Data-driven insights to optimize food rescue</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="predictions" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="predictions">Predictions</TabsTrigger>
                    <TabsTrigger value="hotspots">Hotspots</TabsTrigger>
                    <TabsTrigger value="optimization">Optimization</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="predictions" className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900">Peak Donation Time</h4>
                        <p className="text-sm text-blue-800">2-4 PM today based on restaurant patterns</p>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-900">High Demand Area</h4>
                        <p className="text-sm text-green-800">Sector 15 NGOs need 200+ meals tomorrow</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="hotspots" className="space-y-4">
                    <div className="space-y-3">
                      {wasteHotspots.map((hotspot, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">{hotspot.area}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={hotspot.color.replace('text-', 'bg-').replace('-600', '-100')}>
                              {hotspot.waste} waste
                            </Badge>
                            <span className="text-sm text-gray-600">
                              {hotspot.trend === 'up' ? '↗️' : hotspot.trend === 'down' ? '↘️' : '➡️'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="optimization" className="space-y-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-900">Route Efficiency</h4>
                      <p className="text-sm text-purple-800">Current routes are 85% optimized. Consider combining pickup times for 15% improvement.</p>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-medium text-orange-900">Volunteer Allocation</h4>
                      <p className="text-sm text-orange-800">Peak hours (2-6 PM) need 3 more volunteers for optimal coverage.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Donors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Star className="w-5 h-5 mr-2 text-yellow-500" />
                  Top Donors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topDonors.map((donor, index) => (
                    <div key={index} className="flex items-center justify-between p-2">
                      <div>
                        <p className="font-medium text-sm">{donor.name}</p>
                        <p className="text-xs text-gray-600">{donor.donations} donations</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">{donor.meals}</p>
                        <p className="text-xs text-gray-600">meals</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Impact Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl mb-2">🌍</div>
                    <div className="text-lg font-bold text-green-600">{currentStats.co2Saved}</div>
                    <div className="text-sm text-green-800">CO₂ emissions prevented</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl mb-2">💧</div>
                    <div className="text-lg font-bold text-blue-600">45,000L</div>
                    <div className="text-sm text-blue-800">Water saved</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl mb-2">⚡</div>
                    <div className="text-lg font-bold text-orange-600">1,200 kWh</div>
                    <div className="text-sm text-orange-800">Energy conserved</div>
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
                  <Utensils className="w-4 h-4 mr-2" />
                  Add Food Donation
                </Button>
                <Button className="w-full" variant="outline" size="sm">
                  <Truck className="w-4 h-4 mr-2" />
                  Schedule Pickup
                </Button>
                <Button className="w-full" variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Find Volunteers
                </Button>
                <Button className="w-full" variant="outline" size="sm">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
