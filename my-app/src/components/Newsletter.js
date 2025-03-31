import React from 'react';

export const Newsletter = () => {
  return (
    <section className="bg-blue-900 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Restez informé de nos nouveautés
          </h2>
          <p className="text-blue-100 mb-8">
            Inscrivez-vous à notre newsletter pour recevoir nos offres exclusives
          </p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Votre email"
              className="px-6 py-3 rounded-full flex-1 max-w-md"
            />
            <button className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors">
              S'inscrire
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;