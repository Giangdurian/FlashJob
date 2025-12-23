import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Search, 
  Star, 
  CheckCircle2, 
  MapPin, 
  Clock,
  RefreshCw,
  Mail,
  Phone,
  Award,
  TrendingUp
} from 'lucide-react';

export function CandidateManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState('all');

  const jobs = [
    { id: 'all', name: 'All Jobs' },
    { id: 'warehouse', name: 'Warehouse Associate' },
    { id: 'forklift', name: 'Forklift Operator' },
    { id: 'packer', name: 'Packer' },
    { id: 'loader', name: 'Loader' },
  ];

  const candidates = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'SJ',
      verified: true,
      rating: 4.8,
      totalShifts: 127,
      attendance: 98,
      job: 'Warehouse Associate',
      location: 'Los Angeles, CA',
      distance: '2.3 miles',
      skills: ['Heavy Lifting', 'Inventory Management', 'Pallet Jack'],
      availability: 'Immediate',
      hourlyRate: '$18/hr',
      email: 'sarah.j@email.com',
      phone: '(555) 123-4567',
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'MC',
      verified: true,
      rating: 4.9,
      totalShifts: 203,
      attendance: 99,
      job: 'Forklift Operator',
      location: 'Los Angeles, CA',
      distance: '5.1 miles',
      skills: ['Forklift Certified', 'Safety Protocols', 'Loading/Unloading'],
      availability: 'Tomorrow',
      hourlyRate: '$22/hr',
      email: 'michael.c@email.com',
      phone: '(555) 234-5678',
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      avatar: 'ER',
      verified: true,
      rating: 4.7,
      totalShifts: 89,
      attendance: 96,
      job: 'Packer',
      location: 'Los Angeles, CA',
      distance: '3.7 miles',
      skills: ['Quality Control', 'Fast-Paced Work', 'Attention to Detail'],
      availability: 'Immediate',
      hourlyRate: '$17/hr',
      email: 'emily.r@email.com',
      phone: '(555) 345-6789',
    },
    {
      id: 4,
      name: 'James Williams',
      avatar: 'JW',
      verified: true,
      rating: 4.6,
      totalShifts: 156,
      attendance: 94,
      job: 'Loader',
      location: 'Los Angeles, CA',
      distance: '4.2 miles',
      skills: ['Heavy Lifting', 'Team Work', 'Physical Stamina'],
      availability: 'Next Week',
      hourlyRate: '$19/hr',
      email: 'james.w@email.com',
      phone: '(555) 456-7890',
    },
    {
      id: 5,
      name: 'Amanda Davis',
      avatar: 'AD',
      verified: false,
      rating: 4.5,
      totalShifts: 42,
      attendance: 92,
      job: 'Warehouse Associate',
      location: 'Los Angeles, CA',
      distance: '6.8 miles',
      skills: ['Inventory', 'Basic Computer', 'Organization'],
      availability: 'Immediate',
      hourlyRate: '$17/hr',
      email: 'amanda.d@email.com',
      phone: '(555) 567-8901',
    },
    {
      id: 6,
      name: 'Robert Taylor',
      avatar: 'RT',
      verified: true,
      rating: 4.9,
      totalShifts: 278,
      attendance: 99,
      job: 'Warehouse Associate',
      location: 'Los Angeles, CA',
      distance: '1.9 miles',
      skills: ['Leadership', 'Training', 'Equipment Operation'],
      availability: 'Tomorrow',
      hourlyRate: '$20/hr',
      email: 'robert.t@email.com',
      phone: '(555) 678-9012',
    },
  ];

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesJob =
      selectedJob === 'all' || candidate.job.toLowerCase().includes(selectedJob);
    return matchesSearch && matchesJob;
  });

  const handleRequestReplacement = (candidateName: string) => {
    alert(`Replacement request initiated for ${candidateName}. Backup force protocol activated.`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Candidate Management</h2>
          <p className="text-gray-600">Browse and manage matched workers</p>
        </div>
        <Button>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Matches
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search by name or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900"
            >
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.name}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCandidates.map((candidate) => (
          <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                      {candidate.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-gray-900">{candidate.name}</h3>
                        {candidate.verified && (
                          <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <p className="text-gray-600">{candidate.job}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-gray-900">{candidate.rating}</span>
                    </div>
                    <p className="text-gray-500">{candidate.totalShifts} shifts</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>Attendance</span>
                    </div>
                    <p className="text-gray-900 mt-1">{candidate.attendance}%</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>Distance</span>
                    </div>
                    <p className="text-gray-900 mt-1">{candidate.distance}</p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Award className="w-4 h-4" />
                    <span>Skills</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        className="bg-blue-100 text-blue-700 hover:bg-blue-100"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Contact & Availability */}
                <div className="grid grid-cols-2 gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{candidate.availability}</span>
                  </div>
                  <div className="text-gray-900">{candidate.hourlyRate}</div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1">
                    Select Worker
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleRequestReplacement(candidate.name)}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Request Replacement
                  </Button>
                </div>

                {/* Contact Details (Collapsible) */}
                <details className="group">
                  <summary className="cursor-pointer text-blue-600 hover:text-blue-700">
                    View Contact Details
                  </summary>
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{candidate.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{candidate.phone}</span>
                    </div>
                  </div>
                </details>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCandidates.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-600">No candidates found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
