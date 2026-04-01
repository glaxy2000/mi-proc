import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { supplier_email } = await req.json();

    if (!supplier_email) {
      return Response.json({ error: 'supplier_email is required' }, { status: 400 });
    }

    // Fetch all ratings for this supplier
    const ratings = await base44.asServiceRole.entities.SupplierRating.filter({ 
      supplier_email 
    });

    // Calculate averages
    const totalRatings = ratings.length;
    const avgOverall = totalRatings > 0 
      ? ratings.reduce((sum, r) => sum + r.overall_rating, 0) / totalRatings 
      : 0;
    const avgDelivery = totalRatings > 0 
      ? ratings.reduce((sum, r) => sum + (r.delivery_rating || 0), 0) / totalRatings 
      : 0;
    const avgQuality = totalRatings > 0 
      ? ratings.reduce((sum, r) => sum + (r.quality_rating || 0), 0) / totalRatings 
      : 0;
    const avgCommunication = totalRatings > 0 
      ? ratings.reduce((sum, r) => sum + (r.communication_rating || 0), 0) / totalRatings 
      : 0;

    // Calculate recommendation rate
    const recommendCount = ratings.filter(r => r.would_recommend).length;
    const recommendationRate = totalRatings > 0 
      ? (recommendCount / totalRatings) * 100 
      : 0;

    // Calculate on-time delivery rate (based on delivery_rating >= 4)
    const onTimeCount = ratings.filter(r => (r.delivery_rating || 0) >= 4).length;
    const onTimeRate = totalRatings > 0 
      ? (onTimeCount / totalRatings) * 100 
      : 0;

    // Calculate overall performance score (0-100)
    // Weighted: 40% average rating, 30% on-time delivery, 30% recommendation rate
    const overallScore = (
      (avgOverall / 5) * 40 +
      (onTimeRate / 100) * 30 +
      (recommendationRate / 100) * 30
    );

    // Check if performance record exists
    const existingPerformance = await base44.asServiceRole.entities.SupplierPerformance.filter({ 
      supplier_email 
    });

    const performanceData = {
      supplier_email,
      overall_score: Math.round(overallScore * 10) / 10,
      average_rating: Math.round(avgOverall * 10) / 10,
      total_ratings: totalRatings,
      delivery_score: Math.round(avgDelivery * 10) / 10,
      quality_score: Math.round(avgQuality * 10) / 10,
      communication_score: Math.round(avgCommunication * 10) / 10,
      on_time_delivery_rate: Math.round(onTimeRate * 10) / 10,
      recommendation_rate: Math.round(recommendationRate * 10) / 10,
      completed_orders: totalRatings,
      total_orders: totalRatings
    };

    let performance;
    if (existingPerformance.length > 0) {
      performance = await base44.asServiceRole.entities.SupplierPerformance.update(
        existingPerformance[0].id,
        performanceData
      );
    } else {
      performance = await base44.asServiceRole.entities.SupplierPerformance.create(
        performanceData
      );
    }

    return Response.json({ 
      success: true, 
      performance 
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});