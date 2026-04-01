import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    const { full_name, email, phone, company, job_title, country, interest_type, message } = body;

    if (!full_name || !email || !company || !interest_type) {
      return Response.json({ error: 'Missing required fields: full_name, email, company, interest_type' }, { status: 400 });
    }

    const lead = await base44.asServiceRole.entities.LeapLead.create({
      full_name,
      email,
      phone: phone || '',
      company,
      job_title: job_title || '',
      country: country || '',
      interest_type,
      message: message || '',
      status: 'new'
    });

    return Response.json({ success: true, lead });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});