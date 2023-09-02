import React from 'react';

export type MangasType = {
    titre: string;
    lien: string;
    lien_image: string;
    numero_chapitre: number;
};

// type MangasComponentProps = MangasType & {
//     updateManga: (newChapter: number) => void;
// };

const MangasComponent: React.FC<MangasType> = ({ titre, lien, lien_image, numero_chapitre }) => {
    // const handleChapterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const newChapter = parseInt(event.target.value);
    //     updateManga(newChapter);
    // };

    return (
        <div className='manga'>
            <a href={lien} target="_blank">
                <h3> {titre || 'no title'} </h3>
                <div className="mangaImage" style={{backgroundImage: `url("${lien_image}")`}} ></div>
                <input
                    type="number"
                    value={numero_chapitre}
                    // onChange={handleChapterChange}
                />
            </a>
        </div>
    );
};

export default MangasComponent;
