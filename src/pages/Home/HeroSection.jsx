import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTelegram } from "@fortawesome/free-brands-svg-icons"; // Import Facebook and Telegram icons

export default function HeroSection() {
  return (
    <section id="heroSection" className="hero--section">
      <div className="hero--section--content--box">
        <div className="hero--section-content">
          <p className="section-title">Hey, I'm Panhwat</p>
          <h1 className="hero--section--title">
            <span className="hero--section-title-color">Full Stack</span>
            <br />
            Developer
          </h1>
          <p className="hero-section-description">
             I like to learn new Tecnology
            <br />
            and researching 
          </p>
          {/* Add Facebook and Telegram icons */}
          <div className="social-icons">
            <a href="https://www.facebook.com/your-facebook-page">
              <FontAwesomeIcon icon={faFacebook} className="facebook-icon" />
            </a>
            <a href="https://t.me/Wat2025">
              <FontAwesomeIcon icon={faTelegram} className="telegram-icon" />
            </a>
          </div>
        </div>
        <button className="btn btn-primary">Get In Touch</button>
      </div>
      <div className="hero--section--img">
        <img src="/image/Wat DR.png" alt="Hero Section" />
      </div>
    </section>
  );
}