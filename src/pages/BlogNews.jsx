import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import PublicNavbar from '@/components/PublicNavbar';
import { Calendar, Tag, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const posts = [
  {
    id: 1,
    category: 'Fintech Radar',
    date: 'July 2025',
    title: 'MIT Fintech Radar – July 2025',
    subtitle: 'Global Fintech Momentum Accelerates Amid Economic Shifts',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    summary: 'MI Technologies proudly presents the first edition of MIT Fintech Radar – July 2025, delivering a comprehensive overview of the global fintech landscape across major markets including the USA, UK, Singapore, China, Saudi Arabia, and Egypt.',
    sections: [
      {
        title: '🌍 Global Overview: Innovation Driving Financial Transformation',
        content: 'Across markets, Artificial Intelligence (AI), Embedded Finance, Open Banking, Blockchain, and Digital Assets remain central to fintech evolution. Key themes shaping H1 2025 include AI-driven personalization, expansion of embedded finance ecosystems, digital payment acceleration, rise of regulatory sandboxes, and strategic cross-border expansion into the GCC and MENA markets.'
      },
      {
        title: '🇺🇸 United States: Resilience Through Consolidation & AI Innovation',
        content: 'Despite funding declining 29% to $2.6B, acquisition activity increased by 26% with payments funding doubling to $2.5B. Major developments include Visa\'s $5.3B acquisition of Plaid, Stripe expanding stablecoin payments across 34 countries, and SoFi reporting record $772M net revenue.'
      },
      {
        title: '🇬🇧 United Kingdom: Strategic Growth with Larger Deal Sizes',
        content: 'The UK economy grew 0.7% in Q1 2025. Key fintech leaders include Revolut (£1.5B revenue), Monzo (£800M revenue), Wise (£1B revenue), and Checkout.com (£1.2B revenue). Emerging trends include AI-powered hyper-personalized financial products and Banking-as-a-Service collaborations.'
      },
      {
        title: '🇸🇬 Singapore: Strong Long-Term Outlook',
        content: 'The fintech market is projected to grow from USD 42.77B in 2025 to USD 69.64B by 2030 (10.24% CAGR). Growth drivers include embedded finance expansion, MAS-led AI risk management frameworks, and cross-border fintech partnerships.'
      },
      {
        title: '🇨🇳 China: Digital Yuan & Massive Market Expansion',
        content: 'China\'s economy grew 5.4% YoY in Q1 2025. The fintech sector continues rapid expansion from USD 4.59T (2024) to projected USD 9.97T by 2030 (13.8% CAGR). Key developments include nationwide digital yuan rollout with 1M+ merchants and AI capital expenditure projected up to 700B yuan in 2025.'
      },
      {
        title: '🇸🇦 Saudi Arabia: Fintech Growth Powered by Vision 2030',
        content: 'Saudi Arabia continues to lead fintech growth in MENA with market valued at USD 2.85B (2025), projected to reach USD 5.28B by 2030 (13.08% CAGR). Digital payments dominate with 48.5% market share. Blockchain business registrations surged 51% in Q2 2025. International fintech giants including Ant International, Revolut, Checkout.com, and Nium are expanding operations in the Kingdom.'
      },
      {
        title: '🔎 Strategic Insights for MI Technologies',
        content: 'The MIT Fintech Radar underscores strategic opportunities aligned with MI Technologies\' mission: Embedded finance integration, AI-driven credit scoring, Open banking and API infrastructure development, Blockchain-enabled secure transactions, and Cross-border payment innovation. As Saudi Arabia advances toward a digital-first economy under Vision 2030, MI Technologies remains committed to delivering innovative solutions that support MSME growth and financial inclusion.'
      },
    ]
  },
  {
    id: 2,
    category: 'Fintech Radar',
    date: 'October 2025',
    title: 'Fintech Radar Around the World – Issue 02',
    subtitle: 'Spotlighting Tomorrow\'s Financial Technologies Today',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    summary: 'This quarterly newsletter covers the dynamic fintech landscape from May to September 2025 with a spotlight on digital payments, POS systems, ECR integrations, crowdfunding platforms, mergers and acquisitions, investments, and regional expansions.',
    sections: [
      {
        title: 'Digital Payments & POS Systems',
        content: 'The sector accelerates toward a fully digital economy with significant developments in point-of-sale systems and electronic cash register integrations, driving financial inclusion across Saudi Arabia, the GCC, Egypt, and worldwide.'
      },
      {
        title: 'Crowdfunding Platforms',
        content: 'Innovative crowdfunding solutions are reshaping how businesses and entrepreneurs access capital, with particular growth in the MENA region supporting Vision 2030 objectives.'
      },
      {
        title: 'M&A and Investment Surge',
        content: 'The quarter witnessed significant merger and acquisition activity alongside major funding rounds, highlighting investor confidence in fintech innovation and regulatory progress driving the industry forward.'
      },
      {
        title: 'Regional Expansion Spotlight',
        content: 'Analysis of key developments across Saudi Arabia, the GCC, and Egypt showcasing how regional markets are embracing digital transformation and financial technology solutions.'
      },
    ]
  },
];

export default function BlogNews() {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      <PublicNavbar activePage="BlogNews" />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#5b4fb8] via-[#4a8fb9] to-[#2bb3b3] py-24 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="bg-white/20 text-white mb-6">LATEST UPDATES</Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Blog & News</h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Stay updated with the latest developments, insights, and announcements from MI Technologies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 space-y-10">
          {posts.map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="border-0 shadow-lg overflow-hidden hover:shadow-xl transition-all">
                {/* Cover Image */}
                <div className="aspect-video overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>

                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-indigo-100 text-indigo-700">
                      <Tag className="h-3 w-3 mr-1" />{post.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-sm text-slate-500">
                      <Calendar className="h-4 w-4" />{post.date}
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 mb-2">{post.title}</h2>
                  <p className="text-indigo-600 font-medium mb-4">{post.subtitle}</p>
                  <p className="text-slate-600 leading-relaxed mb-6">{post.summary}</p>

                  <Button
                    variant="outline"
                    className="border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                    onClick={() => setExpanded(expanded === post.id ? null : post.id)}
                  >
                    {expanded === post.id ? (
                      <><ChevronUp className="mr-2 h-4 w-4" /> Hide Full Article</>
                    ) : (
                      <><ChevronDown className="mr-2 h-4 w-4" /> Read Full Article</>
                    )}
                  </Button>

                  {expanded === post.id && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 space-y-6 border-t pt-6">
                      {post.sections.map((section, j) => (
                        <div key={j}>
                          <h3 className="font-bold text-slate-900 mb-2">{section.title}</h3>
                          <p className="text-slate-600 leading-relaxed">{section.content}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Want to Learn More?</h2>
          <p className="text-white/80 mb-8 text-lg">Get in touch with our team to discover how we can help transform your business.</p>
          <Link to={createPageUrl('Contact')}>
            <Button size="lg" className="bg-white text-indigo-700 hover:bg-white/90 font-semibold">
              Contact Us <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p>&copy; 2026 MI Technologies. All rights reserved. Licensed by SAMA.</p>
      </footer>
    </div>
  );
}