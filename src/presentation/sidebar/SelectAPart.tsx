"use client";

export function SelectAPart() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-3 p-8 text-center">
      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-300 fill-current">
          <path d="M20.71 5.63l-2.34-2.34a1 1 0 00-1.41 0l-3.12 3.12-1.41-1.42-1.42 1.42 1.41 1.41-6.6 6.6A2 2 0 005 16v3h3a2 2 0 001.42-.59l6.6-6.6 1.41 1.42 1.42-1.42-1.42-1.41 3.12-3.12a1 1 0 000-1.65z" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">Select a part</p>
        <p className="text-xs text-gray-400 leading-relaxed">
          Click on any section of the kit to customize its color or pattern
        </p>
      </div>
    </div>
  );
}
