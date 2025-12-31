"use client";
import React, { useEffect, useState } from 'react';
import ButtonAppBar from '../components/navbar';
import FooterBar from '../components/footer';
import { GeneralLanding } from '../components/landingPages';

const GeneralPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 650);
    const handleResize = () => setIsMobile(window.innerWidth < 650);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const accessLevel = sessionStorage.getItem('accessLevel');
    setIsAuthorized(accessLevel === 'general' || accessLevel === 'family');
  }, []);

  return (
    <div>
      <title>Emily & Michael's Wedding</title>
      <ButtonAppBar />
      <main style={{ width: isMobile ? '90%' : '75%', margin: 'auto', paddingBottom: '72px' }}>
        {isAuthorized ? (
          <GeneralLanding />
        ) : (
          <div className="mt-10 space-y-3">
            <h1 className="text-2xl font-semibold">Access needed</h1>
            <p>Please return to the home page and enter the guest password to view this page.</p>
            <a className="text-blue-600 dark:text-blue-400 underline" href="/">Back to home</a>
          </div>
        )}
      </main>
      <FooterBar isMobile={isMobile} />
    </div>
  );
};

export default GeneralPage;
