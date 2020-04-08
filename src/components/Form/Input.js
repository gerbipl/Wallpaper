import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.scss";

const Input = ({ type, name, label, maxLength, ...props }) => (
  <div className={type !== "hidden" ? styles.formItem : null}>
    <input
      className={styles.input}
      type={type}
      name={name}
      id={name}
      {...props}
    />
    <label className={styles.label} htmlFor={name}>
      {label}
    </label>
    <div className={styles.formItemBar} />
  </div>
);

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
};

Input.defaultProps = {
  type: "text",
  maxLength: 200,
};

export default Input;
