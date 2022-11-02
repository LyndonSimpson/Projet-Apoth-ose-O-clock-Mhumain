import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './homepage.scss';

function HomePage() {
  return (
    <div className="homepage">
      <Header />
      <section className="homeContent">
        <p>Hello</p>
      </section>
      <Footer />
    </div>
  );
}

export default React.memo(HomePage);
