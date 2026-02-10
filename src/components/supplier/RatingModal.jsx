import React from 'react';
import { Star } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { base44 } from '@/api/base44Client';

export default function RatingModal({ open, onClose, order, onRatingSubmitted }) {
  const [ratings, setRatings] = React.useState({
    overall_rating: 0,
    delivery_rating: 0,
    quality_rating: 0,
    communication_rating: 0
  });
  const [reviewText, setReviewText] = React.useState('');
  const [wouldRecommend, setWouldRecommend] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);

  const StarRating = ({ value, onChange, label }) => {
    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">{label}</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`h-8 w-8 ${
                  star <= value
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-slate-300'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    );
  };

  const handleSubmit = async () => {
    if (ratings.overall_rating === 0) {
      alert('Please provide an overall rating');
      return;
    }

    setSubmitting(true);
    try {
      const user = await base44.auth.me();
      
      // Create the rating
      await base44.entities.SupplierRating.create({
        supplier_email: order.supplier_email || 'supplier@example.com',
        buyer_email: user.email,
        order_id: order.id,
        ...ratings,
        review_text: reviewText,
        would_recommend: wouldRecommend
      });

      // Update supplier performance
      await base44.functions.invoke('updateSupplierPerformance', {
        supplier_email: order.supplier_email || 'supplier@example.com'
      });

      onRatingSubmitted?.();
      onClose();
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Rate Supplier Performance</DialogTitle>
          <DialogDescription>
            Order {order?.id} - {order?.supplier}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <StarRating
            value={ratings.overall_rating}
            onChange={(val) => setRatings({ ...ratings, overall_rating: val })}
            label="Overall Satisfaction"
          />

          <StarRating
            value={ratings.delivery_rating}
            onChange={(val) => setRatings({ ...ratings, delivery_rating: val })}
            label="On-Time Delivery"
          />

          <StarRating
            value={ratings.quality_rating}
            onChange={(val) => setRatings({ ...ratings, quality_rating: val })}
            label="Product/Service Quality"
          />

          <StarRating
            value={ratings.communication_rating}
            onChange={(val) => setRatings({ ...ratings, communication_rating: val })}
            label="Communication & Responsiveness"
          />

          <div className="space-y-2">
            <Label>Review (Optional)</Label>
            <Textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience with this supplier..."
              rows={4}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <Label className="text-sm font-medium">Would you recommend this supplier?</Label>
              <p className="text-xs text-slate-500 mt-1">Help other buyers make informed decisions</p>
            </div>
            <Switch
              checked={wouldRecommend}
              onCheckedChange={setWouldRecommend}
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={submitting || ratings.overall_rating === 0}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {submitting ? 'Submitting...' : 'Submit Rating'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}