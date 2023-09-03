import React, { useEffect, useState } from 'react';
import MangasComponent, { MangasType } from "../components/MangasComponent";
import { useApiError, useApiMessage } from '../hooks/useApiErrorAndMessage';
type formDataObjectType = {
    titre: FormDataEntryValue | null;
    lien: FormDataEntryValue | null;
    lien_image: FormDataEntryValue | null;
    numero_chapitre: number;
}

const MangasPage = () => {
    const [mangasList, setMangasList] = useState<MangasType[]>([]);
    const {error, setError} = useApiError();
    const {message, setMessage} = useApiMessage();

    useEffect(() => {
        loadMangasOfApi(); // Call your function here
    }, []);
    const reloadMangasList = () => {
        loadMangasOfApi();
    };
    

    const loadMangasOfApi = async () => {
        try {
            const response = await fetch('http://localhost:3000/boxs', {
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const dataJson = await response.json();
            if (!response.ok) {
                setError(dataJson.error)
                
            } else if (response.ok) {

                setMangasList(dataJson);
                
            }
            
        } catch (error) {
            console.error(error)
        }
    }
    


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (!(form instanceof HTMLFormElement)) throw Error('Error, form is not an instance of HTMLFormElement');

        const formData = new FormData(form);
        let chap = formData.get('numero_chapitre');
        chap = typeof chap === 'string' ? chap : '0'
        const formDataObject = {
            titre: formData.get('titre'),
            lien: formData.get('lien'),
            lien_image: formData.get('lien_image'),
            numero_chapitre: parseInt(chap) || 0,
        }

        if (
            typeof formDataObject.titre !== 'string' ||
            typeof formDataObject.lien !== 'string' ||
            typeof formDataObject.lien_image !== 'string' ||
            typeof formDataObject.numero_chapitre !== 'number'
        ) {
            throw Error('Les types recu par le formulaire ne sont pas bons');
        }

        // Validate URLs
        const isValidLink = /^(http|https):\/\/[^ "]+$/.test(formDataObject.lien);
        const isValidImageLink = /^(http|https):\/\/[^ "]+$/.test(formDataObject.lien_image);

        if (!isValidLink) {
            console.error('Invalid link URL');
            setError('Invalid link URL')
            return;
        } else setError('');

        if (!isValidImageLink) {
            console.error('Invalid image link URL');
            setError('Invalid image link URL')
            return;
        } else setError('');
        createBoxApi(formDataObject)




    };

    const createBoxApi = async (formData: formDataObjectType) => {
        try {
            const response = await fetch('http://localhost:3000/boxs/', {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json();
            if (!response.ok) {
                setError(data.error);

            } else if (response.ok) {
                setMessage(data.message)
                reloadMangasList();

            }
        } catch (error) {
            console.error(error);
            setError('Erreur de communication avec le serveur')
        }


    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="titre..." name="titre" />
                <input type="text" placeholder="lien..." name="lien" />
                <input type="text" placeholder="https://domaine.com/image.jpg..." name="lien_image" />
                <input type="number" placeholder="numero chapitre..." name="numero_chapitre" />
                <input type="submit" defaultValue="Submit" />
            </form>
            {error && <p id="error"> {error} </p>}
            {message && <p id="error"> {message} </p>}
            <div id='container'>
                {
                    mangasList.map((manga, key) => (
                        <MangasComponent
                            {...manga}
                            key={key}
                            reloadMangasList={reloadMangasList}
                        />
                    ))
                }
            </div>
        </>
    );
};

export default MangasPage;