// import React from 'react';
// import './Home.module.css';
import About from '../About/About';
import Problems from '../Problems/Problems';
import Contact from '../Contact/Contact';

// const Home = () => {
//   return (
//     <div className="home-container">
//       <div className="home-content">
//         <h1 className="home-title">Welcome to CoderArena!</h1>
//         <h1> UNDERWORK </h1>
//         <p className="home-text">
//           Start your coding journey with us. Solve problems, compete with peers, and enhance your skills. 
//         </p>
//         <button className="cta-button">Get Started</button>
//       </div>
//       <About />
//       <Problems />
//       <Contact />
//     </div>
    
//   );
// };

// export default Home;

import React from 'react';
import { Code, Layers, Clock } from 'lucide-react';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
const Home = () => (

  <div className="font-sans text-gray-900 bg-gray-50">
    <Navbar />
    {/* Header */}
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Crack Programmer Interviews 🎯
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-md">
            Practice real-world problems, get instant code output and community reviews.
          </p>
        </div>
      </div>
    </header>

    {/* Features */}
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Platform Highlights</h2>
      <div className="grid gap-8 lg:grid-cols-3">
        <FeatureCard
          icon={<Code className="w-12 h-12 text-indigo-500" />}
          title="Instant Code Execution"
          description="Run and debug code live in C++, Java, Python directly in the browser."
        />
        <FeatureCard
          icon={<Layers className="w-12 h-12 text-green-500" />}
          title="Organized Practice"
          description="Filter problems by difficulty, tag, topic and track your progress."
        />
        <FeatureCard
          icon={<Clock className="w-12 h-12 text-purple-500" />}
          title="Time-bound Contests"
          description="Join live contests, view leaderboards, and challenge your peers."
        />
      </div>
    </section>

    {/* One Testimonial */}
    <section className="bg-white py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
      <div className="flex justify-center">
        <div className="bg-gray-100 rounded-xl shadow p-6 max-w-md text-center hover:shadow-xl transition">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="User"
            className="mx-auto w-20 h-20 rounded-full mb-4"
          />
          <h4 className="text-xl font-semibold">Raghu Sharma</h4>
          <p className="text-sm text-gray-600 mb-3">Software Developer at TechNova</p>
          <p className="text-gray-700 italic">
            “Thanks to CoderArena, I cracked my dream job. The real-time compiler and curated problems are top-notch!”
          </p>
        </div>
      </div>
    </section>
    <About />
    <Problems />
    <Contact />
    <Footer />
  </div>
);

// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition transform hover:-translate-y-2">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-6 h-6 text-indigo-500 flex-shrink-0">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}


export default Home;
