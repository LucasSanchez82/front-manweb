import React from 'react';

const apiDeleteBox = async (id_box: number) => {
    await fetch(import.meta.env.VITE_REACT_API_URL + '/boxs/', {
        credentials: 'include',
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_box: id_box
        })
    })
}

const apiUpdateChapitre = async (id_box: number, input: HTMLInputElement) => {
    await fetch(import.meta.env.VITE_REACT_API_URL + '/boxs', {
        credentials: 'include',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id_box: id_box,
            new_numero_chapitre: parseInt(input.value),
        })
    })
}

const apiLogout = async () => {
    await fetch(import.meta.env.VITE_REACT_API_URL + '/logout', {
        credentials: 'include',
        method: 'POST'
    })
}

const apiCheckAuth = async () => {
    const response = await fetch(import.meta.env.VITE_REACT_API_URL + '/utilisateurs/isLogin', {
        credentials: 'include',
        method: 'GET'
    });

    const { isLogin } = await response.json();
    if (!(isLogin instanceof Boolean)) throw Error('Server return bad type for isLogin');

    return {
        isLogin: isLogin
    };

};

const apiGetUtilisateur = async () => {
    return fetch(import.meta.env.VITE_REACT_API_URL + '/utilisateurs/isLogin', {
        credentials: 'include',
        method: 'GET'
    })
    .then(response => response.json())
    
}


const apiConfirmEmail = async (idUtilisateur: number, token: string) => {
    let response = await fetch(import.meta.env.VITE_REACT_API_URL + '/utilisateurs/signin/verify', {
        credentials: 'include',
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({idUtilisateur, token}),
    })

    let data = await response.json(); // { error }

    return data;
}

// const apiLogin = async () => {
//     const response = await fetch( import.meta.env.VITE_REACT_API_URL + '/utilisateurs/login', {
//         credentials: "include",
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(formData)
//     })
//     if (!response.ok) {
//         const data = await response.json();
//         setError(data.error);
        
//     } else if (response.ok) {
//         const json = await response.json();
//         setMessage(json.message);
//         navigate('/');
//     }
// }


export {
    apiDeleteBox,
    apiUpdateChapitre,
    apiLogout,
    apiCheckAuth,
    apiConfirmEmail,
    apiGetUtilisateur,
}