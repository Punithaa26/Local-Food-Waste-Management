
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Upload, MapPin, Clock, Utensils, X, ImageIcon } from 'lucide-react';

interface DonationFormProps {
  onBack: () => void;
}

const DonationForm = ({ onBack }: DonationFormProps) => {
  const [formData, setFormData] = useState({
    foodType: '',
    quantity: '',
    expiryTime: '',
    description: '',
    location: '',
    contactInfo: ''
  });

  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState({
    detectedFood: '',
    estimatedQuantity: '',
    confidence: 0
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setUploadedImages(prev => [...prev, ...files]);
      setIsAnalyzing(true);
      
      // Simulate AI processing
      setTimeout(() => {
        const suggestions = {
          detectedFood: 'Vegetable Curry',
          estimatedQuantity: '15 servings',
          confidence: 92
        };
        setAiSuggestions(suggestions);
        setFormData(prev => ({
          ...prev,
          foodType: 'vegetable-curry',
          quantity: suggestions.estimatedQuantity
        }));
        setIsAnalyzing(false);
      }, 2000);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.foodType || !formData.quantity || !formData.location) {
      alert('Please fill in all required fields: Food Type, Quantity, and Location');
      return;
    }
    alert('Food donation listed successfully! NGOs in your area will be notified.');
    onBack();
  };

  const handleLocationDetect = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData(prev => ({
            ...prev,
            location: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`
          }));
        },
        () => {
          alert('Unable to detect location. Please enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Button 
            onClick={onBack} 
            variant="ghost" 
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Donate Food</h1>
          <p className="text-gray-600">Help us turn your excess food into meals for those in need</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg md:text-xl">
                  <Utensils className="w-5 h-5 mr-2 text-green-600" />
                  Food Details
                </CardTitle>
                <CardDescription>
                  Upload photos and provide details about your food donation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <Label htmlFor="foodImage">Food Images *</Label>
                    <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-green-400 transition-colors cursor-pointer">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="foodImage" className="relative cursor-pointer rounded-md font-medium text-green-600 hover:text-green-500">
                            <span>Upload photos</span>
                            <input 
                              id="foodImage" 
                              type="file" 
                              multiple 
                              accept="image/*"
                              className="sr-only"
                              onChange={handleImageUpload}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                      </div>
                    </div>
                    
                    {/* Uploaded Images Preview */}
                    {uploadedImages.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                        {uploadedImages.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* AI Analysis */}
                    {(isAnalyzing || aiSuggestions.confidence > 0) && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-blue-900">
                            🤖 AI Analysis
                            {isAnalyzing && <span className="ml-2 animate-pulse">Analyzing...</span>}
                          </span>
                          {aiSuggestions.confidence > 0 && (
                            <Badge variant="secondary">{aiSuggestions.confidence}% confidence</Badge>
                          )}
                        </div>
                        {!isAnalyzing && aiSuggestions.confidence > 0 && (
                          <div className="text-sm text-blue-800">
                            <p>Detected: <span className="font-medium">{aiSuggestions.detectedFood}</span></p>
                            <p>Estimated quantity: <span className="font-medium">{aiSuggestions.estimatedQuantity}</span></p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Food Type and Quantity */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="foodType">Food Type *</Label>
                      <Select value={formData.foodType} onValueChange={(value) => setFormData(prev => ({ ...prev, foodType: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select food type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vegetable-curry">Vegetable Curry</SelectItem>
                          <SelectItem value="rice">Rice</SelectItem>
                          <SelectItem value="bread">Bread</SelectItem>
                          <SelectItem value="dal">Dal/Lentils</SelectItem>
                          <SelectItem value="fruits">Fresh Fruits</SelectItem>
                          <SelectItem value="vegetables">Fresh Vegetables</SelectItem>
                          <SelectItem value="sweets">Sweets/Desserts</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="quantity">Quantity/Servings *</Label>
                      <Input
                        id="quantity"
                        value={formData.quantity}
                        onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                        placeholder="e.g., 15 servings"
                        required
                      />
                    </div>
                  </div>

                  {/* Expiry and Location */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryTime">Best Before (Hours) *</Label>
                      <Select value={formData.expiryTime} onValueChange={(value) => setFormData(prev => ({ ...prev, expiryTime: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 hours</SelectItem>
                          <SelectItem value="4">4 hours</SelectItem>
                          <SelectItem value="8">8 hours</SelectItem>
                          <SelectItem value="12">12 hours</SelectItem>
                          <SelectItem value="24">24 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="location">Pickup Location *</Label>
                      <div className="flex space-x-2">
                        <div className="relative flex-1">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                            placeholder="Enter address"
                            className="pl-10"
                            required
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={handleLocationDetect}
                          className="whitespace-nowrap"
                        >
                          Detect
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">Additional Details</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Any special instructions, ingredients, or notes..."
                      rows={3}
                    />
                  </div>

                  {/* Contact Info */}
                  <div>
                    <Label htmlFor="contactInfo">Contact Information *</Label>
                    <Input
                      id="contactInfo"
                      value={formData.contactInfo}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactInfo: e.target.value }))}
                      placeholder="Phone number or email for coordination"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full btn-primary">
                    <Utensils className="w-4 h-4 mr-2" />
                    List Food for Donation
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ImageIcon className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Clear photos help</p>
                    <p className="text-xs text-gray-600">Upload multiple angles for better AI recognition</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Time matters</p>
                    <p className="text-xs text-gray-600">Earlier listings get faster responses</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Accurate location</p>
                    <p className="text-xs text-gray-600">Helps volunteers plan efficient pickup routes</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <p className="text-sm text-gray-600">Previous donations</p>
                  <div className="text-2xl font-bold text-orange-600 mt-2">156</div>
                  <p className="text-sm text-gray-600">Meals provided</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationForm;
