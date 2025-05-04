
import React from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  withPadding?: boolean;
  fullHeight?: boolean;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
  withPadding = true,
  fullHeight = true
}) => {
  return (
    <div 
      className={cn(
        "w-full mx-auto max-w-md bg-background",
        fullHeight && "min-h-[calc(100vh-4rem)]",
        withPadding && "px-4 py-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageContainer;
