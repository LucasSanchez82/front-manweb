import React, { useState } from 'react';
import MangasComponent, { MangasType } from "../components/MangasComponent";

const MangasPage = () => {
    const [mangasList, setMangasList] = useState<MangasType[]>([]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (!(form instanceof HTMLFormElement)) throw Error('Error, form is not an instance of HTMLFormElement');


        const formData = new FormData(form);
        const formDataObject = {
            title: formData.get('title'),
            link: formData.get('link'),
            linkImage: formData.get('linkImage'),
            chapter: formData.get('chapter'),
        }
        if(!(typeof formDataObject.title === 'string'
            && typeof formDataObject.link ==='string'
            && typeof formDataObject.linkImage ==='string'
            && typeof formDataObject.chapter ==='string')) throw Error('Les types recu par le formulaire ne sont pas bons')
        

        const mangas: MangasType = {
            title: formDataObject.title,
            link: formDataObject.link,
            linkImage: formDataObject.linkImage,
            chapter: parseInt(formDataObject.chapter),
        };


        // setMangasList([...mangasList, mangas]);
        setMangasList((curr) => ([...curr, mangas]));
        
        
        console.log(mangasList);
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="title..." name="title" />
                <input type="text" placeholder="link..." name="link" />
                <input type="text" placeholder="linkImage..." name="linkImage" />
                <input type="number" placeholder="chapter..." name="chapter" />
                <input type="submit" value="Submit" />
            </form>

            <div id='mangasContainer'>
                {
                    mangasList.map((manga, key) => (
                        <MangasComponent {...manga} key={key} />
                    ))
                }
            </div>
        </>
    );
};

export default MangasPage;
