"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ButtonAppBar from '../components/navbar';
import FooterBar from '../components/footer';
import { CloseFamilyLanding, GeneralLanding } from '../components/landingPages';
import Cookies from 'js-cookie';

type AccessLevel = 'family' | 'general' | null;
const ACCESS_STORAGE_KEY = 'al_4f8e1bd0c3a34a51';
const ACCESS_FAMILY_TOKEN = 'f_9c4c1f6e1a0c7d2b';
const ACCESS_GENERAL_TOKEN = 'g_5b1a9d0c6e3f8a2d';

const decodeAccessToken = (token: string | undefined | null): AccessLevel => {
  if (token === ACCESS_FAMILY_TOKEN) return 'family';
  if (token === ACCESS_GENERAL_TOKEN) return 'general';
  return null;
};

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
    const cookieAccess = Cookies.get(ACCESS_STORAGE_KEY);
    const sessionAccess = sessionStorage.getItem(ACCESS_STORAGE_KEY);
    const stored = decodeAccessToken(cookieAccess ?? sessionAccess);
    if (stored) {
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
              sessionStorage.removeItem(ACCESS_STORAGE_KEY);
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
