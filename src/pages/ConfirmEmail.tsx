import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApiError, useApiMessage } from '../hooks/useApiErrorAndMessage';

const ConfirmEmail: React.FC = () => {
    const { idUtilisateur, token } = useParams<{ idUtilisateur: string; token: string }>();
    if (!(idUtilisateur && token)) throw Error('idUtilisateur et token non trouvés ou falsy')
    
    const { error, setError } = useApiError();
    const { message, setMessage } =useApiMessage();
    const data = ({ idUtilisateur: parseInt(idUtilisateur), token: token })

    const navigate = useNavigate();
    useEffect(() => {
        console.log('data : ', data);

        fetchData()


    }, []);

    const fetchData = async () => {
        let response = await fetch(import.meta.env.VITE_REACT_API_URL + '/utilisateurs/signin/verify', {
            credentials: 'include',
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })

        let { error } = await response.json();
        // alert(error)

        if (error) {

            setError(error || 'erreur undefined')
        } else {
            // Redirection en cas de succès
            navigate('/')
        }




    }


    return (
        <div>
            {error && <h2>{error}</h2>}
            <p>User ID: {idUtilisateur}</p>
            <p>Token: {token}</p>
            {/* Render data received from the API */}
        </div>
    );
};

export default ConfirmEmail;
