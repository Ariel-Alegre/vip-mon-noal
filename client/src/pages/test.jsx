import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { xml2js } from 'xml-js';

const CorreosApiResponse = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://counter11.optistats.ovh/private/counter.js?c=pmrqssl8b8sd599m8xg8ejen6t1zl5jj&down=async';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div id="sfcpmrqssl8b8sd599m8xg8ejen6t1zl5jj">
    <a href="https://www.contadorvisitasgratis.com" title="contador de visitas">
      <img src="https://counter11.optistats.ovh/private/contadorvisitasgratis.php?c=pmrqssl8b8sd599m8xg8ejen6t1zl5jj" title="contador de visitas" alt="contador de visitas" />
    </a>
  </div>
  );
};

export default CorreosApiResponse;
