import React from 'react';
import { Button } from '@/components/ui/button';

const GoogleSignUpButton = () => {
  return (
    <Button
      variant="outline"
      className="w-full text-white border-white/20 hover:bg-white/10"
      onClick={() => {
        console.log('Google sign-up clicked');
      }}
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="w-5 h-5 mr-2"
      />
      Sign up with Google
    </Button>
  );
};

export default GoogleSignUpButton; 