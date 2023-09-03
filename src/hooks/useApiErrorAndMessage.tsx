import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useApiError = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    if(error === 'Vous devez être connecté !') navigate('/login'); 

    
    

    const clearError = () => {
        setError('');
    };

    return {
        error,
        setError,
        clearError,
    };
};
const useApiMessage = () => {
    const [message, setMessage] = useState('');

    const clearMessage = () => {
        setMessage('');
    };

    return {
        message,
        setMessage,
        clearMessage,
    };
};

export {useApiError, useApiMessage};
