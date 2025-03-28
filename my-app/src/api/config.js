export const API_URL = 'http://localhost:8000/api';

export const fetchConfig = {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
};

export const endpoints = {
    products: `${API_URL}/products/`,
    categories: `${API_URL}/categories/`,
};
