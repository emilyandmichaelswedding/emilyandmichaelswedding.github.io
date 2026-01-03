"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ButtonAppBar from '../components/navbar';
import FooterBar from '../components/footer';
import { CloseFamilyLanding, GeneralLanding } from '../components/landingPages';
import Cookies from 'js-cookie';

type AccessLevel = 'family' | 'general' | null;
const ACCESS_COOKIE_KEY = 'accessLevel';

const SchedulePage: React.FC = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [accessLevel, setAccessLevel] = useState<AccessLevel>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 650);
    const handleResize = () => setIsMobile(window.innerWidth < 650);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const cookieAccess = Cookies.get(ACCESS_COOKIE_KEY) as AccessLevel | undefined;
    const sessionAccess = sessionStorage.getItem('accessLevel') as AccessLevel;
    const stored = cookieAccess ?? sessionAccess;
    if (stored === 'family' || stored === 'general') {
      setAccessLevel(stored);
    } else {
      router.replace('/');
    }
  }, [router]);

  if (!accessLevel) {
    return null;
  }

  return (
    <div>
      <title>Schedule of Events | Emily & Michael's Wedding</title>
      <ButtonAppBar />
      <main style={{ width: isMobile ? '90%' : '75%', margin: 'auto', paddingBottom: '72px' }}>
        <section className="mt-6">
          {accessLevel === 'family' ? <CloseFamilyLanding /> : <GeneralLanding />}
        </section>
        {/* <div className="mt-8 flex items-center gap-3">
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
        </div> */}
      </main>
      <FooterBar isMobile={isMobile} />
    </div>
  );
};

export default SchedulePage;
