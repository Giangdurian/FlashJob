import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  MapPin, 
  Clock, 
  DollarSign,
  Download,
  Filter,
  CheckCircle2,
  AlertCircle,
  Eye
} from 'lucide-react';

export function Timesheet() {
  const [selectedPeriod, setSelectedPeriod] = useState('this-week');

  const timesheetEntries = [
    {
      id: 1,
      worker: 'Sarah Johnson',
      avatar: 'SJ',
      job: 'Warehouse Associate',
      date: 'Dec 20, 2025',
      checkIn: '08:00 AM',
      checkOut: '04:00 PM',
      totalHours: 8,
      hourlyRate: 18,
      location: 'Distribution Center A',
      gpsVerified: true,
      status: 'approved',
    },
    {
      id: 2,
      worker: 'Michael Chen',
      avatar: 'MC',
      job: 'Forklift Operator',
      date: 'Dec 20, 2025',
      checkIn: '07:45 AM',
      checkOut: '03:45 PM',
      totalHours: 8,
      hourlyRate: 22,
      location: 'Distribution Center A',
      gpsVerified: true,
      status: 'approved',
    },
    {
      id: 3,
      worker: 'Emily Rodriguez',
      avatar: 'ER',
      job: 'Packer',
      date: 'Dec 20, 2025',
      checkIn: '08:15 AM',
      checkOut: '04:30 PM',
      totalHours: 8.25,
      hourlyRate: 17,
      location: 'Fulfillment Center B',
      gpsVerified: true,
      status: 'pending',
    },
    {
      id: 4,
      worker: 'James Williams',
      avatar: 'JW',
      job: 'Loader',
      date: 'Dec 19, 2025',
      checkIn: '09:00 AM',
      checkOut: '05:15 PM',
      totalHours: 8.25,
      hourlyRate: 19,
      location: 'Warehouse North',
      gpsVerified: true,
      status: 'approved',
    },
    {
      id: 5,
      worker: 'Amanda Davis',
      avatar: 'AD',
      job: 'Quality Inspector',
      date: 'Dec 19, 2025',
      checkIn: '09:00 AM',
      checkOut: '05:00 PM',
      totalHours: 8,
      hourlyRate: 20,
      location: 'Production Floor 2',
      gpsVerified: false,
      status: 'review',
    },
    {
      id: 6,
      worker: 'Robert Taylor',
      avatar: 'RT',
      job: 'Warehouse Associate',
      date: 'Dec 18, 2025',
      checkIn: '08:00 AM',
      checkOut: '04:00 PM',
      totalHours: 8,
      hourlyRate: 20,
      location: 'Distribution Center C',
      gpsVerified: true,
      status: 'approved',
    },
  ];

  const calculateTotals = () => {
    const totalWorkerPay = timesheetEntries.reduce(
      (sum, entry) => sum + entry.totalHours * entry.hourlyRate,
      0
    );
    const serviceFee = totalWorkerPay * 0.12; // 12% service fee
    const totalCost = totalWorkerPay + serviceFee;

    return { totalWorkerPay, serviceFee, totalCost };
  };

  const { totalWorkerPay, serviceFee, totalCost } = calculateTotals();

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-gray-900">Timesheet & Billing</h2>
          <p className="text-gray-600">Digital timesheet with GPS verification</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Period Selection */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            {['this-week', 'last-week', 'this-month', 'last-month'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {period
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timesheet Entries */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Timesheet Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {timesheetEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                          {entry.avatar}
                        </div>
                        <div>
                          <div className="text-gray-900">{entry.worker}</div>
                          <div className="text-gray-600">{entry.job}</div>
                        </div>
                      </div>

                      {entry.status === 'approved' && (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Approved
                        </Badge>
                      )}
                      {entry.status === 'pending' && (
                        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                      {entry.status === 'review' && (
                        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Review
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-gray-600">
                      <div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Date</span>
                        </div>
                        <div className="text-gray-900 mt-1">{entry.date}</div>
                      </div>

                      <div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Hours</span>
                        </div>
                        <div className="text-gray-900 mt-1">
                          {entry.checkIn} - {entry.checkOut}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>GPS</span>
                        </div>
                        <div className="text-gray-900 mt-1">
                          {entry.gpsVerified ? (
                            <span className="text-green-600">Verified</span>
                          ) : (
                            <span className="text-red-600">Not Verified</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>Total</span>
                        </div>
                        <div className="text-gray-900 mt-1">
                          ${(entry.totalHours * entry.hourlyRate).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{entry.location}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Invoice Summary */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-gray-600">Total Worker Pay</div>
                <div className="text-gray-900 mt-1">
                  ${totalWorkerPay.toFixed(2)}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="text-gray-600">Service Fee (12%)</div>
                <div className="text-gray-900 mt-1">${serviceFee.toFixed(2)}</div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="text-gray-600">Total Cost</div>
                <div className="text-gray-900 mt-1">${totalCost.toFixed(2)}</div>
              </div>

              <div className="pt-4">
                <Badge className="w-full justify-center bg-yellow-100 text-yellow-700 hover:bg-yellow-100 py-2">
                  <Clock className="w-4 h-4 mr-1" />
                  Payment Pending
                </Badge>
              </div>

              <div className="pt-4 space-y-2">
                <Button className="w-full">
                  Approve & Pay Invoice
                </Button>
                <Button variant="outline" className="w-full">
                  Download Invoice (PDF)
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-600">Dec 13 - Dec 17</span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    Paid
                  </Badge>
                </div>
                <div className="text-gray-900">$12,456.00</div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-600">Dec 6 - Dec 10</span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    Paid
                  </Badge>
                </div>
                <div className="text-gray-900">$10,890.00</div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-600">Nov 29 - Dec 3</span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    Paid
                  </Badge>
                </div>
                <div className="text-gray-900">$11,234.00</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
