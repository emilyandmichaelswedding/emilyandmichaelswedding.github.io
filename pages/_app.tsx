import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { ThemeProvider } from "next-themes";
import { Mate } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const mate = Mate({ subsets: ['latin'], weight: ["400"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={mate.className}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
      <br></br>
      <br></br>
      <br></br>
    </main>
  )
}

export default MyApp;