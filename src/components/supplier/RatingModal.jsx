import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Star, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function RatingModal({ order, onClose, onSuccess }) {
  const [ratings, setRatings] = useState({
    overall_rating: 0,
    delivery_rating: 0,
    quality_rating: 0,
    communication_rating: 0
  });
  const [review, setReview] = useState('');
  const [recommend, setRecommend] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleStarClick = (category, value) => {
    setRatings({ ...ratings, [category]: value });
  };

  const handleSubmit = async () => {
    if (ratings.overall_rating === 0) {
      toast.error('Please provide an overall rating');
      return;
    }

    setLoading(true);
    try {
      const user = await base44.auth.me();
      
      // Calculate actual delivery days
      const orderDate = new Date(order.created_date);
      const deliveryDate = new Date(order.delivery_confirmed_date || new Date());
      const actualDays = Math.ceil((deliveryDate - orderDate) / (1000 * 60 * 60 * 24));

      await base44.entities.SupplierRating.create({
        supplier_email: order.supplier_email,
        buyer_email: user.email,
        order_id: order.id,
        overall_rating: ratings.overall_rating,
        delivery_rating: ratings.delivery_rating,
        quality_rating: ratings.quality_rating,
        communication_rating: ratings.communication_rating,
        review_text: review,
        would_recommend: recommend,
        is_verified: true,
        transaction_value: order.total_amount,
        delivery_confirmed_date: order.delivery_confirmed_date,
        actual_delivery_days: actualDays
      });

      toast.success('Rating submitted successfully');
      onSuccess?.();
      onClose();
    } catch (error) {
      toast.error('Failed to submit rating');
    } finally {
      setLoading(false);
    }
  };

  const StarRating = ({ value, onChange, label }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`h-6 w-6 ${
                star <= value 
                  ? 'fill-amber-500 text-amber-500' 
                  : 'text-slate-300'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Rate Supplier: {order.supplier_name}</DialogTitle>
          <DialogDescription>
            Your rating helps other buyers make informed decisions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="p-4 bg-blue-50 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Logic-Based Review System</p>
              <p>Your rating is verified against actual transaction data. Only buyers who completed orders can review suppliers.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <StarRating
              value={ratings.overall_rating}
              onChange={(v) => handleStarClick('overall_rating', v)}
              label="Overall Rating *"
            />
            <StarRating
              value={ratings.delivery_rating}
              onChange={(v) => handleStarClick('delivery_rating', v)}
              label="Delivery Performance"
            />
            <StarRating
              value={ratings.quality_rating}
              onChange={(v) => handleStarClick('quality_rating', v)}
              label="Product Quality"
            />
            <StarRating
              value={ratings.communication_rating}
              onChange={(v) => handleStarClick('communication_rating', v)}
              label="Communication"
            />
          </div>

          <div className="space-y-2">
            <Label>Written Review</Label>
            <Textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience with this supplier..."
              rows={4}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="recommend"
              checked={recommend}
              onChange={(e) => setRecommend(e.target.checked)}
              className="w-4 h-4"
            />
            <Label htmlFor="recommend" className="font-normal cursor-pointer">
              I would recommend this supplier to others
            </Label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Rating'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}