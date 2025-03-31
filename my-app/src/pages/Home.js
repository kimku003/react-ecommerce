import React from 'react';
import { Hero } from '../components/Hero';
import { FeaturedCategories } from '../components/FeaturedCategories';
import { Features } from '../components/Features';
import { Newsletter } from '../components/Newsletter';
import Testimonials from '../components/Testimonials';  // Changement ici Changement ici

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedCategories />
      <Features />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;

