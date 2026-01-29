"use client";
import * as React from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../../../lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  isStatic?: boolean;
  imageSrc?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  quality = 50,
  isStatic = false,
  imageSrc = "",
  ...props
}: LinkPreviewProps) => {
  let src;
  if (!isStatic) {
    const params = new URLSearchParams({
      url: url,

      screenshot: "true",
      meta: "false",
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": "true",
      "viewport.deviceScaleFactor": "1",
      "viewport.width": String(width * 3),
      "viewport.height": String(height * 3),
    });
    src = `https://api.microlink.io/?${params.toString()}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setIsOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);

  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2); // Reduce sensitivity
    x.set(offsetFromCenter);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        x.set(0);
      }}
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence>
        {isOpen && isMounted && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: -10,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
              },
            }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            className="absolute -top-32 -left-16 z-50 w-44 translate-x-1/2"
            style={{
              x: translateX,
            }}
          >
            <Link
              href={url}
              className="block bg-white dark:bg-neutral-900 border-2 border-transparent shadow-xl rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
              target="_blank"
            >
              <Image
                src={src}
                width={width}
                height={height}
                quality={quality}
                priority={true}
                className="rounded-lg object-cover w-full h-full"
                alt="preview image"
              />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      <Link href={url} target="_blank" className={cn("block", className)} {...props}>
        {children}
      </Link>
    </div>
  );
};
