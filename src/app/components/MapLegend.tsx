"use client";

export default function MapLegend() {
  return (
    <div className="absolute top-4 right-4 bg-white dark:bg-zinc-800 text-sm p-3 rounded shadow-md border dark:border-zinc-700 space-y-1 z-[10]">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-[#22c55e]" />{" "}
        <span>Retail</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-[#3b82f6]" /> <span>Transport</span>
      </div>
      <div className="flex items-center gap-2">
        <div
          className="w-0 h-0"
          style={{
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderBottom: "10px solid #ef4444",
          }}
        />
        <span>Events</span>
      </div>
    </div>
  );
}
