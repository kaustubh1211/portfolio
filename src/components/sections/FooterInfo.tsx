    import React from "react";
import { TextHoverEffect } from "../ui/Hovertext";
import Container from "../ui/Container";

export const Footer = () => {
  return (
    <Container>

    <footer className="w-full  border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        {/* Footer Info */}
        <div className="py-8 text-center border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
            Developed by Kaustubh Patil
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            © 2025 All rights reserved
          </p>
        </div>
      </div>
    </footer>
            
    </Container>
  );
};