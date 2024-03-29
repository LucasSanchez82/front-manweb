import { useApiError, useApiMessage } from "../hooks/useApiErrorAndMessage";
import { useNavigate } from "react-router-dom";
import { Query } from "../types";
import { useEffect } from "react";

const LoginPage: React.FC<Query> = ({ query }) => {
    const { message, setMessage } = useApiMessage();
    const { error, setError } = useApiError();
    const { data, isLoading, refetch } = query;
    const navigate = useNavigate();
    useEffect(() => {
        if(!isLoading && data.isLogin) {
            navigate('/mangas')
        }
    }, [isLoading])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.target;
        if (!(form instanceof HTMLFormElement)) throw Error('form n\'est pas de type HTMLFormElement');
        const formData = Object.fromEntries(new FormData(form));

        if (!(formData.email && formData.mdp)) throw Error('formdData n\'est pas complet (email & mdp)');
        await logInApi(formData);

    };

    const logInApi = async (formData: {
        [k: string]: FormDataEntryValue;
    }) => {
        try {

            const response = await fetch(import.meta.env.VITE_REACT_API_URL + '/utilisateurs/login', {
                credentials: "include",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            if (!response.ok) {
                const data = await response.json();
                setError(data.error);

            } else if (response.ok) {
                const json = await response.json();
                setMessage(json.message);
                refetch()
                navigate('/mangas');
            }
        } catch (error) {
            setError('Une erreur s\'est produite lors de la communication avec le serveur.');
            console.error(error);
        }


    }

    return (
        <div>
            <h1>log in</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder='email@exemple.com' />
                <input type="password" name="mdp" placeholder='mot de passe...' />
                <input type="submit" value="submit" />
                {error && <span> {error} </span>}
            </form>
            {message && <span> {message} </span>}
        </div>
    );
};

export default LoginPage;