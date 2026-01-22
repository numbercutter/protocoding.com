export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-page">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          {/* Spinning ring */}
          <div className="absolute inset-0 border-2 border-gray-200 rounded-full" />
          <div className="absolute inset-0 border-2 border-transparent border-t-accent rounded-full animate-spin" />
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          Loading
        </p>
      </div>
    </div>
  );
}
