
"use client";
export default function TestPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-6xl font-bold mb-8">
          TEST PAGE
        </h1>
        <p className="text-2xl mb-4">
          If this text changes color when you toggle, dark mode is working!
        </p>
        
        <div className="p-6 border rounded-lg mt-8">
          <h2 className="text-2xl font-bold mb-4">Card Test</h2>
          <p>This card should also change appearance.</p>
        </div>
      </div>
    </div>
  );
}