import React, { useState, useRef } from "react";
import Header from "./Header";
import "./styles.css";

const reviews = [
  {
    text: "I really love how simple and motivating this tracker is! It helps me stay hydrated every single day.",
    name: "Emily Johnson",
  },
  {
    text: "This app keeps me accountable and makes tracking water fun.",
    name: "Michael Smith",
  },
  {
    text: "I never forget to drink water thanks to this easy-to-use tracker.",
    name: "Sarah Lee",
  },
];

function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const startX = useRef(null);
  const isDragging = useRef(false);

  // Свайпы (для отзывов)
  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    isDragging.current = true;
  };
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const diff = startX.current - e.clientX;
    if (diff > 50 && activeIndex < reviews.length - 1) {
      setActiveIndex((prev) => prev + 1);
      isDragging.current = false;
    } else if (diff < -50 && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
      isDragging.current = false;
    }
  };
  const handleMouseUp = () => (isDragging.current = false);
  const handleMouseLeave = () => (isDragging.current = false);
  const handleTouchStart = (e) => (startX.current = e.touches[0].clientX);
  const handleTouchMove = (e) => {
    const diff = startX.current - e.touches[0].clientX;
    if (diff > 50 && activeIndex < reviews.length - 1) {
      setActiveIndex((prev) => prev + 1);
      startX.current = e.touches[0].clientX;
    } else if (diff < -50 && activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
      startX.current = e.touches[0].clientX;
    }
  };

  
  const goal = 2000; 
  const [current, setCurrent] = useState(150); 

  const progress = Math.min((current / goal) * 100, 100);

  const addWater = () => {
    setCurrent((prev) => Math.min(prev + 150, goal));
  };

  return (
    <div className="landing">
      {/* 1️⃣ Welcome */}
      <section className="page page1">
        <Header />
        <main className="hero">
          <h1>Stay on the wave of hydration</h1>
          <p>Track your daily water intake easily and keep your body healthy.</p>
          <button className="start-btn">Start now</button>
        </main>
        

</section>
      {/* 2️⃣ Info */}
    <section className="page page2">
  <Header />
  <div className="photo-container">
    <img src="/images/drops.jpg" alt="water" className="photo" />
    <span className="photo-text">Drops.</span> {/* текст поверх фото */}
  </div>
  <div className="info-text">
    <p>
      Want to drink more water but find it hard to keep track? Drops makes it simple.
    </p>
  </div>
</section>


      {/* 3️⃣ Features */}
      <section className="page page3">
        <Header />
        <h2 className="title">Meet our features</h2>
        <div className="features">
          <div className="card">
            <div className="icon">💧</div>
            <h3>Tracker</h3>
            <p>Log every drink and see your progress toward your daily goal.</p>
          </div>
          <div className="card">
            <div className="icon">📊</div>
            <h3>Statistics</h3>
            <p>
              View detailed insights and charts to track your water intake over days, weeks, or
              months.
            </p>
          </div>
          <div className="card">
            <div className="icon">🎯</div>
            <h3>Achievements</h3>
            <p>
              Stay motivated by earning unique achievements for reaching your daily and weekly
              hydration goals.
            </p>
          </div>
          <div className="card">
            <div className="icon">💡</div>
            <h3>Tips</h3>
            <p>Receive practical advice and motivation to improve your hydration habits.</p>
          </div>
        </div>
      </section>

      {/* 4️⃣ Reviews */}
      <section className="page page4">
        <Header />
        <div
          className="review-carousel"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className="review-cards-wrapper"
            style={{ transform: `translateX(-${activeIndex * 266}px)` }}
          >
            {reviews.map((review, idx) => (
              <div className="review-card" key={idx}>
                <p>{review.text}</p>
                <div className="review-author">
                  <span className="account-icon">👤</span>
                  <span>{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dots">
          {reviews.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === activeIndex ? "active" : ""}`}
            ></span>
          ))}
        </div>
      </section>

      {/* 5️⃣ Tracker */}
     <section className="page page5">
  <Header />

  <div className="tracker-image-box">
    <img src="/images/tracker.png" alt="tracker" className="tracker-photo" />
  </div>

  <div className="tracker-text">
    <h2>It's time to drink your water!</h2>
    <p>
      Create your account today and take the first step toward better hydration and well-being.
    </p>
    <button className="start-btn" onClick={addWater}>
      Register now
    </button>
  </div>
</section>

      {/* 6️⃣ Footer */}
      <footer className="footer">
        <h2>drops.</h2>
        <p>Stay on the wave of hydration</p>
        <div className="socials">
          <a href="#">📧 drops.tracker@email.com</a>
          <a href="#">📞 +380 (97) 928-64-19</a>
        </div>
        <nav className="footer-nav">
          <a href="#">Tracker</a>
          <a href="#">Statistic</a>
          <a href="#">Achievements</a>
          <a href="#">Account</a>
          <a href="#">Support</a>
        </nav>
      </footer>
    </div>
  );
}

export default App;
