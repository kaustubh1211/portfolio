import React from 'react';

export default function Container({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    < div
      className={`container mx-auto max-w-3xl px-4 animate-fade-in-blur  border-gray-800 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}