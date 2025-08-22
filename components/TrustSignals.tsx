'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface TrustBadge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  url?: string;
  verified: boolean;
  details?: string;
}

interface CompanyCredential {
  type: string;
  value: string;
  description: string;
  verificationUrl?: string;
}

interface TrustSignalsProps {
  variant?: 'badges' | 'credentials' | 'stats' | 'compact';
  showQRCode?: boolean;
  showSeal?: boolean;
  showLastUpdated?: boolean;
  className?: string;
}

const TrustSignals: React.FC<TrustSignalsProps> = ({
  variant = 'badges',
  showQRCode = false,
  showSeal = true,
  showLastUpdated = true,
  className = ''
}) => {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('ja-JP'));
  }, []);

  const trustBadges: TrustBadge[] = [
    {
      id: 'iso9001',
      name: 'ISO 9001:2015',
      description: '品質マネジメントシステム',
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      color: 'from-blue-600 to-blue-800',
      verified: true,
      details: '2016年認証取得、毎年監査実施'
    },
    {
      id: 'iso14001',
      name: 'ISO 14001:2015',
      description: '環境マネジメントシステム',
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      ),
      color: 'from-green-600 to-green-800',
      verified: true,
      details: '2018年認証取得、環境配慮型製造'
    },
    {
      id: 'established',
      name: '創業2015年',
      description: '9年の信頼と実績',
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      ),
      color: 'from-brand-red to-red-800',
      verified: true,
      details: '継続的な成長と技術革新'
    },
    {
      id: 'quality',
      name: '品質保証',
      description: '±0.005mm精度保証',
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
      color: 'from-yellow-600 to-yellow-800',
      verified: true,
      details: '全工程品質管理システム'
    },
    {
      id: 'emergency',
      name: '24時間対応',
      description: '緊急案件サポート',
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      ),
      color: 'from-purple-600 to-purple-800',
      verified: true,
      details: '緊急ホットライン完備'
    },
    {
      id: 'madeinJapan',
      name: 'Made in Japan',
      description: '日本国内製造',
      icon: (
        <span className="text-white font-bold text-xs font-japanese">日本<br/>製造</span>
      ),
      color: 'from-orange-600 to-orange-800',
      verified: true,
      details: '東京都港区自社工場'
    }
  ];

  const companyCredentials: CompanyCredential[] = [
    {
      type: '法人番号',
      value: '1234567890123',
      description: '国税庁法人番号公表サイトで確認可能'
    },
    {
      type: '建設業許可',
      value: '東京都知事許可（般-○○）第○○○○○○号',
      description: '東京都建設局許可'
    },
    {
      type: '労働保険',
      value: '適用事業所',
      description: '労働基準監督署届出済み'
    },
    {
      type: '社会保険',
      value: '適用事業所',
      description: '年金事務所届出済み'
    }
  ];

  const companyStats = [
    { label: 'プロジェクト完了数', value: '500+', color: 'text-blue-600' },
    { label: '顧客満足度', value: '98%', color: 'text-green-600' },
    { label: '継続取引企業', value: '100+', color: 'text-purple-600' },
    { label: '業界経験', value: '9年', color: 'text-brand-red' }
  ];

  const renderBadges = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {trustBadges.map((badge) => (
        <div
          key={badge.id}
          className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 trust-signal"
        >
          <div className={`w-16 h-16 bg-gradient-to-br ${badge.color} rounded-lg flex items-center justify-center mb-3 shadow-md`}>
            {badge.icon}
          </div>
          <h3 className="font-semibold text-gray-900 font-japanese text-sm mb-1">
            {badge.name}
          </h3>
          <p className="text-xs text-gray-600 font-japanese mb-2">
            {badge.description}
          </p>
          {badge.verified && (
            <div className="flex items-center text-xs text-green-600">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="font-japanese">認証済み</span>
            </div>
          )}
          {badge.details && (
            <p className="text-xs text-gray-500 font-japanese mt-1">
              {badge.details}
            </p>
          )}
        </div>
      ))}
    </div>
  );

  const renderCredentials = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 font-japanese mb-4">
        企業認証・許可情報
      </h3>
      <div className="space-y-4">
        {companyCredentials.map((credential, index) => (
          <div key={index} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 font-japanese">
                {credential.type}
              </h4>
              <p className="text-sm text-gray-700 font-mono">
                {credential.value}
              </p>
              <p className="text-xs text-gray-500 font-japanese mt-1">
                {credential.description}
              </p>
            </div>
            <div className="text-green-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      {companyStats.map((stat, index) => (
        <div key={index} className="trust-signal">
          <div className={`text-3xl font-bold ${stat.color} mb-2`}>
            {stat.value}
          </div>
          <p className="text-gray-600 font-japanese">{stat.label}</p>
        </div>
      ))}
    </div>
  );

  const renderCompact = () => (
    <div className="flex items-center justify-center space-x-6 p-4 bg-white rounded-lg shadow-lg">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="text-sm font-japanese text-gray-700">ISO認証</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-brand-red to-red-800 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xs">2015</span>
        </div>
        <span className="text-sm font-japanese text-gray-700">創業9年</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-800 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xs">98%</span>
        </div>
        <span className="text-sm font-japanese text-gray-700">満足度</span>
      </div>
    </div>
  );

  return (
    <div className={`${className}`}>
      {variant === 'badges' && renderBadges()}
      {variant === 'credentials' && renderCredentials()}
      {variant === 'stats' && renderStats()}
      {variant === 'compact' && renderCompact()}

      {/* Company Seal */}
      {showSeal && (
        <div className="flex justify-center mt-8">
          <div className="company-seal">
            <div className="text-center">
              <div className="text-xs leading-tight">テイク</div>
              <div className="text-xs leading-tight">パーツ</div>
            </div>
          </div>
        </div>
      )}

      {/* QR Code */}
      {showQRCode && (
        <div className="flex justify-center mt-6">
          <div className="qr-code">
            <div className="w-20 h-20 bg-white border-2 border-gray-300 flex items-center justify-center">
              <span className="text-xs text-gray-500 font-japanese">QRコード</span>
            </div>
          </div>
          <div className="ml-4 text-sm font-japanese">
            <p className="text-gray-700">スマートフォンで</p>
            <p className="text-gray-700">連絡先を保存</p>
          </div>
        </div>
      )}

      {/* Last Updated */}
      {showLastUpdated && (
        <div className="text-center mt-6 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 font-japanese">
            最終更新日：{currentDate} | 
            <Link href="/about" className="text-brand-red hover:underline ml-1">
              企業情報詳細
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default TrustSignals;