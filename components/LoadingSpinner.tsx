'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'red' | 'gray' | 'white';
  className?: string;
  text?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'red',
  className = '',
  text
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    red: 'text-brand-red',
    gray: 'text-gray-600',
    white: 'text-white'
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      <svg
        className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {text && (
        <p className={`text-sm ${colorClasses[color]} animate-pulse`}>
          {text}
        </p>
      )}
    </div>
  );
}

// Skeleton loading components
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-200 rounded-2xl h-48 w-full mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
}

export function SkeletonText({ 
  lines = 3,
  className = '' 
}: { 
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`animate-pulse space-y-2 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className={`h-4 bg-gray-200 rounded ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
}

export function SkeletonButton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 h-12 rounded-xl w-32 ${className}`} />
  );
}

// Page loading component with Japanese aesthetic
export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        {/* Traditional Japanese loading animation */}
        <div className="relative w-16 h-16 mx-auto">
          {/* Outer circle */}
          <div className="absolute inset-0 border-4 border-brand-red border-opacity-20 rounded-full"></div>
          {/* Spinning arc */}
          <div className="absolute inset-0 border-4 border-transparent border-t-brand-red rounded-full animate-spin"></div>
          {/* Inner dot */}
          <div className="absolute inset-4 bg-brand-red rounded-full animate-pulse"></div>
        </div>
        
        <div className="space-y-2">
          <p className="text-brand-red font-medium">読み込み中</p>
          <div className="flex justify-center space-x-1">
            <div className="w-1 h-1 bg-brand-red rounded-full animate-bounce"></div>
            <div className="w-1 h-1 bg-brand-red rounded-full animate-bounce delay-100"></div>
            <div className="w-1 h-1 bg-brand-red rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Content loading component
export function ContentLoader({ 
  type = 'general',
  className = '' 
}: { 
  type?: 'general' | 'blog' | 'product' | 'list';
  className?: string;
}) {
  const skeletons = {
    general: (
      <div className="space-y-6">
        <div className="h-8 bg-gray-200 rounded w-2/3 animate-pulse"></div>
        <SkeletonText lines={4} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    ),
    blog: (
      <div className="space-y-6">
        <div className="h-10 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="flex space-x-4">
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
        </div>
        <div className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
        <SkeletonText lines={6} />
      </div>
    ),
    product: (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <SkeletonText lines={3} />
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <SkeletonButton />
        </div>
      </div>
    ),
    list: (
      <div className="space-y-4">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="flex space-x-4 p-4 border rounded-xl animate-pulse">
            <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  };

  return (
    <div className={`animate-pulse ${className}`}>
      {skeletons[type]}
    </div>
  );
}