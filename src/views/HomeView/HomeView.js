import React from "react";
import List from "../../components/List/List";
import Form from "../../components/Form/Form";
import Unsplash from "unsplash-js";
import DowloadService from "../../services/DownloadService";

class HomeView extends React.Component {
  state = {
    wallpapers: [],
    favorites: [],
    favoritesIds: [],
  };

  UNSAFE_componentWillMount = () => {
    const favorites = JSON.parse(localStorage.getItem("wallpaper"));
    const favoritesIds = [];

    favorites.forEach((item) => {
      favoritesIds.push(item.id);
    });

    this.setState({
      favorites: favorites,
      favoritesIds: favoritesIds,
    });
  };

  searchWallpaper = (searchElemets, e) => {
    if (typeof e !== "undefined") {
      e.preventDefault();
    }

    let keyword = "";

    this.setState(() => ({
      wallpapers: [],
    }));

    Object.keys(searchElemets).forEach((key) => {
      if (searchElemets[key] !== "") {
        keyword += searchElemets[key] + " ";
      }
    });
    this.getWallpaperFromAPI(keyword);
  };

  loginInUnsplash = () => {
    return new Promise(function (resolve, reject) {
      resolve(
        new Unsplash({
          accessKey: process.env.REACT_APP_UNSPLASH_KEY,
        })
      );
    });
  };

  getWallpaperFromAPI = (keyword) => {
    this.loginInUnsplash().then((unsplash) => {
      unsplash.photos
        .getRandomPhoto({
          query: keyword,
          count: 9,
          orientation: "landscape",
          featured: true,
        })
        .then((response) => response.json())
        .then((json) => {
          if (!json.errors) {
            json.forEach((item) => {
              this.setState((prevState) => ({
                wallpapers: [
                  {
                    id: item.id,
                    full: item.urls.full,
                    thumb: item.urls.regular,
                    keyword: keyword,
                    author: item.user.name,
                  },
                  ...prevState.wallpapers,
                ],
              }));
            });
          } else {
            console.error(json.errors);
          }
        })
        .catch((error) => console.error("Rate Limit Exceeded"));
    });
  };

  downloadWallpaper = (photoId) => {
    this.loginInUnsplash().then((unsplash) => {
      unsplash.photos
        .getPhoto(photoId)
        .then((response) => response.json())
        .then((json) => {
          unsplash.photos.downloadPhoto(json);

          DowloadService.downloadResource(json.urls.full);
        })
        .catch((error) => console.error("Rate Limit Exceeded"));;
    });
  };

  addFavorite = (photoId) => {
    let favorite = this.state.favorites;

    const wallpaper = this.state.wallpapers.filter((wallpaper) => {
      return wallpaper.id === photoId;
    });

    const existWallpaper = favorite.filter((favorite) => {
      return favorite.id === wallpaper[0].id;
    });

    if (!existWallpaper.length) {
      favorite = [...wallpaper, ...favorite];
    }

    localStorage.setItem("wallpaper", JSON.stringify(favorite));
    this.setState((prevState) => ({
      favorites: favorite,
      favoritesIds: [photoId, ...prevState.favoritesIds],
    }));
  };

  render() {
    return (
      <>
        <Form submitFn={this.searchWallpaper} />
        <List
          items={this.state.wallpapers}
          favoritesIds={this.state.favoritesIds}
          downloadFn={this.downloadWallpaper}
          addFavoriteFn={this.addFavorite}
        />
      </>
    );
  }
}

export default HomeView;
