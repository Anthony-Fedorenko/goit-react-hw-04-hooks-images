import style from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({srcWebformat, onClick}) => {
    return (
        <li className={style.ImageGalleryItem} onClick={onClick}>
            <img src={srcWebformat} alt="" className={style.ImageGalleryItemImage}/>
        </li>
    );
};

export default ImageGalleryItem