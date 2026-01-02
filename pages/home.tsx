"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ButtonAppBar from '../components/navbar';
import FooterBar from '../components/footer';

const HomePage: React.FC = () => {
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
      <title>Emily and Michael's Wedding</title>
      <ButtonAppBar />
      <main style={{ width: isMobile ? '90%' : '75%', margin: 'auto', paddingBottom: '72px' }}>
        <section className="mt-10 space-y-4">
          <h1 className="text-3xl font-semibold">Welcome to Our Life Together</h1>
          <button
            type="button"
            className="text-sm text-gray-600 dark:text-gray-300 underline"
            onClick={() => {
              sessionStorage.removeItem('accessLevel');
              router.replace('/');
            }}
          >
            Log Out
          </button>
        </section>
      </main>
      <FooterBar isMobile={isMobile} />
    </div>
  );
};

export default HomePage;
