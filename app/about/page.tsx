import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Metadata for SEO optimization
export const metadata: Metadata = {
  title: '会社概要 - Take Parts Factory について',
  description: 'Take Parts Factoryの会社概要。2015年創業、従業員50名、ISO認証取得済みの精密CNC加工メーカー。企業理念、沿革、アクセス情報。',
  keywords: ['会社概要', '企業情報', 'CNC加工メーカー', '製造業', '創業2015年', 'ISO認証', '東京都港区'],
  openGraph: {
    title: '会社概要 - Take Parts Factory',
    description: '創業2015年、日本の精密製造技術を活かしたCNC加工のプロフェッショナル集団です。',
    images: ['/images/about-og.jpg'],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-brand-red to-red-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c16.569 0 30-13.431 30-30S46.569-30 30-30 0-16.569 0 0s13.431 30 30 30z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              会社概要
              <span className="block text-lg md:text-xl font-normal mt-4 opacity-90">
                About Take Parts Factory
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              創業2015年 - 日本の製造技術の伝統と革新を融合し、<br />
              お客様の期待を超える精密部品を創造し続けます
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                企業理念・ビジョン
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-brand-red mb-3">企業理念</h3>
                  <p className="text-gray-700 leading-relaxed">
                    日本の匠の技術と最新のテクノロジーを融合し、お客様の「作りたい」を「できる」に変える。
                    一つひとつの部品に込められた想いを大切にし、製造業の未来を切り拓いていきます。
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-red mb-3">ビジョン</h3>
                  <p className="text-gray-700 leading-relaxed">
                    2030年までに、日本を代表する精密加工メーカーとして、世界中のお客様から信頼される
                    パートナーとなり、ものづくりの新しい価値を創造し続けます。
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-red mb-3">行動指針</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-brand-red rounded-full mt-2"></div>
                      <span>品質第一 - 妥協のない品質管理で信頼を積み重ねる</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-brand-red rounded-full mt-2"></div>
                      <span>技術革新 - 常に最新技術を追求し、可能性を広げる</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-brand-red rounded-full mt-2"></div>
                      <span>顧客満足 - お客様の成功が私たちの成功</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-brand-red rounded-full mt-2"></div>
                      <span>環境配慮 - 持続可能な製造プロセスの実現</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-red rounded-full flex items-center justify-center text-white">
                <span className="text-lg font-bold">創業<br />2015年</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company History Timeline */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              会社沿革
            </h2>
            <p className="text-lg text-gray-600">
              創業から現在まで、着実な成長を続けてきた歩み
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-brand-red"></div>
            <div className="space-y-12">
              {companyHistory.map((event, index) => (
                <TimelineEvent key={index} event={event} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              会社データ
            </h2>
            <p className="text-lg text-gray-600">
              数字で見るTake Parts Factoryの実績
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              経営陣紹介
            </h2>
            <p className="text-lg text-gray-600">
              豊富な経験と専門知識を持つリーダーシップチーム
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((member, index) => (
              <LeadershipCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Awards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              認証・受賞歴
            </h2>
            <p className="text-lg text-gray-600">
              品質と信頼性を証明する各種認証・表彰
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <CertificationCard key={index} certification={cert} />
            ))}
          </div>
        </div>
      </section>

      {/* Facility Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              施設案内
            </h2>
            <p className="text-lg text-gray-600">
              最新設備を完備した生産拠点
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">本社・工場概要</h3>
              <div className="space-y-4">
                {facilityInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{info.label}</h4>
                      <p className="text-gray-600 text-sm">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">アクセス情報</h3>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">所在地</h4>
                  <p className="text-gray-700">
                    〒123-4567<br />
                    東京都港区芝公園1-2-3 製造ビル5F
                  </p>
                </div>
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">交通アクセス</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• JR山手線・京浜東北線「浜松町駅」徒歩8分</li>
                    <li>• 都営三田線・浅草線「御成門駅」徒歩5分</li>
                    <li>• 都営大江戸線「赤羽橋駅」徒歩7分</li>
                    <li>• 東京モノレール「浜松町駅」徒歩8分</li>
                  </ul>
                </div>
                <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Google Maps 埋め込み予定地</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-brand-red text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Take Parts Factoryと共に
          </h2>
          <p className="text-xl mb-8 opacity-90">
            私たちと一緒に、ものづくりの未来を創造しませんか？<br />
            お客様のプロジェクトをサポートいたします。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/services" 
              className="bg-white text-brand-red px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              サービス詳細を見る
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-brand-red transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Timeline Event Component
function TimelineEvent({ event, index }: { event: typeof companyHistory[0], index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`relative flex items-center ${isEven ? 'justify-start' : 'justify-end'}`}>
      <div className={`w-full ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'} max-w-md`}>
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300">
          <div className="text-brand-red font-bold text-lg mb-2">{event.year}</div>
          <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
          <p className="text-gray-600 text-sm">{event.description}</p>
        </div>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-brand-red rounded-full border-4 border-white shadow-lg"></div>
    </div>
  );
}

// Stat Card Component
function StatCard({ stat }: { stat: typeof companyStats[0] }) {
  return (
    <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-4">
        <stat.icon className="w-8 h-8 text-white" />
      </div>
      <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
      <div className="text-gray-600">{stat.label}</div>
    </div>
  );
}

// Leadership Card Component
function LeadershipCard({ member }: { member: typeof leadership[0] }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="aspect-square bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
        <p className="text-brand-red font-medium mb-3">{member.position}</p>
        <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
      </div>
    </div>
  );
}

// Certification Card Component
function CertificationCard({ certification }: { certification: typeof certifications[0] }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="w-16 h-16 bg-gradient-to-br from-brand-red to-red-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <certification.icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{certification.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{certification.description}</p>
      <p className="text-brand-red text-xs font-medium">{certification.date}</p>
    </div>
  );
}

// Sample data
const companyHistory = [
  {
    year: "2015年",
    title: "会社設立",
    description: "東京都港区にて創業。CNC旋盤加工事業を開始。"
  },
  {
    year: "2016年",
    title: "ISO 9001認証取得",
    description: "品質マネジメントシステムの国際規格認証を取得。"
  },
  {
    year: "2017年",
    title: "設備増強",
    description: "最新CNC旋盤3台を導入。生産能力を2倍に拡大。"
  },
  {
    year: "2018年",
    title: "ISO 14001認証取得",
    description: "環境マネジメントシステム認証を取得。"
  },
  {
    year: "2019年",
    title: "技術革新賞受賞",
    description: "東京都中小企業技術革新賞を受賞。"
  },
  {
    year: "2020年",
    title: "自動化システム導入",
    description: "24時間無人運転システムを構築。"
  },
  {
    year: "2022年",
    title: "従業員50名体制",
    description: "技術者を中心に組織を拡大。"
  },
  {
    year: "2024年",
    title: "AI品質管理導入",
    description: "AIによる品質管理システムを導入。"
  }
];

const companyStats = [
  {
    value: "2015年",
    label: "創業年",
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    value: "50名",
    label: "従業員数",
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
      </svg>
    )
  },
  {
    value: "10,000+",
    label: "月産能力（個）",
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    value: "2件",
    label: "ISO認証",
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    )
  }
];

const leadership = [
  {
    name: "田中 太郎",
    position: "代表取締役社長",
    bio: "大手機械メーカーで20年の経験を積み、2015年にTake Parts Factoryを創業。製造技術のエキスパートとして業界をリード。"
  },
  {
    name: "佐藤 花子",
    position: "取締役副社長 兼 技術統括",
    bio: "精密加工分野で15年の実績。品質管理とプロセス改善のスペシャリストとして組織の技術力向上を牽引。"
  },
  {
    name: "山田 次郎",
    position: "製造部長",
    bio: "現場一筋25年の製造のプロフェッショナル。安全で効率的な生産体制の構築に貢献。"
  }
];

const certifications = [
  {
    name: "ISO 9001:2015",
    description: "品質マネジメントシステム",
    date: "2016年認証取得",
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    name: "ISO 14001:2015",
    description: "環境マネジメントシステム",
    date: "2018年認証取得",
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    name: "技術革新賞",
    description: "東京都中小企業技術革新賞",
    date: "2019年受賞",
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    )
  }
];

const facilityInfo = [
  {
    label: "建物面積",
    value: "1,200㎡（本社・工場含む）",
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    label: "CNC設備",
    value: "12台（最新複合加工機含む）",
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
      </svg>
    )
  },
  {
    label: "測定機器",
    value: "三次元測定機、表面粗さ計等完備",
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    label: "稼働時間",
    value: "24時間無人運転対応",
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    label: "品質管理",
    value: "恒温室完備（20±1℃）",
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    label: "駐車場",
    value: "来客用5台完備",
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8zM3 5a2 2 0 012-2h1a3 3 0 006 0h1a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM5 5h10v6H5V5z" clipRule="evenodd" />
      </svg>
    )
  }
];