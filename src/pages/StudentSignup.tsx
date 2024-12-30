import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
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
            <div className="mb-6">
              <GoogleSignInButton />
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-white/70 bg-[#0F172A]/50 backdrop-blur-xl">or continue with email</span>
              </div>
            </div>

            <SignupForm initialEmail={emailFromState} />

            <p className="mt-4 text-center text-sm text-white/70">
              Already have an account?{' '}
              <Link
                to="/auth"
                className="text-[#FFD700] hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentSignup;