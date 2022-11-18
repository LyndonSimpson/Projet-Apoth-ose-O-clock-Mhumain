import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './faqstyles.scss';
import MobileNav from '../Header/MobileNav/MobileNav';

function FAQ() {
  const type = localStorage.getItem('type');
  return (
    <div className="faq-styles">
      <Header
        type={type}
      />
      <div>
        <div className="faq">
          <h2 className="faq-question">Lorem, ipsum dolor sit amet consectetur adipisicing elit ?</h2>
          <p className="faq-resonse">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non ipsa
            aliquid vitae repellendus eveniet temporibus exercitationem voluptatem magni deleniti! Magnam repellendus quae minima magni
            voluptates
            quis necessitatibus,
            incidunt perferendis amet!
          </p>
        </div>
        <div className="faq">
          <h2 className="faq-question">Lorem, ipsum dolor sit amet consectetur adipisicing elit ?</h2>
          <p className="faq-resonse">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non ipsa
            aliquid vitae repellendus eveniet temporibus exercitationem voluptatem magni deleniti! Magnam repellendus quae minima magni
            voluptates
            quis necessitatibus,
            incidunt perferendis amet!
          </p>
        </div>
        <div className="faq">
          <h2 className="faq-question">Lorem, ipsum dolor sit amet consectetur adipisicing elit ?</h2>
          <p className="faq-resonse">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non ipsa
            aliquid vitae repellendus eveniet temporibus exercitationem voluptatem magni deleniti! Magnam repellendus quae minima magni
            voluptates
            quis necessitatibus,
            incidunt perferendis amet!
          </p>
        </div>
        <div className="faq">
          <h2 className="faq-question">Lorem, ipsum dolor sit amet consectetur adipisicing elit ?</h2>
          <p className="faq-resonse">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non ipsa
            aliquid vitae repellendus eveniet temporibus exercitationem voluptatem magni deleniti! Magnam repellendus quae minima magni
            voluptates
            quis necessitatibus,
            incidunt perferendis amet!
          </p>
        </div>
        <div className="faq">
          <h2 className="faq-question">Lorem, ipsum dolor sit amet consectetur adipisicing elit ?</h2>
          <p className="faq-resonse">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non ipsa
            aliquid vitae repellendus eveniet temporibus exercitationem voluptatem magni deleniti! Magnam repellendus quae minima magni
            voluptates
            quis necessitatibus,
            incidunt perferendis amet!
          </p>
        </div>

      </div>
      <Footer />

      <MobileNav
        type={type}
      />
    </div>
  );
}

export default React.memo(FAQ);
