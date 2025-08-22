'use client';

import { useState } from 'react';

interface SocialShareProps {
  title: string;
  url: string;
  excerpt?: string;
  className?: string;
}

export default function SocialShare({ title, url, excerpt, className = '' }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareText = excerpt ? `${title}\n\n${excerpt}` : title;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(shareText);

  const shareLinks = [
    {
      name: 'LINE',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.365 9.863c.349 0 .63.285.63.635 0 .35-.281.635-.63.635h-2.37v.998h2.37c.349 0 .63.283.63.633 0 .349-.281.634-.63.634h-3c-.349 0-.63-.285-.63-.634V8.863c0-.349.281-.634.63-.634h3c.349 0 .63.285.63.634 0 .349-.281.633-.63.633h-2.37v.997h2.37zm-3.203 3.718c.349 0 .63-.285.63-.634V8.863c0-.349-.281-.634-.63-.634s-.63.285-.63.634v4.084c0 .349.281.634.63.634zm-3.464-.634c0 .349-.281.634-.63.634s-.63-.285-.63-.634V9.496l-1.01 2.335c-.098.228-.282.37-.492.37-.21 0-.394-.142-.492-.37l-1.01-2.335v3.451c0 .349-.281.634-.63.634s-.63-.285-.63-.634V8.863c0-.349.281-.634.63-.634.174 0 .332.08.437.216l1.506 3.482 1.507-3.482c.105-.136.263-.216.437-.216.349 0 .63.285.63.634v4.084zm-6.524-.634c0 .349-.281.634-.63.634s-.63-.285-.63-.634V8.863c0-.349.281-.634.63-.634s.63.285.63.634v4.084z"/>
          <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
        </svg>
      ),
      url: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-green-500 hover:bg-green-600',
      label: 'LINEでシェア'
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'bg-gray-900 hover:bg-black',
      label: 'Xでシェア'
    },
    {
      name: 'Facebook',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-blue-600 hover:bg-blue-700',
      label: 'Facebookでシェア'
    },
    {
      name: 'Email',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26c.38.2.83.2 1.21 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      url: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
      color: 'bg-gray-600 hover:bg-gray-700',
      label: 'メールでシェア'
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('クリップボードへのコピーに失敗しました:', error);
    }
  };

  return (
    <div className={`${className}`}>
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
        </div>
        <h3 
          className="text-lg font-bold text-gray-900"
          style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
        >
          この記事をシェア
        </h3>
      </div>

      {/* Share Buttons Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {shareLinks.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              ${platform.color} text-white rounded-xl p-4 flex flex-col items-center gap-2 
              transition-all duration-300 hover:scale-105 hover:shadow-lg group
            `}
          >
            <div className="flex items-center justify-center w-8 h-8">
              {platform.icon}
            </div>
            <span 
              className="text-xs font-medium text-center leading-tight"
              style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
            >
              {platform.label}
            </span>
          </a>
        ))}
      </div>

      {/* URL Copy Section */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span 
            className="text-sm font-medium text-gray-900"
            style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
          >
            URL をコピー
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2">
            <input
              type="text"
              value={url}
              readOnly
              className="w-full text-sm text-gray-600 bg-transparent outline-none"
              style={{ fontFamily: 'monospace' }}
            />
          </div>
          <button
            onClick={copyToClipboard}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${copied 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }
            `}
            style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
          >
            {copied ? (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                コピー済み
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                コピー
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Additional Share Options */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p 
          className="text-sm text-gray-600 text-center"
          style={{ fontFamily: '"Noto Sans JP", "Yu Gothic", "Hiragino Sans", sans-serif' }}
        >
          他の方法でシェアしたい場合は、上記のURLをコピーしてご利用ください
        </p>
      </div>
    </div>
  );
}