import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    number: '01',
    title: 'Professional Procurement Support',
    description: 'Mi-Proc provides specialised procurement expertise that helps organizations streamline purchasing operations and improve overall efficiency. By aligning procurement practices with business goals, our services ensure better control, smarter sourcing decisions, and stronger operational performance.',
  },
  {
    number: '02',
    title: 'Tailored Procurement Solutions',
    description: 'With Mi-Proc, organizations can implement procurement strategies that are customized to their specific operational requirements. Our flexible solutions are designed to support unique workflows, enabling businesses to optimize their procurement processes while achieving strategic objectives.',
  },
  {
    number: '03',
    title: 'Advanced Supplier Relationship Management',
    description: 'Strengthen supplier collaboration and performance with Mi-Proc\'s comprehensive supplier management capabilities. Our platform enables better communication, transparency, and performance tracking, ensuring reliable deliveries and high-quality results from trusted suppliers.',
  },
];

export default function ServiceSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent(prev => (prev - 1 + slides.length) % slides.length);
  const next = () => setCurrent(prev => (prev + 1) % slides.length);

  return (
    <div className="relative mt-10 w-full max-w-3xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 px-8 py-6 min-h-[140px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl font-bold text-white/30 leading-none select-none">{slides[current].number}</span>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{slides[current].title}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{slides[current].description}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-white transition-colors">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-white transition-colors">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`transition-all rounded-full ${i === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}