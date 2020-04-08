import React from "react";
import styles from "./Form.module.scss";
import Input from "./Input";
import Button from "../Button/Button";
import Geocode from "react-geocode";

class Form extends React.Component {
  state = {
    keyword: "",
    city: "",
    season: "",
  };

  UNSAFE_componentWillMount = () => {
    this.getCity();
    this.setState({
      season: this.getSeason(),
    });
  };

  getSeason = () => {
    const month = new Date().getMonth();
    let season = "";
    switch (month) {
      case 12:
      case 1:
      case 2:
        season = "winter";
        break;
      case 3:
      case 4:
      case 5:
        season = "spring";
        break;
      case 6:
      case 7:
      case 8:
        season = "summer";
        break;
      case 9:
      case 10:
      case 11:
        season = "fall";
        break;
      default:
        season = "";
        break;
    }

    return season;
  };

  getCity = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        this.getCityFromGoogle(coords.latitude, coords.longitude);
      });
    }
  };

  getCityFromGoogle = (lat, lng) => {
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);
    Geocode.setLanguage("en");
    Geocode.setRegion("pl");
    // Geocode.enableDebug();

    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        this.setState({
          city: response.results[0].address_components[1].long_name,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  handleIntpuChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { keyword, city, season } = this.state;

    return (
      <div className={styles.wrapper}>
        <form
          autoComplete="off"
          className={styles.form}
          onSubmit={(e) => this.props.submitFn(this.state, e)}
        >
          <Input
            onChange={this.handleIntpuChange}
            value={keyword}
            name="keyword"
            label="Keyword"
          />
          <Input
            onChange={this.handleIntpuChange}
            value={city}
            name="city"
            label="City"
          />
          <Input
            onChange={this.handleIntpuChange}
            value={season}
            name="season"
            label="Season"
          />
          <Button secondary>Search</Button>
        </form>
      </div>
    );
  }
}

export default Form;
