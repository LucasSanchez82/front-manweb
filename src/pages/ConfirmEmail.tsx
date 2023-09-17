import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApiError } from '../hooks/useApiErrorAndMessage';
import { apiConfirmEmail } from '../api/api';

const ConfirmEmail: React.FC = () => {
    const { idUtilisateur, token } = useParams<{ idUtilisateur: string; token: string }>();
    if (!(idUtilisateur && token)) throw Error('idUtilisateur et token non trouvés ou falsy')
    
    const { error, setError } = useApiError();
    const data = ({ idUtilisateur: parseInt(idUtilisateur), token: token })

    const navigate = useNavigate();
    useEffect(() => {
        console.log('data : ', data);

        confirmEmail()


    }, []);

    const confirmEmail = async () => {
        const { error } = await apiConfirmEmail(data.idUtilisateur, data.token);

        if (error) {
            setError(error || 'erreur undefined')
        } else {
            // Redirection en cas de succès
            navigate('/')
        }
    }


    return (
        <div>
            {error && <h2>Erreur : {error}</h2>}
        </div>
    );
};

export default ConfirmEmail;
