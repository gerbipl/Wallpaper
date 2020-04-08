import React from 'react';
import HeaderNavigation from './HeaderNavigation';
import styles from './Header.module.scss';

const Header = ({ createFormToAddProductFn, openSettingFn }) => (
  <header className={styles.wrapper}>
    <h1>Wallpaper</h1>
    <HeaderNavigation />
  </header>
);

export default Header;