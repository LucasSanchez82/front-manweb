import React, { useEffect, useState } from 'react';
import MangasComponent, { MangasType } from "../components/MangasComponent";
type formDataObjectType = {
    titre: FormDataEntryValue | null;
    lien: FormDataEntryValue | null;
    lien_image: FormDataEntryValue | null;
    numero_chapitre: number;
}

const MangasPage = () => {
    const [mangasList, setMangasList] = useState<MangasType[]>([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        whenLoaded(); // Call your function here
    }, []);

    const whenLoaded = async () => {
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
                console.log('--ca n a aps marche--');
                
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
        console.log(formData);
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
                console.log(data.item);
                if (isMangasType(data.item)) setMangasList((curr) => [data.item, ...curr]);

            }
        } catch (error) {
            console.error(error);
            setError('Erreur de communication avec le serveur')
        }


    }


    const isMangasType = (obj: any): obj is MangasType => {
        return (
            typeof obj === 'object' &&
            'titre' in obj &&
            'lien' in obj &&
            'lien_image' in obj &&
            'numero_chapitre' in obj
        );
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
            {error && <span id="error"> {error} </span>}
            {message && <span id="error"> {message} </span>}
            <div id='mangasContainer'>
                {
                    mangasList.map((manga, key) => (
                        <MangasComponent
                            {...manga}
                            key={key}
                        />
                    ))
                }
            </div>
        </>
    );
};

export default MangasPage;




// import React, { useState } from 'react';
// import MangasComponent, { MangasType } from "../components/MangasComponent";

// const MangasPage = () => {
//     const [mangasList, setMangasList] = useState<MangasType[]>([]);
//     const [error, setError] = useState('');

//     // const handleSubmit = (event: React.FormEvent) => {
//     //     event.preventDefault();

//     //     const form = event.currentTarget;
//     //     if (!(form instanceof HTMLFormElement)) throw Error('Error, form is not an instance of HTMLFormElement');


//     //     const formData = new FormData(form);
//     //     const formDataObject = {
//     //         title: formData.get('title'),
//     //         link: formData.get('link'),
//     //         linkImage: formData.get('linkImage'),
//     //         chapter: formData.get('chapter'),
//     //     }
//     //     if(!(typeof formDataObject.title === 'string'
//     //         && typeof formDataObject.link ==='string'
//     //         && typeof formDataObject.linkImage ==='string'
//     //         && typeof formDataObject.chapter ==='string')) throw Error('Les types recu par le formulaire ne sont pas bons')


//     //     const mangas: MangasType = {
//     //         title: formDataObject.title,
//     //         link: formDataObject.link,
//     //         linkImage: formDataObject.linkImage,
//     //         chapter: parseInt(formDataObject.chapter),
//     //     };


//     //     // setMangasList([...mangasList, mangas]);
//     //     setMangasList((curr) => ([...curr, mangas]));


//     //     console.log(mangasList);
//     // };

//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();

//         const form = event.currentTarget;
//         if (!(form instanceof HTMLFormElement)) throw Error('Error, form is not an instance of HTMLFormElement');

//         const formData = new FormData(form);
//         const formDataObject = {
//             title: formData.get('title'),
//             link: formData.get('link'),
//             linkImage: formData.get('linkImage'),
//             chapter: formData.get('chapter'),
//         }

//         if (
//             typeof formDataObject.title !== 'string' ||
//             typeof formDataObject.link !== 'string' ||
//             typeof formDataObject.linkImage !== 'string' ||
//             typeof formDataObject.chapter !== 'string'
//         ) {
//             throw Error('Les types recu par le formulaire ne sont pas bons');
//         }

//         // Validate URLs
//         const isValidLink = /^(http|https):\/\/[^ "]+$/.test(formDataObject.link);
//         const isValidImageLink = /^(http|https):\/\/[^ "]+$/.test(formDataObject.linkImage);

//         if (!isValidLink) {
//             console.error('Invalid link URL');
//             setError('Invalid link URL')
//             return;
//         } else setError('');

//         if (!isValidImageLink) {
//             console.error('Invalid image link URL');
//             setError('Invalid image link URL')
//             return;
//         } else setError('');

//         const mangas: MangasType = {
//             title: formDataObject.title,
//             link: formDataObject.link,
//             linkImage: formDataObject.linkImage,
//             chapter: parseInt(formDataObject.chapter),
//         };

//         setMangasList((curr) => ([...curr, mangas]));

//         console.log(mangasList);
//     };
//     const handleMangaUpdate = (index: number, newChapter: number) => {
//         setMangasList((prevList) => {
//             const updatedList = [...prevList];
//             updatedList[index] = { ...updatedList[index], chapter: newChapter };
//             return updatedList;
//         });
//     };


//     return (
//         <>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" placeholder="titre..." name="titre" />
//                 <input type="text" placeholder="lien..." name="lien" />
//                 <input type="text" placeholder="https://domaine.com/image.jpg..." name="lien_image" />
//                 <input type="number" placeholder="numero chapitre..." name="numero_chapitre" />
//                 <input type="submit" defaultValue="Submit" />
//             </form>
//             {error && <span id="error"> {error} </span>}
//             <div id='mangasContainer'>
//                 {
//                     mangasList.map((manga, key) => (
//                         <MangasComponent
//                             {...manga}
//                             key={key}
//                             updateManga={(newChapter) => handleMangaUpdate(key, newChapter)}
//                         />
//                     ))
//                 }
//             </div>
//         </>
//     );
// };

// export default MangasPage;
