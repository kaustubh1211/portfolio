import React from 'react';

interface ContainerProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = '',
  ...props
}: ContainerProps) {
  return (
    <div className="relative w-full border-b border-t border-zinc-200/80 dark:border-zinc-800/80">
      {/* Background/Layout wrapper that limits content width and adds vertical borders */}
      <div
        className={`
          container mx-auto max-w-3xl px-4 animate-fade-in-blur
          border-x border-zinc-200/80 dark:border-zinc-800/80
          ${className}
        `}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}