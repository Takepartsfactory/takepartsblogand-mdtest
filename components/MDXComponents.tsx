import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Custom MDX components optimized for Japanese manufacturing content
const MDXComponents = {
  // Headers with anchor links for navigation
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = typeof children === 'string' 
      ? children.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '')
      : undefined;
    
    return (
      <h1 
        id={id}
        className="text-4xl font-bold text-gray-900 mb-6 leading-tight tracking-tight border-b-4 border-blue-600 pb-4"
        style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
        {...props}
      >
        {children}
        {id && (
          <Link 
            href={`#${id}`} 
            className="ml-2 text-blue-600 opacity-0 hover:opacity-100 transition-opacity"
            aria-label="このセクションへのリンク"
          >
            #
          </Link>
        )}
      </h1>
    );
  },

  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = typeof children === 'string' 
      ? children.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '')
      : undefined;
    
    return (
      <h2 
        id={id}
        className="text-3xl font-semibold text-gray-800 mb-5 mt-8 leading-snug border-l-4 border-blue-500 pl-4"
        style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
        {...props}
      >
        {children}
        {id && (
          <Link 
            href={`#${id}`} 
            className="ml-2 text-blue-500 opacity-0 hover:opacity-100 transition-opacity text-xl"
            aria-label="このセクションへのリンク"
          >
            #
          </Link>
        )}
      </h2>
    );
  },

  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = typeof children === 'string' 
      ? children.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '')
      : undefined;
    
    return (
      <h3 
        id={id}
        className="text-2xl font-semibold text-gray-700 mb-4 mt-6 leading-snug"
        style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
        {...props}
      >
        {children}
        {id && (
          <Link 
            href={`#${id}`} 
            className="ml-2 text-blue-500 opacity-0 hover:opacity-100 transition-opacity text-lg"
            aria-label="このセクションへのリンク"
          >
            #
          </Link>
        )}
      </h3>
    );
  },

  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 
      className="text-xl font-medium text-gray-700 mb-3 mt-5"
      style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
      {...props}
    >
      {children}
    </h4>
  ),

  h5: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5 
      className="text-lg font-medium text-gray-600 mb-2 mt-4"
      style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
      {...props}
    >
      {children}
    </h5>
  ),

  h6: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6 
      className="text-base font-medium text-gray-600 mb-2 mt-3"
      style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
      {...props}
    >
      {children}
    </h6>
  ),

  // Optimized paragraphs for Japanese text readability
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p 
      className="text-gray-700 mb-4 leading-relaxed text-base"
      style={{ 
        fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif',
        lineHeight: '1.8',
        letterSpacing: '0.02em'
      }}
      {...props}
    >
      {children}
    </p>
  ),

  // Enhanced images with Next.js optimization
  img: ({ src, alt, width, height, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src) return null;
    
    return (
      <div className="my-8 relative">
        <Image
          src={src}
          alt={alt || ''}
          width={typeof width === 'number' ? width : 800}
          height={typeof height === 'number' ? height : 400}
          className="rounded-lg shadow-lg w-full h-auto"
          style={{ objectFit: 'cover' }}
          priority={false}
        />
        {alt && (
          <p className="text-sm text-gray-600 text-center mt-2 italic">
            {alt}
          </p>
        )}
      </div>
    );
  },

  // Enhanced links with external link indicators
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith('http') && !href.includes(process.env.NEXT_PUBLIC_SITE_URL || '');
    
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors"
          {...props}
        >
          {children}
          <span className="inline-block ml-1 text-xs" aria-label="外部リンク">↗</span>
        </a>
      );
    }

    return (
      <Link
        href={href || '#'}
        className="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors"
        {...props}
      >
        {children}
      </Link>
    );
  },

  // Japanese-inspired blockquotes
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote 
      className="border-l-4 border-blue-500 pl-6 py-4 my-6 bg-blue-50 italic text-gray-700 relative"
      style={{ 
        fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif',
        lineHeight: '1.8'
      }}
      {...props}
    >
      <div className="absolute -left-2 top-2 text-4xl text-blue-400 font-serif">"</div>
      {children}
    </blockquote>
  ),

  // Styled unordered lists
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-none space-y-2 mb-4 pl-4" {...props}>
      {React.Children.map(children, (child, index) => (
        <li key={index} className="relative pl-6">
          <span className="absolute left-0 top-2 w-2 h-2 bg-blue-500 rounded-full"></span>
          {child}
        </li>
      ))}
    </ul>
  ),

  // Styled ordered lists
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-none counter-reset-list space-y-2 mb-4 pl-4" {...props}>
      {React.Children.map(children, (child, index) => (
        <li key={index} className="relative pl-8 counter-increment-list">
          <span className="absolute left-0 top-0 w-6 h-6 bg-blue-500 text-white text-sm rounded-full flex items-center justify-center font-medium">
            {index + 1}
          </span>
          {child}
        </li>
      ))}
    </ol>
  ),

  // List items (handled by ul/ol above, but keeping for compatibility)
  li: ({ children }: React.HTMLAttributes<HTMLLIElement>) => (
    <div className="text-gray-700 leading-relaxed">
      {children}
    </div>
  ),

  // Code blocks
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre 
      className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto my-6 text-sm"
      {...props}
    >
      {children}
    </pre>
  ),

  // Inline code
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code 
      className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  ),

  // Tables for technical specifications
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-gray-300" {...props}>
        {children}
      </table>
    </div>
  ),

  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th 
      className="border border-gray-300 bg-blue-50 px-4 py-2 text-left font-semibold text-gray-800"
      style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
      {...props}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td 
      className="border border-gray-300 px-4 py-2 text-gray-700"
      style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
      {...props}
    >
      {children}
    </td>
  ),

  // Horizontal rule
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="border-t-2 border-gray-300 my-8" {...props} />
  ),
};

