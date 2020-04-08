import React from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import styles from "./Image.module.scss";

const Image = ({
  id,
  thumb,
  author,
  keyword,
  favoritesIds,
  downloadFn,
  addFavoriteFn,
  deleteFavoriteFn,
}) => (
  <div className={styles.wrapper}>
    <div className={styles.imgWrapper}>
      <img className={styles.wallpaper} src={thumb} alt={id} author={author} />
      <div className={styles.buttonWrapper}>
        {(addFavoriteFn !== undefined && favoritesIds.indexOf(id) === -1) && (
          <Button Fn={() => addFavoriteFn(id)}>Add Favorite {}</Button>
        )}
        {deleteFavoriteFn && (
          <Button Fn={() => deleteFavoriteFn(id)}>Delete Favorite</Button>
        )}
        <Button Fn={() => downloadFn(id)}>Download</Button>
      </div>
    </div>
    {deleteFavoriteFn && <span>Keyword: {keyword}</span>}
    <span className={styles.author}>{author}</span>
  </div>
);

Image.propTypes = {
  id: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  favoritesIds: PropTypes.array,
  downloadFn: PropTypes.func.isRequired,
  addFavoriteFn: PropTypes.func,
  deleteFavoriteFn: PropTypes.func,
};

Image.defaultProps = {
  favoritesIds: [],
}

export default Image;
