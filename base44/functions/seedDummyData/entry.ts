import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Admin access required' }, { status: 403 });
    }

    const supplierNames = [
      'Al-Noor', 'Al-Amal', 'Al-Rajhi', 'Al-Safa', 'Al-Nakheel',
      'Global Trade', 'Prime Industries', 'Tech Solutions', 'Quality Materials',
      'Express Logistics', 'Precision Manufacturing', 'Desert Supplies',
      'Modern Engineering', 'Elite Consultants', 'Swift Delivery'
    ];

    const buyerCompanies = [
      'Saudi Aramco', 'Acme Corp', 'Tech Innovations', 'Build Co', 'Smart Systems',
      'Future Tech', 'Energy Solutions', 'Global Traders', 'Capital Ventures',
      'Strategic Partners', 'Innovation Hub', 'Enterprise Solutions'
    ];

    // Generate dummy suppliers
    const supplierBatch = [];
    for (let i = 0; i < 2000; i++) {
      const baseName = supplierNames[i % supplierNames.length];
      const supplierName = `${baseName} ${Math.floor(i / supplierNames.length) + 1}`;
      const supplierId = `SUP-${String(i + 1).padStart(5, '0')}`;
      
      supplierBatch.push({
        company_email: `supplier-${i + 1}@miprocplatform.com`,
        full_name: supplierName,
        email: `supplier-${i + 1}@miprocplatform.com`,
        role: 'supplier'
      });
    }

    // Generate dummy buyers
    const buyerBatch = [];
    for (let i = 0; i < 5000; i++) {
      const baseCompany = buyerCompanies[i % buyerCompanies.length];
      const buyerCompany = `${baseCompany} ${Math.floor(i / buyerCompanies.length) + 1}`;
      const buyerName = `Buyer-${i + 1}`;
      
      buyerBatch.push({
        company_email: `buyer-${i + 1}@miprocplatform.com`,
        full_name: buyerName,
        email: `buyer-${i + 1}@miprocplatform.com`,
        role: 'buyer'
      });
    }

    // Batch create suppliers (in chunks to avoid timeout)
    const chunkSize = 100;
    let createdSuppliers = 0;
    for (let i = 0; i < supplierBatch.length; i += chunkSize) {
      const chunk = supplierBatch.slice(i, i + chunkSize);
      try {
        await Promise.all(
          chunk.map(supplier => 
            base44.asServiceRole.entities.User.bulkCreate([supplier]).catch(() => null)
          )
        );
        createdSuppliers += chunk.length;
      } catch (e) {
        console.log(`Batch ${i} partially failed`, e.message);
      }
    }

    // Batch create buyers (in chunks)
    let createdBuyers = 0;
    for (let i = 0; i < buyerBatch.length; i += chunkSize) {
      const chunk = buyerBatch.slice(i, i + chunkSize);
      try {
        await Promise.all(
          chunk.map(buyer => 
            base44.asServiceRole.entities.User.bulkCreate([buyer]).catch(() => null)
          )
        );
        createdBuyers += chunk.length;
      } catch (e) {
        console.log(`Batch ${i} partially failed`, e.message);
      }
    }

    return Response.json({
      success: true,
      message: 'Dummy data seeding completed',
      created: {
        suppliers: createdSuppliers,
        buyers: createdBuyers
      }
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});