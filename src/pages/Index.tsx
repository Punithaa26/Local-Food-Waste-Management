
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Clock, Users, Utensils, Truck, TrendingUp, Globe } from 'lucide-react';
import DonationForm from '@/components/DonationForm';
import FoodListings from '@/components/FoodListings';
import PickupSchedule from '@/components/PickupSchedule';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const stats = [
    { icon: Utensils, label: 'Meals Saved', value: '2,847', color: 'text-green-600' },
    { icon: Users, label: 'Active Donors', value: '156', color: 'text-blue-600' },
    { icon: Truck, label: 'Pickups Today', value: '23', color: 'text-orange-600' },
    { icon: Globe, label: 'Partner NGOs', value: '12', color: 'text-purple-600' },
  ];

  const features = [
    {
      icon: '🤖',
      title: 'AI Food Recognition',
      description: 'Upload photos and our AI automatically detects food type and estimates quantity'
    },
    {
      icon: '🗺️',
      title: 'Smart Route Planning',
      description: 'Optimized pickup routes to minimize travel time and maximize food rescue'
    },
    {
      icon: '📊',
      title: 'Demand Prediction',
      description: 'AI-powered insights show food waste hotspots and demand patterns'
    },
    {
      icon: '⚡',
      title: 'Real-time Matching',
      description: 'Instant notifications connect food donors with nearby recipients'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'donate':
        return <DonationForm onBack={() => setActiveSection('home')} />;
      case 'request':
        return <FoodListings onBack={() => setActiveSection('home')} />;
      case 'pickup':
        return <PickupSchedule onBack={() => setActiveSection('home')} />;
      case 'dashboard':
        return <Dashboard onBack={() => setActiveSection('home')} />;
      default:
        return (
          <div className="min-h-screen">
            {/* Navigation */}
            <nav className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-orange-500 rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">FoodShare Now</span>
                  </div>
                  <div className="hidden md:flex items-center space-x-6">
                    <a href="#how-it-works" className="text-gray-700 hover:text-primary transition-colors">How It Works</a>
                    <a href="#impact" className="text-gray-700 hover:text-primary transition-colors">Impact</a>
                    <a href="#contact" className="text-gray-700 hover:text-primary transition-colors">Contact</a>
                    <Button onClick={() => setActiveSection('dashboard')} variant="outline" size="sm">
                      Dashboard
                    </Button>
                  </div>
                </div>
              </div>
            </nav>

            {/* Hero Section */}
            <section className="hero-gradient py-20 lg:py-32">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center animate-fade-in">
                  <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-100">
                    🌱 Fighting Food Waste Together
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                    Turn Food Waste Into
                    <span className="gradient-bg bg-clip-text text-transparent"> Food Hope</span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                    Connect restaurants, events, and households with NGOs and communities. 
                    Every meal saved is a step towards a hunger-free world.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button 
                      onClick={() => setActiveSection('donate')}
                      className="btn-primary text-lg px-8 py-4"
                    >
                      <Utensils className="w-5 h-5 mr-2" />
                      List Your Food
                    </Button>
                    <Button 
                      onClick={() => setActiveSection('request')}
                      className="btn-secondary text-lg px-8 py-4"
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      Request Food
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    How FoodShare Now Works
                  </h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Simple steps to make a big difference in your community
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                  <Card className="card-hover border-0 shadow-lg">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Utensils className="w-8 h-8 text-green-600" />
                      </div>
                      <CardTitle className="text-xl">1. List Your Food</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="text-base">
                        Upload photos, set quantity and expiry time. Our AI helps identify food types automatically.
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="card-hover border-0 shadow-lg">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-8 h-8 text-orange-600" />
                      </div>
                      <CardTitle className="text-xl">2. Get Matched</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="text-base">
                        NGOs and individuals in your area receive instant notifications about available food.
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="card-hover border-0 shadow-lg">
                    <CardHeader className="text-center pb-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Truck className="w-8 h-8 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl">3. Schedule Pickup</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <CardDescription className="text-base">
                        Coordinate pickup times with optimized routes to ensure fresh food reaches those in need.
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>

                {/* AI Features */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="text-center mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Powered by AI Technology
                    </h3>
                    <p className="text-gray-600">
                      Advanced machine learning makes food sharing effortless and efficient
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                      <div key={index} className="text-center p-4">
                        <div className="text-4xl mb-3">{feature.icon}</div>
                        <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Impact Section */}
            <section id="impact" className="py-20 gradient-bg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Making Real Impact Together
                  </h2>
                  <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    Join thousands of food heroes who are transforming waste into hope, one meal at a time.
                  </p>
                  <div className="grid md:grid-cols-3 gap-8 mt-12">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <TrendingUp className="w-8 h-8 mx-auto mb-4" />
                      <div className="text-2xl font-bold mb-2">40% Reduction</div>
                      <div className="opacity-90">in local food waste</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <Users className="w-8 h-8 mx-auto mb-4" />
                      <div className="text-2xl font-bold mb-2">500+ Families</div>
                      <div className="opacity-90">fed monthly</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <Clock className="w-8 h-8 mx-auto mb-4" />
                      <div className="text-2xl font-bold mb-2">15 Minutes</div>
                      <div className="opacity-90">average response time</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-gray-900 text-white py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                  <div className="md:col-span-2">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-orange-500 rounded-lg flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-bold">FoodShare Now</span>
                    </div>
                    <p className="text-gray-400 mb-6 max-w-md">
                      Building a world where no food goes to waste and no one goes hungry. 
                      Together, we can make a difference.
                    </p>
                    <div className="flex space-x-4">
                      <Button variant="outline" size="sm" className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800">
                        Facebook
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800">
                        Twitter
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800">
                        Instagram
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4">Quick Links</h4>
                    <div className="space-y-2 text-gray-400">
                      <button onClick={() => setActiveSection('donate')} className="block hover:text-white transition-colors">Donate Food</button>
                      <button onClick={() => setActiveSection('request')} className="block hover:text-white transition-colors">Request Food</button>
                      <button onClick={() => setActiveSection('pickup')} className="block hover:text-white transition-colors">Schedule Pickup</button>
                      <button onClick={() => setActiveSection('dashboard')} className="block hover:text-white transition-colors">Dashboard</button>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4">Contact</h4>
                    <div className="space-y-2 text-gray-400">
                      <p>help@foodshare.now</p>
                      <p>+1 (555) 123-4567</p>
                      <p>24/7 Support Available</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                  <p>&copy; 2024 FoodShare Now. All rights reserved. Built with ❤️ for the community.</p>
                </div>
              </div>
            </footer>
          </div>
        );
    }
  };

  return renderContent();
};

export default Index;
