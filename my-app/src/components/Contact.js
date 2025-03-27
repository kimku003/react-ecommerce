import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [messageSent, setMessageSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Message envoyé:', formData);
        setMessageSent(true);
        setTimeout(() => setMessageSent(false), 3000);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="container mx-auto py-10">
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-8 animate-fade-in">Contactez-Nous</h2>
            <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto animate-slide-in-right">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nom:</label>
                        <input 
                            type="text" 
                            id="name" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
                        <textarea 
                            id="message" 
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-y" 
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
                        Envoyer Message
                    </button>
                </form>
                {messageSent && (
                    <div className="mt-6 text-green-600 text-center font-semibold animate-fade-in">
                        Message envoyé avec succès!
                    </div>
                )}
            </div>
        </section>
    );
};

export default Contact;
