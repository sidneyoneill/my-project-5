import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGoldStudentClick = () => {
    // Navigate to the student landing page
    navigate('/student-landing');
  };

  return (
    <div className="hero-section">
      {/* ... other hero content ... */}
      
      <button
        onClick={handleGoldStudentClick}
        className="px-6 py-3 text-lg font-semibold text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors"
        aria-label="Become a Gold Student"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleGoldStudentClick();
          }
        }}
      >
        Gold Student
      </button>

      {/* ... rest of the hero content ... */}
    </div>
  );
};

export default LandingPage; 