import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

function Landing() {
  const navigate = useNavigate();
  
  const [activeIndex, setActiveIndex] = useState(0);
  const startX = useRef(null);
  const isDragging = useRef(false);
  const sliderRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const baseCardWidth = 266;
  const baseGap = 16;

  useEffect(() => {
    const handleResize = () => {
      setContainerWidth(sliderRef.current ? sliderRef.current.offsetWidth : 0);
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const effectiveCardWidth = isMobile ? containerWidth : baseCardWidth;
  const effectiveGap = isMobile ? 0 : baseGap;

  const translateValue = `${(containerWidth - effectiveCardWidth) / 2 - activeIndex * (effectiveCardWidth + effectiveGap)}px`;

  // swipe logic
  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    isDragging.current = true;
  };
  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const diff = startX.current - e.clientX;
    if (diff > 50 && activeIndex < reviews.length - 1) {
      setActiveIndex((p) => p + 1);
      isDragging.current = false;
    } else if (diff < -50 && activeIndex > 0) {
      setActiveIndex((p) => p - 1);
      isDragging.current = false;
    }
  };
  const stopDragging = () => (isDragging.current = false);
  const handleTouchStart = (e) => (startX.current = e.touches[0].clientX);
  const handleTouchMove = (e) => {
    const diff = startX.current - e.touches[0].clientX;
    if (diff > 50 && activeIndex < reviews.length - 1) {
      setActiveIndex((p) => p + 1);
      startX.current = e.touches[0].clientX;
    } else if (diff < -50 && activeIndex > 0) {
      setActiveIndex((p) => p - 1);
      startX.current = e.touches[0].clientX;
    }
  };
  
  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-white">
      {/* ====================== PAGE 1 — HERO ====================== */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 pt-32 bg-[#f9f9f9]">
        {/* blurred background spot */}
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[500px] h-[350px] rounded-full bg-[#8CC1E9] blur-[140px] opacity-90"></div>
        <h1 className="relative text-3xl font-bold text-center mb-4 text-[#12284b]">
          Stay on the wave of hydration
        </h1>
        <p className="relative text-center text-base mb-6 text-[#12284b]">
          Track your daily water intake easily and keep your body healthy.
        </p>
        <button 
        onClick={() => navigate("/tracker")}
        className="relative bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer">
          Start now
        </button>
      </section>
      {/* ====================== PAGE 2 — IMAGE BLOCK ====================== */}
      <section className="w-full min-h-screen flex flex-col items-center justify-start pt-24 px-6">
        <div className="relative mt-12">
          <img
            src="/images/drops.jpg"
            className="w-[315px] h-[387px] rounded-xl object-cover"
            alt="water"
          />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 text-white text-4xl font-bold drop-shadow-lg">
            Drops.
          </span>
        </div>
        <div className="max-w-md mt-6 text-center">
          <p className="text-lg font-semibold text-[#12284b] px-4">
            Want to drink more water but find it hard to keep track? Drops makes it simple.
          </p>
        </div>
      </section>
      {/* ====================== PAGE 3 — FEATURES ====================== */}
      <section className="w-full min-h-screen bg-[#bddbf7] pt-24 pb-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8 text-[#12284b]">Meet our features</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-items-center">
          {[
            { icon: "💧", title: "Tracker", text: "Log every drink and see your progress." },
            { icon: "📊", title: "Statistics", text: "View insights over days or weeks." },
            { icon: "🎯", title: "Achievements", text: "Earn rewards for your progress." },
            { icon: "💡", title: "Tips", text: "Improve hydration habits daily." },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 w-full max-w-[200px] flex flex-col items-start"
            >
              <div className="text-xl mb-1">{f.icon}</div>
              <h3 className="font-bold text-lg mb-1">{f.title}</h3>
              <p className="text-sm text-[#12284b]">{f.text}</p>
            </div>
          ))}
        </div>
      </section>
      {/* ====================== PAGE 4 — REVIEWS ====================== */}
      <section className="w-full min-h-screen bg-[#f0f4fa] pt-24 pb-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-[#12284b]">What Our Users Say</h2>
        <div
          ref={sliderRef}
          className="max-w-[900px] mx-auto overflow-hidden cursor-grab"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={`flex transition-transform duration-300 ease-in-out ${isMobile ? "gap-0" : "gap-4"}`}
            style={{ transform: `translateX(${translateValue})` }}
          >
            {reviews.map((review, idx) => (
              <div
                key={idx}
                style={{ width: `${effectiveCardWidth}px` }}
                className={`flex-shrink-0 h-[272px] bg-[#0055a0] text-white rounded-[33px] p-6 flex flex-col justify-between shadow-lg transition-all duration-300 ${
                  idx === activeIndex ? "scale-105 opacity-100" : "scale-95 opacity-70"
                }`}
              >
                <div>
                  <div className="text-yellow-400 mb-2">★★★★★</div>
                  <p className="text-left italic before:content-['“'] before:text-2xl before:mr-1 after:content-['”'] after:text-2xl after:ml-1">
                    {review.text}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="w-8 h-8 bg-white text-[#0055a0] rounded-full flex items-center justify-center font-bold">
                    {review.name.charAt(0)}
                  </span>
                  <span className="text-sm font-semibold">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* dots */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, idx) => (
            <span
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === activeIndex ? "bg-[#0055a0] scale-125" : "bg-[#12284b] opacity-50"
              }`}
            ></span>
          ))}
        </div>
      </section>
      {/* ====================== PAGE 5 — CTA ====================== */}
      <section className="w-full min-h-screen bg-[#eaf3fb] pt-24 px-6 text-center">
        <div className="flex justify-center mt-12">
          <img
            src="/images/tracker.png"
            alt="tracker"
            className="w-[70%] max-w-[280px] rounded-xl"
          />
        </div>
        <div className="mt-6 px-4">
          <h2 className="text-xl font-bold text-[#0055a0]">
            It's time to drink your water!
          </h2>
          <p className="text-[#12284b] mt-2">
            Create your account today and take the first step toward better hydration and well-being.
          </p>
          <button onClick={() => navigate("/register")}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg">
            Register now
          </button>
        </div>
      </section>
      {/* ====================== FOOTER ====================== */}
      <footer className="bg-white text-center py-8 text-[#12284b]">
        <h2 className="text-2xl font-bold text-[#0055a0]">drops.</h2>
        <p className="font-semibold mb-4">Stay on the wave of hydration</p>
        <div className="flex flex-col gap-1 mb-4">
          <a className="text-blue-700">📧 drops.tracker@email.com</a>
          <a className="text-blue-700">📞 +380 (97) 928-64-19</a>
        </div>
        <nav className="flex flex-wrap justify-center gap-4 text-sm">
          <a>Tracker</a>
          <a>Statistic</a>
          <a>Achievements</a>
          <a>Account</a>
          <a>Support</a>
        </nav>
      </footer>
    </div>
  );
}
export default Landing;