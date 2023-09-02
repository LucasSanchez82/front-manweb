import React, { useState } from 'react';

const SignIn = () => {
    const [error, setError] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const signInApi = async (formData:{
        [k: string]: FormDataEntryValue;
    }) => {
        try {
            const response = await fetch('http://localhost:3000/utilisateurs/signin', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorMessage = await response.json()
                setError(errorMessage.error);
                
                //  if(!errorMessage)throw new Error(`HTTP error! Status: ${response.status}\nmessage :  ${errorMessage}`);
            }else {
                const data = await response.json();
                setResponseMessage(data.message); // Assuming the API returns a message
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
                const mdpForCreateUser = prompt('renseigne le mot de passe administrateur de creation de compte');
                if (mdpForCreateUser) {
                    formData.mdpForCreateUser = mdpForCreateUser;
                } else {
                    setError('Pass admin ne doit pas etre vide');
                    throw Error(
                        'mdpForCreateUser ne doit pas etre une chaine de caractere vide, ne doit pas être falsy'
                    );
                }

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





















// import React, { useState } from 'react';



// const SignIn = () => {
//     const [error, setError] = useState('');

//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();
//         const form = event.target;
//         if(!(form instanceof HTMLFormElement)) throw Error('le formulaire n\'est pas une instance de HTMLFormElement')
//         const formData = Object.fromEntries(new FormData(form));

    
    
//         if(formData.password && formData.verifyPassword && formData.email && formData.pseudo){
//             if(!(formData.verifyPassword === formData.password)) {
//                 setError('les mots de passes doivent être identiques');
//             }else if (formData.password === ''){
//                 setError('Il doit y avoir un mot de passe');
//             }else {
//                 setError('');
//                 const mdpForCreateUser = prompt('renseigne le mot de passe administrateur de creation de compte');
//                 if(mdpForCreateUser) formData.mdpForCreateUser = mdpForCreateUser; else  setError('Pass admin ne doit pas etre vide'); throw Error('PassAdmon ne doit pas etre une chaine de caractere vide, ne doit pas être falsy')
                
//                 console.log(formData);
//             };
//         }else setError('veuilllez Remplir tous les champs du formulaire !') //alert('les donnees du formulaire recuperes dans formData ne sont pas correct: formdata = {email: string, password: string, verifyPassword: string, pseudo: string} ')
    
//     }

    
//     return (
//         <div>
//             <h1>Sign In</h1>
//             <form method='POST' onSubmit={handleSubmit} >
//                 <input type="text" name="email" placeholder='email@exemple.com' />
//                 <input type="text" name="pseudo" placeholder='Pseudo...' />
//                 <input type="password" name="password" placeholder='password...' />
//                 <input type="password" name="verifyPassword" placeholder='verify password...' />
//                 <input type="submit" value="submit" />
//                 {error && <span> {error} </span>}
//             </form>
//         </div>
//     );
// };

// export default SignIn;