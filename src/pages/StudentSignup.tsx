import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SignupForm from '@/components/signup/SignupForm';
import GoogleSignInButton from '@/components/signup/GoogleSignInButton';
import ParticleBackground from '@/components/ParticleBackground';

const StudentSignup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = location.state?.email || '';

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-md mx-auto space-y-8 animate-fade-in">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
            <p className="text-white/70">Join NexGen and unlock your potential</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/10">
            <SignupForm initialEmail={emailFromState} />

            <div className="mt-6">
              <GoogleSignInButton />
            </div>

            <p className="mt-4 text-center text-sm text-white/70">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-[#FFD700] hover:underline"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentSignup;