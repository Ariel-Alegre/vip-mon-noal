import React, { useEffect } from 'react';
import styles from './CounterVisit.module.css'

const CounterVisit = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="sfcpmrqssl8b8sd599m8xg8ejen6t1zl5jj" className={styles.counter}>
      <label href="https://www.contadorvisitasgratis.com" title="contador de visitas" disabled>
        <img disabled src="https://counter11.optistats.ovh/private/contadorvisitasgratis.php?c=pmrqssl8b8sd599m8xg8ejen6t1zl5jj" border="0" title="contador de visitas" alt="contador de visitas" />
      </label>
    </div>
  );
};

export default CounterVisit;