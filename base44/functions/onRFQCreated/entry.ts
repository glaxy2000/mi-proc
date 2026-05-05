import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const { event, data } = payload;
    if (!data) {
      return Response.json({ ok: true, message: 'No data, skipped' });
    }

    const rfqType = event?.entity_name === 'GoodsRFQ' ? 'goods' : 'services';
    const rfqTitle = data.title || 'New RFQ';
    const rfqId = data.id || event?.entity_id;
    const category = data.category || '';
    const budget = data.budget ? `SAR ${Number(data.budget).toLocaleString()}` : 'N/A';
    const buyerEmail = data.buyer_email || '';

    // 1. Notify ALL suppliers about the new RFQ (broadcast)
    await base44.asServiceRole.entities.Notification.create({
      recipient_role: 'supplier',
      type: 'new_rfq',
      title: `New RFQ Available: ${rfqTitle}`,
      message: `A new ${rfqType} RFQ has been posted in ${category}. Budget: ${budget}. Submit your bid before the deadline.`,
      rfq_id: rfqId,
      rfq_type: rfqType,
      rfq_title: rfqTitle,
      is_read: false,
      link: 'RFQList'
    });

    // 2. Confirm to the buyer that their RFQ was published
    if (buyerEmail) {
      await base44.asServiceRole.entities.Notification.create({
        recipient_email: buyerEmail,
        recipient_role: 'buyer',
        type: 'new_rfq',
        title: `RFQ Published: ${rfqTitle}`,
        message: `Your ${rfqType} RFQ "${rfqTitle}" has been successfully published and is now visible to suppliers. You'll be notified when bids arrive.`,
        rfq_id: rfqId,
        rfq_type: rfqType,
        rfq_title: rfqTitle,
        is_read: false,
        link: 'RFQList'
      });
    }

    return Response.json({ ok: true, rfqId, rfqType });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});