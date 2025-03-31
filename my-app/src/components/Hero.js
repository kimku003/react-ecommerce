import React from 'react';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <div className="relative h-[80vh] bg-gradient-to-r from-blue-900 to-blue-700">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 h-full flex items-center"
      >
        <div className="text-white max-w-2xl">
          <h1 className="text-5xl font-bold mb-6">Découvrez Notre Collection de Drones</h1>
          <p className="text-xl mb-8">Des drones de haute qualité pour tous les niveaux</p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold"
          >
            Explorer la Collection
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;