
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Clock, User, Truck, Phone, Navigation, Heart } from 'lucide-react';

interface PickupScheduleProps {
  onBack: () => void;
}

const PickupSchedule = ({ onBack }: PickupScheduleProps) => {
  const [selectedPickup, setSelectedPickup] = useState<number | null>(null);

  const pickups = [
    {
      id: 1,
      foodType: 'Vegetable Curry & Rice',
      donor: 'Green Valley Restaurant',
      location: 'Downtown, 2.3 km',
      time: '2:00 PM - 3:00 PM',
      status: 'confirmed',
      contact: '+91 98765 43210',
      quantity: '25 servings',
      notes: 'Use back entrance, ask for Manager Raj'
    },
    {
      id: 2,
      foodType: 'Fresh Bread & Pastries',
      donor: 'Sunrise Bakery',
      location: 'Mall Road, 1.8 km',
      time: '4:30 PM - 5:00 PM',
      status: 'pending',
      contact: '+91 98765 43211',
      quantity: '40 pieces',
      notes: 'Bring insulated bags'
    },
    {
      id: 3,
      foodType: 'Wedding Leftovers',
      donor: 'Paradise Banquet Hall',
      location: 'Sector 15, 3.2 km',
      time: '6:00 PM - 7:00 PM',
      status: 'confirmed',
      contact: '+91 98765 43212',
      quantity: '100+ servings',
      notes: 'Large quantity - bring van'
    }
  ];

  const handleConfirmPickup = (pickupId: number) => {
    alert(`Pickup confirmed for ID: ${pickupId}. You'll receive SMS updates.`);
  };

  const handleCallDonor = (contact: string) => {
    window.open(`tel:${contact}`);
  };

  const handleNavigate = (location: string) => {
    alert(`Opening navigation to: ${location}`);
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
          <p className="text-gray-600">Manage your food collection appointments</p>
        </div>

        {/* Route Optimization Card */}
        <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              🤖 AI Route Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">🗺️ Optimal Route:</span>
                <p className="text-gray-600">Downtown → Mall Road → Sector 15</p>
              </div>
              <div>
                <span className="font-medium">⏱️ Total Time:</span>
                <p className="text-gray-600">Estimated 2.5 hours including pickups</p>
              </div>
              <div>
                <span className="font-medium">🚗 Distance:</span>
                <p className="text-gray-600">12.8 km total journey</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pickup List */}
        <div className="grid gap-6">
          {pickups.map((pickup, index) => (
            <Card key={pickup.id} className={`card-hover ${selectedPickup === pickup.id ? 'ring-2 ring-primary' : ''}`}>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{pickup.foodType}</CardTitle>
                    <div className="flex items-center text-gray-600 mt-1">
                      <User className="w-4 h-4 mr-1" />
                      {pickup.donor}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={`${pickup.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'} text-white`}>
                      {pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1)}
                    </Badge>
                    <Badge variant="secondary">
                      #{index + 1}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm">{pickup.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm">{pickup.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Truck className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm">{pickup.quantity}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm mb-2">Pickup Notes:</h4>
                    <p className="text-sm text-gray-600 mb-3">{pickup.notes}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCallDonor(pickup.contact)}
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleNavigate(pickup.location)}
                      >
                        <Navigation className="w-3 h-3 mr-1" />
                        Navigate
                      </Button>
                      {pickup.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleConfirmPickup(pickup.id)}
                          className="btn-primary"
                        >
                          <Heart className="w-3 h-3 mr-1" />
                          Confirm
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary Stats */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Today's Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-sm text-gray-600">Total Pickups</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">165+</div>
                <div className="text-sm text-gray-600">Servings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">12.8</div>
                <div className="text-sm text-gray-600">KM Route</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">2.5</div>
                <div className="text-sm text-gray-600">Hours Est.</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PickupSchedule;
