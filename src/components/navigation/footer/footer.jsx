import React from 'react';
import './footer.css'
import '../footer/reset-style.css'


function Footer() {
  return (
    <footer className='text-white text-center fixed-bottom footer-style'> 
      <div className='p-2 fs-6 lastRow'>
        &copy; {new Date().getFullYear()} Copyright: Stack-IT 
        <h5 className='p-2 fs-6'> 
          Contacto | Términos  | Privacidad 
        </h5> 
      </div>
    </footer>
  );
}

export default Footer; 