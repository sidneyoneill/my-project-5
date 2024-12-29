import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import React from 'react';
// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL as string;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

// Inside your Profile component
const Profile = () => {
  const navigate = useNavigate();

  const handleReturnHome = async () => {
    try {
      // Sign out the user
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Navigate to home page after successful logout
      navigate('/');
    } catch (err) {
      console.error('Error signing out:', err);
      // Optionally show an error message to the user
    }
  };

  return (
    // ... other profile content
    <button
      onClick={handleReturnHome}
      className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label="Return home and sign out"
    >
      Return Home
    </button>
    // ... rest of the component
  );
};

export default Profile; 