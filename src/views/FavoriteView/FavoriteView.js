import React from "react";
import List from "../../components/List/List";
import Unsplash from "unsplash-js";
import DowloadService from "../../services/DownloadService";

class FavoriteView extends React.Component {
  state = {
    favorites: [],
  };

  UNSAFE_componentWillMount = () => {
    this.setState({
      favorites: JSON.parse(localStorage.getItem("wallpaper")),
    });
  };

  loginInUnsplash = () => {
    return new Promise(function (resolve, reject) {
      resolve(
        new Unsplash({
          accessKey: process.env.REACT_APP_UNSPLASH_KEY,
        })
      );

      reject(console.error("Unsplash API not working"));
    });
  };

  downloadWallpaper = (photoId) => {
    this.loginInUnsplash().then((unsplash) => {
      unsplash.photos
        .getPhoto(photoId)
        .then((response) => response.json())
        .then((json) => {
          unsplash.photos.downloadPhoto(json);          

          DowloadService.downloadResource(json.urls.full)
        })
        .catch((error) => console.error("Rate Limit Exceeded"));;
    });
  };

  deleteFavorite = (id) => {
    const wallpapersFromLocalStorage = JSON.parse(
      localStorage.getItem("wallpaper")
    );

    if (wallpapersFromLocalStorage) {
      const wallpapers = wallpapersFromLocalStorage.filter((wallpaper) => {
        return wallpaper.id !== id;
      });

      localStorage.setItem("wallpaper", JSON.stringify(wallpapers));
      this.setState({
        favorites: wallpapers,
      });
    }
  };

  render() {
    return (
      <List items={this.state.favorites} downloadFn={this.downloadWallpaper} deleteFavoriteFn={this.deleteFavorite} />
    );
  }
}

export default FavoriteView;
