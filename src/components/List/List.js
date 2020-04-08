import React from "react";
import ListItem from "./ListItem";
import Title from "../Title/Title";
import styles from "./List.module.scss";

const List = ({ items, ...props }) => (
  <>
    {items.length ? (
      <ul className={styles.wrapper}>
        {items.map((item) => (
          <ListItem key={item.id} {...props} {...item} />
        ))}
      </ul>
    ) : (
      <Title>There`s nothing here yet, please add some item!</Title>
    )}
  </>
);

export default List;
