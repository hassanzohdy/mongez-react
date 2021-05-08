import React from 'react';
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

export default function ImagesPopup({ open, onClose, images, index = 0, zoom = 0.3, ...otherProps }) {
    const [, openImages] = React.useState(open);

    React.useEffect(() => {
        openImages(open);
    }, [open]);

    const closeImages = () => {
        openImages(false);
        onClose();
    }

    if (! open) return null;

    return (
        <>
            <Lightbox onClose={closeImages} zoom={zoom} startIndex={index} images={images} {...otherProps}></Lightbox>
        </>
    )
}