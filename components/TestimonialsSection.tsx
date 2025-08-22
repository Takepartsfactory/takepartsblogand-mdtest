'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: string;
  companyName: string;
  contactPerson: string;
  position: string;
  industry: string;
  project: string;
  testimonial: string;
  rating: number;
  projectDetails: {
    material: string;
    quantity: string;
    precision: string;
    deliveryTime: string;
  };
  results: {
    costReduction?: string;
    qualityImprovement?: string;
    deliverySpeed?: string;
    customerSatisfaction?: string;
  };
  logoUrl?: string;
  establishedYear?: string;
  projectDate: string;
}

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  technicalSpecs: {
    material: string;
    dimensions: string;
    tolerance: string;
    surfaceFinish: string;
    quantity: string;
    deliveryTime: string;
  };
  beforeImageUrl?: string;
  afterImageUrl?: string;
  processImages?: string[];
  tags: string[];
  featured: boolean;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
  caseStudies?: CaseStudy[];
  showCaseStudies?: boolean;
  maxItems?: number;
  className?: string;
}

// Star rating render function
const renderStars = (rating: number) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials = defaultTestimonials,
  caseStudies = defaultCaseStudies,
  showCaseStudies = true,
  maxItems = 6,
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<'testimonials' | 'cases'>('testimonials');
  const [currentSeason, setCurrentSeason] = useState<'spring' | 'summer' | 'autumn' | 'winter'>('spring');

  useEffect(() => {
    // Determine current season for decorative elements
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) setCurrentSeason('spring');
    else if (month >= 5 && month <= 7) setCurrentSeason('summer');
    else if (month >= 8 && month <= 10) setCurrentSeason('autumn');
    else setCurrentSeason('winter');
  }, []);

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-japanese">
            お客様の声・導入事例
          </h2>
          <p className="text-lg text-gray-600 font-japanese">
            信頼をお寄せいただいているお客様の生の声と具体的な成功事例をご紹介いたします
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-6 py-3 rounded-lg font-medium font-japanese transition-all duration-300 ${
                activeTab === 'testimonials'
                  ? 'bg-brand-red text-white shadow-lg'
                  : 'text-gray-600 hover:text-brand-red hover:bg-gray-50'
              }`}
            >
              お客様の声
            </button>
            {showCaseStudies && (
              <button
                onClick={() => setActiveTab('cases')}
                className={`px-6 py-3 rounded-lg font-medium font-japanese transition-all duration-300 ${
                  activeTab === 'cases'
                    ? 'bg-brand-red text-white shadow-lg'
                    : 'text-gray-600 hover:text-brand-red hover:bg-gray-50'
                }`}
              >
                導入事例
              </button>
            )}
          </div>
        </div>

        {/* Testimonials Grid */}
        {activeTab === 'testimonials' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, maxItems).map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
                season={currentSeason}
              />
            ))}
          </div>
        )}

        {/* Case Studies Grid */}
        {activeTab === 'cases' && showCaseStudies && (
          <div className="space-y-8">
            {caseStudies.slice(0, maxItems).map((caseStudy, index) => (
              <CaseStudyCard
                key={caseStudy.id}
                caseStudy={caseStudy}
                index={index}
                season={currentSeason}
              />
            ))}
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 font-japanese">信頼の実績</h3>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="trust-signal">
              <div className="text-3xl font-bold text-brand-red mb-2">500+</div>
              <p className="text-gray-600 font-japanese">プロジェクト完了数</p>
            </div>
            <div className="trust-signal">
              <div className="text-3xl font-bold text-brand-red mb-2">98%</div>
              <p className="text-gray-600 font-japanese">顧客満足度</p>
            </div>
            <div className="trust-signal">
              <div className="text-3xl font-bold text-brand-red mb-2">100+</div>
              <p className="text-gray-600 font-japanese">継続取引企業数</p>
            </div>
            <div className="trust-signal">
              <div className="text-3xl font-bold text-brand-red mb-2">9年</div>
              <p className="text-gray-600 font-japanese">業界実績</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonial Card Component
interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  season: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index, season }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 japanese-hover card-ripple ${`seasonal-${season}`}`}>
      {/* Company Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 font-japanese mb-1">
            {testimonial.companyName}
          </h3>
          <p className="text-sm text-gray-600 font-japanese">
            {testimonial.industry} | 創業{testimonial.establishedYear}年
          </p>
        </div>
        {testimonial.logoUrl && (
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <span className="text-xs text-gray-500">LOGO</span>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="mb-4">
        {renderStars(testimonial.rating)}
      </div>

      {/* Testimonial Text */}
      <blockquote className="text-gray-700 font-japanese mb-4 leading-relaxed">
        "{testimonial.testimonial}"
      </blockquote>

      {/* Project Details */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-gray-900 font-japanese mb-2">プロジェクト詳細</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="font-japanese">
            <span className="text-gray-500">材料:</span>
            <span className="ml-1 text-gray-700">{testimonial.projectDetails.material}</span>
          </div>
          <div className="font-japanese">
            <span className="text-gray-500">数量:</span>
            <span className="ml-1 text-gray-700">{testimonial.projectDetails.quantity}</span>
          </div>
          <div className="font-japanese">
            <span className="text-gray-500">精度:</span>
            <span className="ml-1 text-gray-700">{testimonial.projectDetails.precision}</span>
          </div>
          <div className="font-japanese">
            <span className="text-gray-500">納期:</span>
            <span className="ml-1 text-gray-700">{testimonial.projectDetails.deliveryTime}</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-2 mb-4">
        {Object.entries(testimonial.results).map(([key, value]) => (
          value && (
            <div key={key} className="flex items-center text-sm font-japanese">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-gray-700">{value}</span>
            </div>
          )
        ))}
      </div>

      {/* Contact Person */}
      <div className="border-t pt-4">
        <p className="text-sm font-japanese">
          <span className="font-medium text-gray-900">{testimonial.contactPerson}</span>
          <span className="text-gray-600 ml-2">{testimonial.position}</span>
        </p>
        <p className="text-xs text-gray-500 font-japanese mt-1">{testimonial.projectDate}</p>
      </div>
    </div>
  );
};

