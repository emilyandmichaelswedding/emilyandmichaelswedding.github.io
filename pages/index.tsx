"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import FooterBar from '../components/footer';
import ButtonAppBar from '../components/navbar';

type AccessLevel = 'family' | 'general' | null;

const FAMILY_HASH = 'a12f4725e1743fd2dfb30a3aeb28827dd685f7f854b674e3d2f363856555df7f';
const GENERAL_HASH = '505999582e91c28fb13dd691861395f441296ec305535fb77e99dea7134ceccf';

async function hashPassword(raw: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(raw);

  // Prefer Web Crypto when available (requires secure context/modern browser)
  const subtle = typeof window !== 'undefined' ? window.crypto?.subtle : undefined;
  if (subtle) {
    const digest = await subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }

  // Fallback: use a small, on-demand hash to support browsers/contexts without Web Crypto
  const { default: CryptoJS } = await import('crypto-js');
  return CryptoJS.SHA256(raw).toString(CryptoJS.enc.Hex);
}

const Home: React.FC = () => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [accessLevel, setAccessLevel] = useState<AccessLevel>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 650);
    const handleResize = () => setIsMobile(window.innerWidth < 650);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const storedAccess = sessionStorage.getItem('accessLevel') as AccessLevel;
    if (storedAccess === 'family' || storedAccess === 'general') {
      setAccessLevel(storedAccess);
      router.replace('/home');
    }
  }, [router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsChecking(true);
    setErrorMessage('');
    try {
      const hashed = await hashPassword(passwordInput.trim());
      if (hashed === FAMILY_HASH) {
        setAccessLevel('family');
        sessionStorage.setItem('accessLevel', 'family');
        router.replace('/home');
      } else if (hashed === GENERAL_HASH) {
        setAccessLevel('general');
        sessionStorage.setItem('accessLevel', 'general');
        router.replace('/home');
      } else {
        setAccessLevel(null);
        sessionStorage.removeItem('accessLevel');
        setErrorMessage('Incorrect password. If you think there is an error, please reach out to Emily and Michael.');
      }
    } finally {
      setIsChecking(false);
      setPasswordInput('');
    }
  };

  return (
    <div>
      <title>Emily and Michael's Wedding</title>
      <ButtonAppBar />
      <main style={{ width: isMobile ? '90%' : '75%', margin: 'auto', paddingBottom: '72px' }}>
        <section className="mt-8 max-w-xl mx-auto border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
          <h1 className="text-3xl font-semibold mb-3">Emily and Michael's Wedding</h1>
          <p className="text-gray-700 dark:text-gray-200 mb-4">
            Welcome! Please enter the password you received to view the wedding weekend details.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              id="password-input"
              type="password"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-transparent"
              value={passwordInput}
              onChange={(event) => setPasswordInput(event.target.value)}
              placeholder="Enter your password"
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white dark:bg-white dark:text-black rounded-md py-2 font-medium disabled:opacity-70"
              disabled={isChecking}
            >
              {isChecking ? 'Checking...' : 'Enter'}
            </button>
            {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
          </form>
        </section>
      </main>
      <FooterBar isMobile={isMobile} />
    </div>
  );
};

export default Home;