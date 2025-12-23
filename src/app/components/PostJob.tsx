import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  MapPin, 
  Users, 
  DollarSign, 
  Calendar,
  Clock,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';

export function PostJob() {
  const [formData, setFormData] = useState({
    title: '',
    quantity: '',
    location: '',
    hourlyWage: '',
    startDate: '',
    endDate: '',
    shiftStart: '',
    shiftEnd: '',
    skills: '',
    description: '',
    priority: 'standard',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Job posted successfully!');
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        title: '',
        quantity: '',
        location: '',
        hourlyWage: '',
        startDate: '',
        endDate: '',
        shiftStart: '',
        shiftEnd: '',
        skills: '',
        description: '',
        priority: 'standard',
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[600px]">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-gray-900">Job Posted Successfully!</h3>
              <p className="text-gray-600">
                Your job posting "{formData.title}" is now live and visible to qualified workers.
              </p>
              <div className="pt-4">
                <Button onClick={() => setSubmitted(false)} className="w-full">
                  Post Another Job
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create New Job Posting</CardTitle>
          <p className="text-gray-600">Fill in the details to post a new staffing campaign</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Priority Selection */}
            <div className="space-y-2">
              <Label>Campaign Priority</Label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, priority: 'standard' })}
                  className={`flex-1 p-4 border-2 rounded-lg transition-all ${
                    formData.priority === 'standard'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    <div className="text-left">
                      <div className="text-gray-900">Standard</div>
                      <div className="text-gray-600">Normal processing time</div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, priority: 'urgent' })}
                  className={`flex-1 p-4 border-2 rounded-lg transition-all ${
                    formData.priority === 'urgent'
                      ? 'border-orange-600 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6 text-orange-600" />
                    <div className="text-left">
                      <div className="text-gray-900">Urgent</div>
                      <div className="text-gray-600">Priority matching</div>
                    </div>
                  </div>
                  <Badge className="mt-2 bg-orange-100 text-orange-700 hover:bg-orange-100">
                    +20% Fee
                  </Badge>
                </button>
              </div>
            </div>

            {/* Job Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Warehouse Associate, Forklift Operator"
                required
              />
            </div>

            {/* Quantity and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">
                  <Users className="w-4 h-4 inline mr-1" />
                  Number of Workers Needed
                </Label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g., 50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Location
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Distribution Center A"
                  required
                />
              </div>
            </div>

            {/* Hourly Wage */}
            <div className="space-y-2">
              <Label htmlFor="hourlyWage">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Hourly Wage
              </Label>
              <Input
                id="hourlyWage"
                name="hourlyWage"
                type="number"
                step="0.01"
                value={formData.hourlyWage}
                onChange={handleChange}
                placeholder="e.g., 18.50"
                required
              />
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Shift Times */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shiftStart">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Shift Start Time
                </Label>
                <Input
                  id="shiftStart"
                  name="shiftStart"
                  type="time"
                  value={formData.shiftStart}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shiftEnd">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Shift End Time
                </Label>
                <Input
                  id="shiftEnd"
                  name="shiftEnd"
                  type="time"
                  value={formData.shiftEnd}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Skills Required */}
            <div className="space-y-2">
              <Label htmlFor="skills">Required Skills</Label>
              <Input
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., Forklift certified, Heavy lifting, Basic computer skills"
              />
              <p className="text-gray-500">Separate multiple skills with commas</p>
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide details about the job responsibilities, requirements, and any additional information..."
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                Post Job Campaign
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  setFormData({
                    title: '',
                    quantity: '',
                    location: '',
                    hourlyWage: '',
                    startDate: '',
                    endDate: '',
                    shiftStart: '',
                    shiftEnd: '',
                    skills: '',
                    description: '',
                    priority: 'standard',
                  })
                }
              >
                Clear Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
