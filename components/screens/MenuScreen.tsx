type MenuScreenProps = {
  onSolo: () => void;
  onParty: () => void;
};

export default function MenuScreen({ onSolo, onParty }: MenuScreenProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 text-white">
      <div className="w-full max-w-md text-center">
        <h1 className="text-5xl font-black tracking-tight">HiLo</h1>
        <p className="mt-3 text-slate-400">
          Guess whether the next card is higher or lower.
        </p>

        <div className="mt-10 grid gap-3">
          <button
            type="button"
            onClick={onSolo}
            className="rounded-2xl bg-emerald-500 px-5 py-5 text-lg font-bold text-slate-950 transition hover:bg-emerald-400"
          >
            Solo
          </button>
          <button
            type="button"
            onClick={onParty}
            className="rounded-2xl bg-white px-5 py-5 text-lg font-bold text-slate-950 transition hover:bg-slate-200"
          >
            Party
          </button>
        </div>
      </div>
    </main>
  );
}