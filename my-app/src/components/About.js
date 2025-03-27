import React from 'react';

const About = () => {
    return (
        <section id="about" className="bg-blue-100 py-10 rounded-md">
            <div className="container mx-auto text-center animate-fade-in">
                <h2 className="text-2xl font-bold text-blue-700 mb-8">À Propos de Nous</h2>
                <p className="text-gray-700 text-lg">
                    Nous sommes une équipe passionnée dédiée à vous offrir la meilleure expérience d'achat en ligne.
                    Avec des années d'expérience dans l'industrie, nous comprenons vos besoins et nous nous efforçons
                    de vous fournir des produits de qualité supérieure et un service client exceptionnel.
                </p>
                <div className="mt-8 flex justify-center">
                    <img src="https://placehold.co/400x300/EEE/31343C" alt="Notre équipe" className="rounded-lg shadow-lg animate-slide-in-left" />
                </div>
            </div>
        </section>
    );
};

export default About;
