// Slider.js
import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import './styles_Slider.css'; // Import the CSS file

const Home_page_first_com = () => {
  useEffect(() => {
    const scrollRevealOption = {
      distance: '50px',
      origin: 'bottom',
      duration: 1000,
    };

    // Initialize ScrollReveal and reveal the elements
    ScrollReveal().reveal('.slider-section .container .letter-s', {
      duration: 1000,
      delay: 1000,
    });
    ScrollReveal().reveal('.slider-section .container img', {
      duration: 1000,
      delay: 1500,
    });
    ScrollReveal().reveal('.slider-section .container .text__left', {
      ...scrollRevealOption,
      origin: 'right',
      delay: 2000,
    });
    ScrollReveal().reveal('.slider-section .container .text__right', {
      ...scrollRevealOption,
      origin: 'left',
      delay: 2000,
    });
    ScrollReveal().reveal('.slider-section .container .explore', {
      duration: 1000,
      delay: 2500,
    });
    ScrollReveal().reveal('.slider-section .container h5', {
      duration: 1000,
      interval: 500,
      delay: 3000,
    });
    ScrollReveal().reveal('.slider-section .container .catalog', {
      duration: 1000,
      delay: 5000,
    });
    ScrollReveal().reveal('.slider-section .container .print', {
      duration: 1000,
      delay: 5500,
    });
    ScrollReveal().reveal('.slider-section .footer p', {
      duration: 1000,
      delay: 7000,
    });
  }, []);

  return (
    <div className='con'> 
      <div className="slider-section"> {/* Add this wrapper */}
      <div className="container">
        <div className="letter-s">S</div>
        <img src="./AllFiles_For_HomePage/header.png" alt="Slider" />
        <div className="text__left">Left Text</div>
        <div className="text__right">Right Text</div>
        <div className="explore">Explore More</div>
        <h5>Heading 5</h5>
        <div className="catalog">Catalog Section</div>
        <div className="print">Print Section</div>
        <footer>
          <p>Footer text</p>
        </footer>
      </div>
    </div>
    </div> 
  );
};

export default Home_page_first_com;
