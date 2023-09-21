import React, { useEffect, useState } from 'react';
import MangasComponent, { MangasType } from "../components/MangasComponent";
import { useApiError } from '../hooks/useApiErrorAndMessage';
import SearchbarComponent from '../components/SearchbarComponent';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { apiCreateBox, apiGetBoxs } from '../api/api';
export type formDataObjectType = {
    titre: FormDataEntryValue | null;
    lien: FormDataEntryValue | null;
    lien_image: FormDataEntryValue | null;
    numero_chapitre: number;
}

const MangasPage = () => {
    const [mangasList, setMangasList] = useState<MangasType[]>([]);
    const { error: errorMessage, setError: setErrorMessage } = useApiError();
    const [notification, setNotification] = useState<string[]>([]);
    const [searchState, setSearchState] = useState('');
    const queryClient = useQueryClient();


    const { isLoading, error, data: boxsDatas, refetch: refetchBoxs } = useQuery(['getMangas'], apiGetBoxs)

    useEffect(() => {
        loadMangasOfApi(); // Call your function here
    }, [boxsDatas]);

    const reloadMangasList = () => {
        queryClient.invalidateQueries(['getMangas']);
    };

    const setSearch = (value: string) => {
        setSearchState(value);
    }

    const loadMangasOfApi = () => {
        const arr = (!isLoading && boxsDatas) ? boxsDatas.data : [];
        setMangasList(arr);
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
            setErrorMessage('Invalid link URL')
            return;
        } else setErrorMessage('');

        if (!isValidImageLink) {
            console.error('Invalid image link URL');
            setErrorMessage('Invalid image link URL')
            return;
        } else setErrorMessage('');

        let arrForm = Array.from(form)
        arrForm.pop()
        arrForm.forEach((el) => {
            if (el instanceof HTMLInputElement) {
                el.value = '';
            }
        })
        createBoxApi(formDataObject);
    };

    const createBoxApi = async (formData: formDataObjectType) => {
        try {
            // const { response, data } = await apiCreateBox(formData)

            apiCreateBox(formData)
                .then((res) => {
                    const { response, data } = res;
                    if (!response.ok) {
                        setErrorMessage(data.error);
                    }

                    refetchBoxs().then((res) => {
                        if (!res.error && res.data?.data) {
                            loadMangasOfApi();
                        }

                    });
                    
                    setNotification((curr) => [...curr, 'ajouté avec succès !']);
                })
        } catch (error) {
            console.error(error);
            setErrorMessage('Erreur de communication avec le serveur')
        }
    }

    return (
        <>
            {
                notification.length > 0 && (
                    <div className="notification">
                        {
                            notification.map((message, index) => {
                                return <p key={index}>{message}</p>
                            })
                        }
                    </div>
                )
            }
            <SearchbarComponent setSearchState={setSearch} />
            <button type="button" onClick={() => {
                refetchBoxs().then((res) => {
                    if (!res.error && res.data?.data) {
                        loadMangasOfApi();
                    }
                    setTimeout(() => {
                        const obj = { id_box: 600, titre: 'string', lien: 'http://test.com', lien_image: 'http://test.com/img.jpg', numero_chapitre: 132456 }
                        setMangasList((curr) => [obj, ...curr])

                    }, 500);

                });
            }} >mangas list log</button>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="titre..." name="titre" />
                <input type="text" placeholder="lien..." name="lien" />
                <input type="text" placeholder="https://domaine.com/image.jpg..." name="lien_image" />
                <input type="number" placeholder="numero chapitre..." name="numero_chapitre" />
                <input type="submit" defaultValue="Submit" />
            </form>
            {errorMessage && <p id="error"> {errorMessage} </p>}
            <div id='container'>
                {
                    isLoading ? <img src="/loading.gif" alt="loading..." /> : mangasList && !error ? mangasList.map((manga, key) => (
                        manga.titre.trim().toLocaleLowerCase().match(searchState.toLocaleLowerCase().trim()) &&
                            <MangasComponent
                                {...manga}
                                key={mangasList.length - key}
                                reloadMangasList={reloadMangasList}
                                setNotification={setNotification}
                            />

                    ))
                        : 'Erreur lors du chargement des donnees avec le serveur'
                }
            </div>
        </>
    );
};

export default MangasPage;