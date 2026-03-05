import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Settings, Users, ChevronLeft, ChevronRight } from 'lucide-react';

const services = [
  {
    icon: Briefcase,
    number: '01',
    title: 'Professional Procurement Support',
    description:
      'Mi-Proc provides specialised procurement expertise that helps organizations streamline purchasing operations and improve overall efficiency. By aligning procurement practices with business goals, our services ensure better control, smarter sourcing decisions, and stronger operational performance.',
    gradient: 'from-indigo-600 to-purple-700',
    accent: 'bg-indigo-500',
  },
  {
    icon: Settings,
    number: '02',
    title: 'Tailored Procurement Solutions',
    description:
      'With Mi-Proc, organizations can implement procurement strategies that are customized to their specific operational requirements. Our flexible solutions are designed to support unique workflows, enabling businesses to optimize their procurement processes while achieving strategic objectives.',
    gradient: 'from-teal-500 to-cyan-600',
    accent: 'bg-teal-500',
  },
  {
    icon: Users,
    number: '03',
    title: 'Advanced Supplier Relationship Management',
    description:
      'Strengthen supplier collaboration and performance with Mi-Proc\'s comprehensive supplier management capabilities. Our platform enables better communication, transparency, and performance tracking, ensuring reliable deliveries and high-quality results from trusted suppliers.',
    gradient: 'from-purple-600 to-pink-600',
    accent: 'bg-purple-500',
  },
];

export default function ServicesSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + services.length) % services.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % services.length);
  };

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
  };

  const service = services[current];

  return (
    <section className="py-20 bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-teal-500/20 text-teal-300 text-sm font-semibold rounded-full mb-4 uppercase tracking-wide">
            Our Services
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            What We <span className="text-teal-400">Offer</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Comprehensive procurement services designed to transform how your organization sources, buys, and manages suppliers.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className={`bg-gradient-to-br ${service.gradient} rounded-3xl overflow-hidden shadow-2xl`}
            >
              <div className="grid lg:grid-cols-2 gap-0 min-h-[340px]">
                {/* Left: Number & Icon */}
                <div className="flex flex-col justify-center items-center p-10 lg:p-16 border-b lg:border-b-0 lg:border-r border-white/10">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.4 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="w-24 h-24 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-xl">
                      <service.icon className="h-12 w-12 text-white" />
                    </div>
                    <span className="text-6xl font-black text-white/20 select-none leading-none">
                      {service.number}
                    </span>
                  </motion.div>
                </div>

                {/* Right: Text */}
                <div className="flex flex-col justify-center p-10 lg:p-16">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-5 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-white/80 text-base lg:text-lg leading-relaxed">
                      {service.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-100 transition-colors z-10"
          >
            <ChevronLeft className="h-5 w-5 text-slate-700" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 w-11 h-11 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-100 transition-colors z-10"
          >
            <ChevronRight className="h-5 w-5 text-slate-700" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? 'w-8 h-3 bg-teal-400' : 'w-3 h-3 bg-slate-600 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* Thumbnail Tabs */}
        <div className="grid sm:grid-cols-3 gap-4 mt-10">
          {services.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`text-left p-4 rounded-2xl border transition-all duration-300 ${
                i === current
                  ? 'border-teal-500 bg-teal-500/10'
                  : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${s.accent} flex items-center justify-center flex-shrink-0`}>
                  <s.icon className="h-4 w-4 text-white" />
                </div>
                <p className={`text-sm font-semibold leading-snug ${i === current ? 'text-teal-300' : 'text-slate-400'}`}>
                  {s.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}