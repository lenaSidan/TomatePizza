import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home(): JSX.Element {
  return (
    <div className={styles.containerHome}>
      <div className={styles.containerText}>
        <div className={styles.box}>
          <div className={`${styles.text} ${styles.centeredText}`}>
            <p>
              <Link to="/pizzas" className={styles.linkStyle}>
                <h2>Pizzas </h2>
              </Link>
            </p>
          </div>
          <div className={`${styles.text} ${styles.centeredText}`}>
            <p>
              <Link to="/pizza-types" className={styles.linkStyle}>
                <h2>Pizza Types —</h2>
              </Link>
            </p>
          </div>
          <div className={`${styles.text} ${styles.centeredText}`}>
            <p>
              <Link to="/pizza-sizes" className={styles.linkStyle}>
                <h2>Pizza Sizes —</h2>
              </Link>
            </p>
          </div>
          <div className={`${styles.text} ${styles.centeredText}`}>
            <p>
              <Link to="/ingredients" className={styles.linkStyle}>
                <h2>Ingredients —</h2>
              </Link>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