// Custom components for manufacturing content
export const CallToAction = ({ 
  title, 
  description, 
  buttonText, 
  buttonLink, 
  variant = 'primary' 
}: {
  title: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
  variant?: 'primary' | 'secondary';
}) => {
  const bgColor = variant === 'primary' ? 'bg-blue-600' : 'bg-gray-600';
  const textColor = 'text-white';
  
  return (
    <div className={`${bgColor} ${textColor} p-8 rounded-lg my-8 text-center`}>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      {description && (
        <p className="text-lg mb-6 opacity-90">{description}</p>
      )}
      <Link
        href={buttonLink}
        className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
      >
        {buttonText}
      </Link>
    </div>
  );
};

export const TechnicalSpecs = ({ 
  specs 
}: { 
  specs: Array<{ label: string; value: string }> 
}) => (
  <div className="bg-gray-50 p-6 rounded-lg my-6">
    <h4 className="text-xl font-semibold mb-4 text-gray-800">技術仕様</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {specs.map((spec, index) => (
        <div key={index} className="flex justify-between border-b border-gray-200 pb-2">
          <span className="font-medium text-gray-700">{spec.label}</span>
          <span className="text-gray-600">{spec.value}</span>
        </div>
      ))}
    </div>
  </div>
);

export const CustomerTestimonial = ({ 
  quote, 
  author, 
  company, 
  avatar 
}: {
  quote: string;
  author: string;
  company?: string;
  avatar?: string;
}) => (
  <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-md my-8">
    <blockquote className="text-lg italic text-gray-700 mb-4">
      "{quote}"
    </blockquote>
    <div className="flex items-center">
      {avatar && (
        <Image
          src={avatar}
          alt={author}
          width={48}
          height={48}
          className="rounded-full mr-4"
        />
      )}
      <div>
        <div className="font-semibold text-gray-800">{author}</div>
        {company && <div className="text-gray-600 text-sm">{company}</div>}
      </div>
    </div>
  </div>
);

export const ImageGallery = ({ 
  images 
}: { 
  images: Array<{ src: string; alt: string; caption?: string }> 
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
    {images.map((image, index) => (
      <div key={index} className="space-y-2">
        <Image
          src={image.src}
          alt={image.alt}
          width={400}
          height={300}
          className="rounded-lg shadow-md w-full h-auto"
          style={{ objectFit: 'cover' }}
        />
        {image.caption && (
          <p className="text-sm text-gray-600 text-center">{image.caption}</p>
        )}
      </div>
    ))}
  </div>
);

// Export all components
export default {
  ...MDXComponents,
  CallToAction,
  TechnicalSpecs,
  CustomerTestimonial,
  ImageGallery,
};