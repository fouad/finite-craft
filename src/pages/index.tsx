import dynamic from "next/dynamic";

const App = dynamic(() => import("../App"), { ssr: false });

const prod = process.env.NODE_ENV === 'production'

export default function Home() {
  return (
    <main>
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
