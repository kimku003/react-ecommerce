import React from 'react';

export const FeaturedCategories = () => {
  const categories = [
    { name: 'Pro', image: '/images/pro-drone.jpg' },
    { name: 'Amateur', image: '/images/amateur-drone.jpg' },
    { name: 'Débutant', image: '/images/beginner-drone.jpg' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Nos Catégories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map(category => (
            <div key={category.name} className="relative group cursor-pointer">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;