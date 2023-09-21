import React, { useState } from 'react';
import { useApiError } from '../hooks/useApiErrorAndMessage';

const SignIn = () => {
    const {error, setError} = useApiError();
    const [responseMessage, setResponseMessage] = useState('');

    const signInApi = async (formData:{
        [k: string]: FormDataEntryValue;
    }) => {
        try {
            const response = await fetch(import.meta.env.VITE_REACT_API_URL + '/utilisateurs/signin', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorMessage = await response.json()
                setError(errorMessage);
                setResponseMessage('')
                
                
                //  if(!errorMessage)throw new Error(`HTTP error! Status: ${response.status}\nmessage :  ${errorMessage}`);
            }else {
                const data = await response.json();
                setResponseMessage(data.message);
                setError('');
            }

        } catch (error) {
            setError('Une erreur s\'est produite lors de la communication avec le serveur.');
            console.error(error);
        }
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const form = event.target;
        if (!(form instanceof HTMLFormElement)) throw Error('le formulaire n\'est pas une instance de HTMLFormElement');
        const formData = Object.fromEntries(new FormData(form));

        if (
            formData.mdp &&
            formData.verifMdp &&
            formData.email &&
            formData.pseudo
        ) {
            if (!(formData.verifMdp === formData.mdp)) {
                setError('les mots de passes doivent être identiques');
            } else if (formData.mdp === '') {
                setError('Il doit y avoir un mot de passe');
            } else {
                setError('');
                
                // interrogation de la base de donnee
                await signInApi(formData)
            }
        } else {
            setError('veuillez Remplir tous les champs du formulaire !');
        }
    };

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder='email@exemple.com' />
                <input type="text" name="pseudo" placeholder='Pseudo...' />
                <input type="password" name="mdp" placeholder='password...' />
                <input type="password" name="verifMdp" placeholder='verify password...' />
                <input type="submit" value="submit" />
                {error && <span> {error} </span>}
            </form>
                {responseMessage && <span> {responseMessage} </span>}
        </div>
    );
};

export default SignIn;