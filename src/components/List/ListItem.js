import React from "react";
import Image from "../Image/Image";
import styles from "./ListItem.module.scss";

const ListItem = (props) => (
  <li className={styles.wrapper}>
    <Image {...props} />
  </li>
);

export default ListItem;
