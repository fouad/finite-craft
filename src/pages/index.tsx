import dynamic from "next/dynamic";
import Head from "next/head";

const App = dynamic(() => import("../App"), { ssr: false });

const prod = process.env.NODE_ENV === 'production'

export default function Home() {
  return (
    <main>
      <Head>
        <title>Finite Craft - the best game on the internet</title>
      </Head>
      <div className="absolute p-4 font-light">
        <strong className="font-extrabold uppercase">Finite Craft</strong>
        <p>The best game on {prod ? 'the internet' : 'localhost'}</p>
      </div>
      <div style={{ height: '100vh' }}>
      <App />
      </div>
    </main>
  );
}
