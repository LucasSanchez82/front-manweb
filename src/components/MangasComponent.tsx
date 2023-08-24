export type MangasType = {
    title: string;
    link: string;
    linkImage: string;
    chapter: number;
}

const MangasComponent = ({ title, link, linkImage, chapter }: MangasType) => {
    return (
        <div className='manga'>
            <a href={link} target="_blank">
                <h3> {title || 'no title'} </h3>
                <div className="mangaImage" style={{backgroundImage: `url("${linkImage}")`}} ></div>
                <input type="number" value={chapter} />
            </a>
        </div>
    );
};

export default MangasComponent;