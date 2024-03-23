import dynamic from "next/dynamic";

const App = dynamic(() => import("../App"), { ssr: false });

export default function Home() {
  return (
    <main>
      <div className="p-4 font-light">
        <strong className="font-extrabold uppercase">Finite Craft</strong>
        <p>The best game on the internet</p>
      </div>
      <div style={{ height: 'calc(100vh - 80px)' }}>
      <App />
      </div>
    </main>
  );
}
