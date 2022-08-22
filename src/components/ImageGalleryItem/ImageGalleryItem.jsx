import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ images }) => {
  return images.map(({ id, src, alt }) => {
    return (
      <li className={ImageGalleryItem} key={id}>
        <img
          className={ImageGalleryItemImage}
          src={src}
          alt={alt}
          data-id={id}
        />
      </li>
    );
  });
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    alr: PropTypes.string.isRequired,
  }),
  ),
}
