import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

export default function NavBar(): JSX.Element {
  return (
    <nav className={styles.nav}>
      <div className={styles.linkHomeLogoContainer}>
        {/* Этот NavLink теперь обертывает только фоновую картинку */}
        <NavLink className={styles.linkHome} to="/">
          <div className={styles.logoImage} />
        </NavLink>
        {/* ... остальной контент логотипа ... */}
      </div>
      <div className={styles.linkContainer}>
        <NavLink className={styles.link} to="/pizzas">
          All Pizzas
        </NavLink>
        <NavLink className={styles.link} to="/pizza_type">
          Pizza Types
        </NavLink>
        <NavLink className={styles.link} to="/pizza_size">
          Pizza Sizes
        </NavLink>
        <NavLink className={styles.link} to="/ingredients">
          Ingredients
        </NavLink>
      </div>
    </nav>
  );
}
