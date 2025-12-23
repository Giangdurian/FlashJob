import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  Star,
  CheckCircle2,
  ThumbsUp,
  ThumbsDown,
  Send
} from 'lucide-react';
import { toast } from 'sonner';

interface WorkerToRate {
  id: number;
  name: string;
  avatar: string;
  job: string;
  date: string;
  location: string;
  hours: number;
  rated: boolean;
}

export function RatingSystem() {
  const [workers, setWorkers] = useState<WorkerToRate[]>([
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'SJ',
      job: 'Warehouse Associate',
      date: 'Dec 20, 2025',
      location: 'Distribution Center A',
      hours: 8,
      rated: false,
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: 'MC',
      job: 'Forklift Operator',
      date: 'Dec 20, 2025',
      location: 'Distribution Center A',
      hours: 8,
      rated: false,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      avatar: 'ER',
      job: 'Packer',
      date: 'Dec 19, 2025',
      location: 'Fulfillment Center B',
      hours: 8,
      rated: false,
    },
    {
      id: 4,
      name: 'James Williams',
      avatar: 'JW',
      job: 'Loader',
      date: 'Dec 18, 2025',
      location: 'Warehouse North',
      hours: 8,
      rated: true,
    },
    {
      id: 5,
      name: 'Amanda Davis',
      avatar: 'AD',
      job: 'Quality Inspector',
      date: 'Dec 18, 2025',
      location: 'Production Floor 2',
      hours: 8,
      rated: true,
    },
  ]);

  const [selectedWorker, setSelectedWorker] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const positiveTags = [
    'Punctual',
    'Hard Working',
    'Team Player',
    'Professional',
    'Skilled',
    'Reliable',
  ];

  const negativeTags = [
    'Late',
    'Poor Attitude',
    'Safety Issues',
    'Incomplete Work',
    'Communication Issues',
  ];

  const handleSubmitRating = () => {
    if (!selectedWorker || rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setWorkers(
      workers.map((worker) =>
        worker.id === selectedWorker ? { ...worker, rated: true } : worker
      )
    );

    toast.success('Rating submitted successfully!');
    
    // Reset form
    setSelectedWorker(null);
    setRating(0);
    setFeedback('');
    setSelectedTags([]);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const unratedWorkers = workers.filter((w) => !w.rated);
  const ratedWorkers = workers.filter((w) => w.rated);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900">Rate Workers</h2>
        <p className="text-gray-600">Help build the reputation system by rating workers after shifts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workers to Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Ratings ({unratedWorkers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {unratedWorkers.map((worker) => (
                <button
                  key={worker.id}
                  onClick={() => setSelectedWorker(worker.id)}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    selectedWorker === worker.id
                      ? 'bg-blue-50 border-2 border-blue-600'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                      {worker.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900">{worker.name}</div>
                      <div className="text-gray-600">{worker.job}</div>
                    </div>
                  </div>
                  <div className="text-gray-500">{worker.date}</div>
                </button>
              ))}

              {unratedWorkers.length === 0 && (
                <div className="text-center py-8 text-gray-600">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-green-600" />
                  <p>All workers rated!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Rating Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {selectedWorker
                ? `Rate ${workers.find((w) => w.id === selectedWorker)?.name}`
                : 'Select a worker to rate'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedWorker ? (
              <div className="space-y-6">
                {/* Worker Info */}
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-3 gap-4 text-gray-600">
                    <div>
                      <div>Job</div>
                      <div className="text-gray-900 mt-1">
                        {workers.find((w) => w.id === selectedWorker)?.job}
                      </div>
                    </div>
                    <div>
                      <div>Date</div>
                      <div className="text-gray-900 mt-1">
                        {workers.find((w) => w.id === selectedWorker)?.date}
                      </div>
                    </div>
                    <div>
                      <div>Hours Worked</div>
                      <div className="text-gray-900 mt-1">
                        {workers.find((w) => w.id === selectedWorker)?.hours}h
                      </div>
                    </div>
                  </div>
                </div>

                {/* Star Rating */}
                <div>
                  <label className="text-gray-900 mb-3 block">Overall Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-12 h-12 ${
                            star <= (hoveredRating || rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-gray-600 mt-2">
                      {rating === 5 && 'Excellent!'}
                      {rating === 4 && 'Very Good'}
                      {rating === 3 && 'Good'}
                      {rating === 2 && 'Fair'}
                      {rating === 1 && 'Needs Improvement'}
                    </p>
                  )}
                </div>

                {/* Quick Tags */}
                <div>
                  <label className="text-gray-900 mb-3 block">Quick Feedback</label>
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <ThumbsUp className="w-4 h-4 text-green-600" />
                        <span>Positive</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {positiveTags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1.5 rounded-full transition-colors ${
                              selectedTags.includes(tag)
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-gray-600 mb-2">
                        <ThumbsDown className="w-4 h-4 text-red-600" />
                        <span>Areas for Improvement</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {negativeTags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1.5 rounded-full transition-colors ${
                              selectedTags.includes(tag)
                                ? 'bg-red-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Written Feedback */}
                <div>
                  <label className="text-gray-900 mb-2 block">
                    Additional Comments (Optional)
                  </label>
                  <Textarea
                    placeholder="Share specific details about the worker's performance..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-3">
                  <Button onClick={handleSubmitRating} className="flex-1">
                    <Send className="w-4 h-4 mr-2" />
                    Submit Rating
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedWorker(null);
                      setRating(0);
                      setFeedback('');
                      setSelectedTags([]);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-gray-600">
                <Star className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p>Select a worker from the list to begin rating</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recently Rated */}
      {ratedWorkers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recently Rated Workers ({ratedWorkers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ratedWorkers.map((worker) => (
                <div
                  key={worker.id}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                      {worker.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-900">{worker.name}</div>
                      <div className="text-gray-600">{worker.job}</div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-gray-500">{worker.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