// Case Study Card Component
interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index: number;
  season: string;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ caseStudy, index, season }) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden japanese-hover ${`seasonal-${season}`}`}>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Content */}
        <div className="p-8">
          <div className="flex items-center mb-4">
            <span className="bg-brand-red text-white px-3 py-1 rounded-full text-xs font-medium font-japanese">
              {caseStudy.industry}
            </span>
            {caseStudy.featured && (
              <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium font-japanese ml-2">
                注目事例
              </span>
            )}
          </div>

          <h3 className="text-2xl font-bold text-gray-900 font-japanese mb-2">
            {caseStudy.title}
          </h3>
          <p className="text-gray-600 font-japanese mb-6">{caseStudy.subtitle}</p>

          {/* Challenge */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 font-japanese mb-2 flex items-center">
              <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              課題
            </h4>
            <p className="text-gray-700 font-japanese leading-relaxed">{caseStudy.challenge}</p>
          </div>

          {/* Solution */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 font-japanese mb-2 flex items-center">
              <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              解決策
            </h4>
            <p className="text-gray-700 font-japanese leading-relaxed">{caseStudy.solution}</p>
          </div>

          {/* Results */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 font-japanese mb-2 flex items-center">
              <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              成果
            </h4>
            <ul className="space-y-2">
              {caseStudy.results.map((result, idx) => (
                <li key={idx} className="flex items-start font-japanese">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">{result}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {caseStudy.tags.map((tag, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-japanese">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Technical Specs & Images */}
        <div className="p-8 bg-gray-50">
          <h4 className="font-semibold text-gray-900 font-japanese mb-4">技術仕様</h4>
          <div className="bg-white rounded-lg p-4 mb-6">
            <div className="space-y-3 text-sm">
              {Object.entries(caseStudy.technicalSpecs).map(([key, value]) => (
                <div key={key} className="flex justify-between font-japanese">
                  <span className="text-gray-600 capitalize">
                    {key === 'material' && '材料'}
                    {key === 'dimensions' && '寸法'}
                    {key === 'tolerance' && '公差'}
                    {key === 'surfaceFinish' && '表面仕上げ'}
                    {key === 'quantity' && '数量'}
                    {key === 'deliveryTime' && '納期'}
                  </span>
                  <span className="font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Before/After Images Placeholder */}
          <div className="space-y-4">
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-japanese">加工前後の比較画像</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sample Data
const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    companyName: '株式会社○○製作所',
    contactPerson: '田中 太郎',
    position: '製造部長',
    industry: '自動車部品製造',
    project: '高精度エンジン部品加工',
    testimonial: 'Take Parts Factoryさんには、従来の加工業者では実現できなかった±0.003mmの高精度加工を短納期で実現していただきました。品質管理体制も素晴らしく、安心してお任せできるパートナーです。',
    rating: 5,
    projectDetails: {
      material: 'インコネル718',
      quantity: '500個/月',
      precision: '±0.003mm',
      deliveryTime: '2週間'
    },
    results: {
      costReduction: 'コスト20%削減',
      qualityImprovement: '不良率0.1%以下',
      deliverySpeed: '納期短縮30%',
      customerSatisfaction: '満足度向上'
    },
    establishedYear: '1985',
    projectDate: '2024年3月'
  },
  {
    id: '2',
    companyName: '△△エレクトロニクス株式会社',
    contactPerson: '佐藤 花子',
    position: '開発マネージャー',
    industry: '精密機器製造',
    project: '医療機器用精密部品',
    testimonial: '医療機器の重要部品ということで、極めて高い品質要求でしたが、期待を上回る仕上がりでした。技術的な相談にも親身に対応いただき、設計段階から最適化提案をいただけたのが印象的です。',
    rating: 5,
    projectDetails: {
      material: 'SUS316L',
      quantity: '100個',
      precision: '±0.005mm',
      deliveryTime: '1週間'
    },
    results: {
      qualityImprovement: 'FDA基準クリア',
      customerSatisfaction: '顧客満足度98%',
      deliverySpeed: '予定より3日早納'
    },
    establishedYear: '1998',
    projectDate: '2024年2月'
  },
  {
    id: '3',
    companyName: '◇◇航空工業株式会社',
    contactPerson: '山田 次郎',
    position: '品質保証部長',
    industry: '航空宇宙',
    project: '航空機部品加工',
    testimonial: '航空宇宙分野の厳格な品質基準にも完全対応していただきました。トレーサビリティも完璧で、監査対応も安心です。今後も長期的なパートナーとしてお付き合いしたいと思います。',
    rating: 5,
    projectDetails: {
      material: 'チタン合金',
      quantity: '50個',
      precision: '±0.002mm',
      deliveryTime: '3週間'
    },
    results: {
      qualityImprovement: 'AS9100認証基準適合',
      customerSatisfaction: '完全満足',
      costReduction: '従来比15%コストダウン'
    },
    establishedYear: '1975',
    projectDate: '2024年1月'
  }
];

const defaultCaseStudies: CaseStudy[] = [
  {
    id: '1',
    title: '自動車エンジン部品の高精度加工',
    subtitle: '従来不可能とされた複雑形状の実現',
    industry: '自動車',
    challenge: '従来の加工方法では実現できない複雑な内部形状と±0.002mmの高精度を両立する必要がありました。また、量産体制での品質安定性も課題でした。',
    solution: '最新の複合加工機と独自の治具設計により、一括加工を実現。AI品質管理システムを導入し、全数検査による品質保証体制を構築しました。',
    results: [
      '加工精度±0.002mmを安定して実現',
      '製造工程を40%短縮',
      '品質不良率を0.05%以下に改善',
      '月産能力を3倍に向上'
    ],
    technicalSpecs: {
      material: 'アルミニウム合金 A7075',
      dimensions: 'φ45×120mm',
      tolerance: '±0.002mm',
      surfaceFinish: 'Ra0.8μm',
      quantity: '1000個/月',
      deliveryTime: '2週間'
    },
    tags: ['高精度加工', '量産対応', 'AI品質管理', '複合加工'],
    featured: true
  },
  {
    id: '2',
    title: '医療機器用インプラント部品',
    subtitle: '生体適合性材料の精密加工',
    industry: '医療機器',
    challenge: '生体適合性が要求される特殊材料の加工で、表面品質と寸法精度の両立が困難でした。また、FDA規制への完全対応も必要でした。',
    solution: 'クリーンルーム環境での加工と、材料特性を考慮した専用工具の開発により、要求仕様を満たす加工技術を確立しました。',
    results: [
      'FDA基準完全クリア',
      '表面粗さRa0.1μm以下を実現',
      '生体適合性試験100%合格',
      '製品承認期間を30%短縮'
    ],
    technicalSpecs: {
      material: 'チタン合金 Ti-6Al-4V ELI',
      dimensions: 'φ12×25mm',
      tolerance: '±0.003mm',
      surfaceFinish: 'Ra0.1μm',
      quantity: '200個/月',
      deliveryTime: '3週間'
    },
    tags: ['医療機器', 'FDA対応', 'クリーンルーム', '生体適合性'],
    featured: true
  }
];

export default TestimonialsSection;