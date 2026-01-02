"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ButtonAppBar from '../components/navbar';
import FooterBar from '../components/footer';

const RSVPPage: React.FC = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 650);
    const handleResize = () => setIsMobile(window.innerWidth < 650);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem('accessLevel');
    if (stored === 'family' || stored === 'general') {
      setIsAuthorized(true);
    } else {
      router.replace('/');
    }
  }, [router]);

  if (!isAuthorized) {
    return null;
  }

  return (
    <div>
      <title>RSVP - Emily and Michael's Wedding</title>
      <ButtonAppBar />
      <main style={{ width: isMobile ? '90%' : '75%', margin: 'auto', paddingBottom: '72px' }}>
        {/* Under Construction Content */}
        <br></br>
        <br></br>
        <section className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Our RSVP system is currently under development and will be available soon.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Please check back soon to confirm your attendance once it is operational. We appreciate your patience and can't wait to celebrate with you!
            </p>
          </div>
        </section>
      </main>
      <FooterBar isMobile={isMobile} />
    </div>
  );
};

export default RSVPPage;