import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      name: "Jean Dupont",
      role: "Photographe professionnel",
      content: "La qualité des drones est exceptionnelle. Le service client est très réactif.",
      image: "/images/testimonial1.jpg"
    },
    {
      name: "Marie Martin",
      role: "Vidéaste",
      content: "Ces drones ont révolutionné ma façon de filmer. Je recommande !",
      image: "/images/testimonial2.jpg"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Ils nous font confiance</h2>
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <p className="text-xl mb-4">{testimonials[currentIndex].content}</p>
              <h3 className="font-bold">{testimonials[currentIndex].name}</h3>
              <p className="text-gray-600">{testimonials[currentIndex].role}</p>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % testimonials.length)}
              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;