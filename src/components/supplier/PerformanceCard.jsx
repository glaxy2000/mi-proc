import React from 'react';
import { Star, TrendingUp, Package, ThumbsUp, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function PerformanceCard({ performance }) {
  if (!performance) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-slate-500">
          No performance data available yet
        </CardContent>
      </Card>
    );
  }

  const getScoreBadge = (score) => {
    if (score >= 80) return { label: 'Excellent', color: 'bg-green-100 text-green-700' };
    if (score >= 60) return { label: 'Good', color: 'bg-blue-100 text-blue-700' };
    if (score >= 40) return { label: 'Average', color: 'bg-amber-100 text-amber-700' };
    return { label: 'Needs Improvement', color: 'bg-red-100 text-red-700' };
  };

  const scoreBadge = getScoreBadge(performance.overall_score);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Performance Metrics</CardTitle>
          <Badge className={scoreBadge.color}>{scoreBadge.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Overall Score</span>
            <span className="text-2xl font-bold text-indigo-600">
              {performance.overall_score}/100
            </span>
          </div>
          <Progress value={performance.overall_score} className="h-3" />
        </div>

        {/* Ratings Breakdown */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Star className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Avg Rating</p>
              <p className="text-lg font-semibold">{performance.average_rating || 0}/5</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-teal-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">On-Time</p>
              <p className="text-lg font-semibold">{performance.on_time_delivery_rate || 0}%</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Quality</p>
              <p className="text-lg font-semibold">{performance.quality_score || 0}/5</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <ThumbsUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-slate-500">Recommend</p>
              <p className="text-lg font-semibold">{performance.recommendation_rate || 0}%</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="pt-4 border-t">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-slate-900">{performance.total_ratings || 0}</p>
              <p className="text-xs text-slate-500">Total Reviews</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{performance.completed_orders || 0}</p>
              <p className="text-xs text-slate-500">Completed Orders</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}