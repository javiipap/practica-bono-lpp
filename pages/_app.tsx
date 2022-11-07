import '../styles/globals.css';
import type { AppProps } from 'next/app';
import ErrorPrompt from '@components/ErrorPrompt';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorPrompt>
      <Component {...pageProps} />
    </ErrorPrompt>
  );
}
