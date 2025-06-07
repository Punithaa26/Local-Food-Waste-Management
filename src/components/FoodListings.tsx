
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, MapPin, Clock, User, Heart } from 'lucide-react';

interface FoodListingsProps {
  onBack: () => void;
}

const FoodListings = ({ onBack }: FoodListingsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const foodListings = [
    {
      id: 1,
      foodType: 'Vegetable Curry & Rice',
      quantity: '25 servings',
      expiryTime: '3 hours',
      location: 'Green Valley Restaurant, Downtown',
      distance: '0.8 km',
      donor: 'Green Valley Restaurant',
      description: 'Fresh vegetable curry with basmati rice. Prepared this morning for a cancelled event.',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=200&fit=crop',
      urgent: true,
      verified: true
    },
    {
      id: 2,
      foodType: 'Fresh Bread & Pastries',
      quantity: '40 pieces',
      expiryTime: '6 hours',
      location: 'Sunrise Bakery, Mall Road',
      distance: '1.2 km',
      donor: 'Sunrise Bakery',
      description: 'Assorted fresh bread, croissants, and pastries from today\'s batch.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop',
      urgent: false,
      verified: true
    },
    {
      id: 3,
      foodType: 'Wedding Leftovers - Mixed',
      quantity: '100+ servings',
      expiryTime: '4 hours',
      location: 'Paradise Banquet Hall, Sector 15',
      distance: '2.1 km',
      donor: 'Paradise Banquet Hall',
      description: 'Various dishes from wedding reception: dal, sabzi, rice, roti, and sweets.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=200&fit=crop',
      urgent: true,
      verified: true
    },
    {
      id: 4,
      foodType: 'Fresh Fruits',
      quantity: '20 kg',
      expiryTime: '12 hours',
      location: 'City Fresh Mart, Central Market',
      distance: '1.5 km',
      donor: 'City Fresh Mart',
      description: 'Assorted fresh fruits - apples, bananas, oranges. Slightly overripe but good quality.',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=300&h=200&fit=crop',
      urgent: false,
      verified: true
    },
    {
      id: 5,
      foodType: 'Cooked Meals',
      quantity: '15 servings',
      expiryTime: '2 hours',
      location: 'Home Kitchen, Rose Garden',
      distance: '0.5 km',
      donor: 'Priya Sharma',
      description: 'Home-cooked dal, rice, and vegetables. Made for a family gathering that got cancelled.',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=200&fit=crop',
      urgent: true,
      verified: false
    }
  ];

  const filteredListings = foodListings.filter(listing => {
    const matchesSearch = listing.foodType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'urgent' && listing.urgent) ||
                         (selectedFilter === 'verified' && listing.verified);
    return matchesSearch && matchesFilter;
  });

  const handleRequest = (listingId: number) => {
    const listing = foodListings.find(l => l.id === listingId);
    alert(`Request sent for "${listing?.foodType}"! The donor will be notified and pickup details will be shared.`);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Food</h1>
          <p className="text-gray-600">Find and request food donations in your area</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by food type or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('all')}
            >
              All
            </Button>
            <Button
              variant={selectedFilter === 'urgent' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('urgent')}
            >
              Urgent
            </Button>
            <Button
              variant={selectedFilter === 'verified' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('verified')}
            >
              Verified
            </Button>
          </div>
        </div>

        {/* AI Suggestions */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              🤖 AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">📍 Hotspot Alert:</span>
                <p className="text-gray-600">High food availability in Downtown area today</p>
              </div>
              <div>
                <span className="font-medium">⚡ Best Match:</span>
                <p className="text-gray-600">Vegetable Curry matches your organization's preferences</p>
              </div>
              <div>
                <span className="font-medium">🚚 Optimal Route:</span>
                <p className="text-gray-600">3 pickups can be combined for efficient collection</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Food Listings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="card-hover overflow-hidden">
              <div className="relative">
                <img 
                  src={listing.image} 
                  alt={listing.foodType}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 flex space-x-2">
                  {listing.urgent && (
                    <Badge className="bg-red-500 text-white">
                      <Clock className="w-3 h-3 mr-1" />
                      Urgent
                    </Badge>
                  )}
                  {listing.verified && (
                    <Badge className="bg-green-500 text-white">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/90">
                    {listing.distance}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg leading-tight">{listing.foodType}</CardTitle>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-1" />
                  {listing.donor}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <CardDescription className="mb-4">
                  {listing.description}
                </CardDescription>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Quantity:</span>
                    <span>{listing.quantity}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Best before:</span>
                    <span className={listing.urgent ? 'text-red-600 font-medium' : ''}>
                      {listing.expiryTime}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                    <span className="text-gray-600">{listing.location}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleRequest(listing.id)}
                  className="w-full btn-primary"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Request This Food
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No food found</h3>
            <p className="text-gray-600">Try adjusting your search or check back later for new listings.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodListings;
