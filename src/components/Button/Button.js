import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({ Fn, secondary, children }) => (
  <button className={secondary ? styles.secondary : styles.button} onClick={Fn}>
    {children}
  </button>
);

Button.propTypes = {
  Fn: PropTypes.func,
  secondary: PropTypes.bool,
  children: PropTypes.string.isRequired,
};

export default Button;
