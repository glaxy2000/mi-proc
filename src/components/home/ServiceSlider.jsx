import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    number: '01',
    tag: 'Procurement Expertise',
    title: 'Professional Procurement Support',
    description: 'Mi-Proc provides specialised procurement expertise that helps organizations streamline purchasing operations and improve overall efficiency. By aligning procurement practices with business goals, our services ensure better control, smarter sourcing decisions, and stronger operational performance.',
    accent: 'from-teal-400 to-cyan-400',
  },
  {
    number: '02',
    tag: 'Custom Strategies',
    title: 'Tailored Procurement Solutions',
    description: 'With Mi-Proc, organizations can implement procurement strategies that are customized to their specific operational requirements. Our flexible solutions are designed to support unique workflows, enabling businesses to optimize their procurement processes while achieving strategic objectives.',
    accent: 'from-indigo-400 to-purple-400',
  },
  {
    number: '03',
    tag: 'Supplier Excellence',
    title: 'Advanced Supplier Relationship Management',
    description: "Strengthen supplier collaboration and performance with Mi-Proc's comprehensive supplier management capabilities. Our platform enables better communication, transparency, and performance tracking, ensuring reliable deliveries and high-quality results from trusted suppliers.",
    accent: 'from-pink-400 to-rose-400',
  },
];

export default function ServiceSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent(prev => (prev - 1 + slides.length) % slides.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent(prev => (prev + 1) % slides.length);
  };

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
  };

  const slide = slides[current];

  return (
    <div className="relative w-full">
      {/* Slide Content */}
      <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 min-h-[220px] lg:min-h-[200px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="px-8 py-8 lg:px-14 lg:py-10"
          >
            {/* Tag + Number */}
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-gradient-to-r ${slide.accent} text-white/90`}>
                {slide.tag}
              </span>
              <span className="text-5xl font-black text-white/10 leading-none select-none">{slide.number}</span>
            </div>

            {/* Title */}
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
              {slide.title}
            </h2>

            {/* Description */}
            <p className="text-base lg:text-lg text-white/80 leading-relaxed max-w-3xl">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Side arrows */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-all border border-white/20"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-all border border-white/20"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Progress dots + bar */}
      <div className="flex items-center justify-center gap-3 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative flex items-center"
          >
            {i === current ? (
              <motion.div
                layoutId="activeDot"
                className="h-2 rounded-full bg-white overflow-hidden"
                style={{ width: 40 }}
              >
                <motion.div
                  className="h-full bg-teal-300 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  key={current}
                />
              </motion.div>
            ) : (
              <div className="w-2 h-2 rounded-full bg-white/40 hover:bg-white/70 transition-colors" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}