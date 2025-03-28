const API_URL = 'http://localhost:8000/api';

// Fonction pour obtenir le cookie CSRF
const getCsrfToken = () => {
    const name = 'csrftoken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let cookie of cookieArray) {
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return '';
};

export const authService = {
    login: async (email, password) => {
        const response = await fetch(`${API_URL}/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCsrfToken(),
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password,
            }),
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Erreur de connexion');
        }
        return response.json();
    },

    register: async (email, password1, password2) => {
        const response = await fetch(`${API_URL}/auth/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCsrfToken(),
            },
            credentials: 'include',
            body: JSON.stringify({
                email,
                password1,
                password2,
            }),
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Erreur d\'inscription');
        }
        return response.json();
    },

    logout: async () => {
        const response = await fetch(`${API_URL}/auth/logout/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCsrfToken(),
            },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Erreur de déconnexion');
        }
        return response.json();
    },
};