'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  title: string;
  href: string;
}

interface BreadcrumbsProps {
  customItems?: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  customItems,
  showHome = true,
  className = ''
}) => {
  const pathname = usePathname();

  // Define page title mappings for Japanese
  const pageTitleMap: Record<string, string> = {
    '/': 'ホーム',
    '/services': 'サービス案内',
    '/about': '会社概要',
    '/contact': 'お問い合わせ',
    '/blog': '技術情報',
    '/products': '製品事例',
    '/privacy-policy': 'プライバシーポリシー',
    '/terms': '利用規約',
    '/sitemap': 'サイトマップ'
  };

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (customItems) {
      return showHome ? [{ title: 'ホーム', href: '/' }, ...customItems] : customItems;
    }

    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [];

    if (showHome) {
      breadcrumbs.push({ title: 'ホーム', href: '/' });
    }

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const title = pageTitleMap[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ title, href: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page unless there are custom items
  if (pathname === '/' && !customItems) {
    return null;
  }

  return (
    <nav 
      aria-label="パンくずナビゲーション" 
      className={`font-japanese ${className}`}
    >
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbs.map((item, index) => (
          <li key={item.href} className="flex items-center">
            {index > 0 && (
              <svg 
                className="w-4 h-4 text-gray-400 mx-2" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            )}
            
            {index === breadcrumbs.length - 1 ? (
              // Current page - no link
              <span 
                className="text-gray-600 font-medium"
                aria-current="page"
              >
                {item.title}
              </span>
            ) : (
              // Linked breadcrumb
              <Link
                href={item.href}
                className="text-brand-red hover:text-red-700 transition-colors duration-200 link-lift"
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ol>

      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((item, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": item.title,
              "item": `https://take-parts-factory.pages.dev${item.href}`
            }))
          })
        }}
      />
    </nav>
  );
};

export default Breadcrumbs;