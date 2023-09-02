import { useState } from "react";

const LoginPage = () => {
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target;
        if (!(form instanceof HTMLFormElement)) throw Error('form n\'est pas de type HTMLFormElement');
        const formData = Object.fromEntries(new FormData(form));
        console.log(formData);

        if (!(formData.email && formData.mdp)) throw Error('formdData n\'est pas complet (email & mdp)');
        await logInApi(formData);

    };

    const logInApi = async (formData: {
        [k: string]: FormDataEntryValue;
    }) => {
        try {
            const response = await fetch('http://localhost:3000/utilisateurs/login', {
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
                const json = await response.json()
                setMessage(json.message);
                
            }
        } catch (error) {
            setError('Une erreur s\'est produite lors de la communication avec le serveur.');
            console.error(error);
        }
        // console.log(await response.json());


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