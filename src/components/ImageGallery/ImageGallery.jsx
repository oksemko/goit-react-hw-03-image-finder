import PropTypes from 'prop-types';

import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';


export const ImageGallery = ({ data, onClick }) => {
  const imageClick = event => {
    if (event.target.nodeName !== 'IMG') {
      return;
    }

    onClick(Number(event.target.dataset.id));
  }

  return (
    <>
      <ul className={ImageGallery} onClick={imageClick}>
        <ImageGalleryItem images={data} />
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired),
};
