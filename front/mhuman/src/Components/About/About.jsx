import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './aboutstyles.scss';
import Cats from '../../styles/cats.jpg';
import Cat from '../../styles/catInArms.jpg';
import MobileNav from '../Header/MobileNav/MobileNav';

function About() {
  const type = localStorage.getItem('type');
  return (
    <div className="about-styles">
      <Header />
      <div>
        <img className="about-image-cats" alt="Some Cats" src={Cats} />
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non ipsa
          aliquid vitae repellendus eveniet temporibus exercitationem voluptatem magni deleniti! Magnam repellendus quae minima magni
          voluptates
          quis necessitatibus,
          incidunt perferendis amet!
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non ipsa
          aliquid vitae repellendus eveniet temporibus exercitationem voluptatem magni deleniti! Magnam repellendus quae minima magni
          voluptates
          quis necessitatibus,
          incidunt perferendis amet!
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non ipsa
          aliquid vitae repellendus eveniet temporibus exercitationem voluptatem magni deleniti! Magnam repellendus quae minima magni
          voluptates
          quis necessitatibus,
          incidunt perferendis amet!
        </p>
        <img className="about-image" alt="One cat in woman arms" src={Cat} />
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non ipsa
          aliquid vitae repellendus eveniet temporibus exercitationem voluptatem magni deleniti! Magnam repellendus quae minima magni
          voluptates
          quis necessitatibus,
          incidunt perferendis amet!
        </p>
      </div>
      <Footer />
      <MobileNav
        type={type}
      />
    </div>
  );
}

export default React.memo(About);
