import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../api/config';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            }
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    }
};

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const { cartItems, getCartTotal, clearCart } = useCart();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            return;
        }

        try {
            // Créer l'intention de paiement
            const response = await fetch(`${API_URL}/payments/create_payment/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': document.cookie.split('csrftoken=')[1]?.split(';')[0],
                },
                credentials: 'include',
                body: JSON.stringify({
                    total_amount: getCartTotal(),
                    items: cartItems
                })
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la création du paiement');
            }

            const { client_secret, order_id } = await response.json();

            console.log('Intention de paiement créée:', { order_id });

            // Confirmer le paiement
            const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            });

            if (error) {
                setError(error.message);
                console.error('Erreur de paiement:', error);
            } else {
                setSucceeded(true);
                console.log('Paiement réussi:', paymentIntent);

                // Vérifier le statut de la commande
                const statusCheck = setInterval(async () => {
                    try {
                        const statusResponse = await fetch(
                            `${API_URL}/payments/${order_id}/check_status/`,
                            { credentials: 'include' }
                        );
                        const statusData = await statusResponse.json();
                        
                        if (statusData.status === 'C') {
                            clearInterval(statusCheck);
                            clearCart();
                            navigate('/confirmation');
                        }
                    } catch (err) {
                        console.error('Erreur lors de la vérification du statut:', err);
                    }
                }, 2000);

                // Arrêter la vérification après 30 secondes
                setTimeout(() => clearInterval(statusCheck), 30000);
            }
        } catch (err) {
            console.error('Erreur:', err);
            setError(err.message);
        }

        setProcessing(false);
    };

    return (
        <div className="max-w-md mx-auto p-6">
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Détails du paiement</h2>
                <p className="text-gray-600">Total à payer : {getCartTotal().toFixed(2)} €</p>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <CardElement options={CARD_ELEMENT_OPTIONS} className="p-4 border rounded" />
                </div>
                {error && (
                    <div className="text-red-500 mb-4">{error}</div>
                )}
                {succeeded && (
                    <div className="text-green-500 mb-4">Paiement réussi!</div>
                )}
                <button
                    type="submit"
                    disabled={!stripe || processing || succeeded}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {processing ? 'Traitement en cours...' : 'Payer'}
                </button>
            </form>
        </div>
    );
};

export const StripeCheckout = () => (
    <Elements stripe={stripePromise}>
        <PaymentForm />
    </Elements>
);

export default StripeCheckout;