import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Metadata for SEO optimization
export const metadata: Metadata = {
  title: 'サービス案内 - 精密CNC旋盤加工・部品製造',
  description: 'Take Parts Factoryの技術サービス詳細。CNC旋盤加工、精密部品製造、プロトタイプから量産まで対応。ISO認証取得済みの高品質製造サービス。',
  keywords: ['CNC旋盤加工', '精密部品製造', '金属加工', '技術サービス', 'ISO認証', 'プロトタイプ', '量産対応'],
  openGraph: {
    title: 'サービス案内 - Take Parts Factory',
    description: '精密CNC旋盤加工から部品製造まで、お客様のニーズに合わせた技術サービスをご提供いたします。',
    images: ['/images/services-og.jpg'],
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Japanese aesthetic */}
      <section className="relative bg-gradient-to-r from-brand-red to-red-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20zm-30 0c0 5.523 4.477 10 10 10s10-4.477 10-10-4.477-10-10-10-10 4.477-10 10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              技術サービス案内
              <span className="block text-lg md:text-xl font-normal mt-4 opacity-90">
                Technical Services Overview
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              創業2015年以来、日本の製造技術の粋を集めた<br />
              高精度CNC旋盤加工サービスをご提供いたします
            </p>
          </div>
        </div>
      </section>

      {/* Service Overview Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              主要サービス一覧
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              プロトタイプから量産まで、お客様の多様なニーズにお応えする包括的な製造サービス
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications Table */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              技術仕様・加工能力
            </h2>
            <p className="text-lg text-gray-600">
              高精度加工を実現する最新設備と技術仕様
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-brand-red text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">項目</th>
                    <th className="px-6 py-4 text-left font-semibold">仕様</th>
                    <th className="px-6 py-4 text-left font-semibold">備考</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {technicalSpecs.map((spec, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 font-medium text-gray-900">{spec.item}</td>
                      <td className="px-6 py-4 text-gray-700">{spec.specification}</td>
                      <td className="px-6 py-4 text-gray-600 text-sm">{spec.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              主要設備紹介
            </h2>
            <p className="text-lg text-gray-600">
              最新のCNC旋盤と精密測定機器を完備
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipment.map((item, index) => (
              <EquipmentCard key={index} equipment={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Material Capabilities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              対応材料・加工精度
            </h2>
            <p className="text-lg text-gray-600">
              多様な材料に対応し、ミクロン単位の高精度加工を実現
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Materials */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">対応材料</h3>
              <div className="grid grid-cols-2 gap-4">
                {materials.map((material, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="w-3 h-3 bg-brand-red rounded-full"></div>
                    <span className="font-medium text-gray-800">{material}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Precision Standards */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">精度基準</h3>
              <div className="space-y-4">
                {precisionStandards.map((standard, index) => (
                  <div key={index} className="border-l-4 border-brand-red pl-4">
                    <h4 className="font-semibold text-gray-900">{standard.type}</h4>
                    <p className="text-gray-600 text-sm mt-1">{standard.precision}</p>
                    <p className="text-gray-500 text-xs mt-1">{standard.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Certifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              品質認証・保証体制
            </h2>
            <p className="text-lg text-gray-600">
              国際規格に準拠した品質管理システムで確実な品質をお約束
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">ISO 9001:2015</h3>
              <p className="text-gray-600">品質マネジメントシステム認証取得済み</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">ISO 14001:2015</h3>
              <p className="text-gray-600">環境マネジメントシステム認証取得済み</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">品質保証</h3>
              <p className="text-gray-600">全工程での品質検査・トレーサビリティ完備</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-brand-red text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            技術的なご相談・お見積もり
          </h2>
          <p className="text-xl mb-8 opacity-90">
            専門スタッフが丁寧にご対応いたします。<br />
            まずはお気軽にお問い合わせください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-brand-red px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              お問い合わせフォーム
            </Link>
            <a 
              href="tel:+81-3-1234-5678" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-brand-red transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/20"
            >
              電話でのお問い合わせ
            </a>
          </div>
          <p className="text-sm mt-6 opacity-75">
            営業時間：平日 9:00-18:00（土日祝日休み）
          </p>
        </div>
      </section>
    </div>
  );
}

// Service Card Component
function ServiceCard({ service }: { service: typeof services[0] }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
      <div className="p-6">
        <div className="w-12 h-12 bg-brand-red rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <service.icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>
        <div className="space-y-2">
          {service.features.map((feature, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-brand-red rounded-full"></div>
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Equipment interfaces
interface EquipmentSpec {
  label: string;
  value: string;
}

interface Equipment {
  name: string;
  description: string;
  specs: EquipmentSpec[];
}

// Equipment Card Component
function EquipmentCard({ equipment }: { equipment: Equipment }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="aspect-video bg-gray-200 relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{equipment.name}</h3>
        <p className="text-gray-600 mb-4">{equipment.description}</p>
        <div className="space-y-2">
          {equipment.specs.map((spec, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-gray-600">{spec.label}</span>
              <span className="font-medium text-gray-900">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Sample data
const services = [
  {
    title: "CNC旋盤加工",
    description: "高精度CNC旋盤による精密部品加工。φ0.5mm〜φ200mmまで対応可能。",
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
      </svg>
    ),
    features: [
      "φ0.5mm〜φ200mm対応",
      "±0.005mm精度保証",
      "24時間無人運転可能",
      "多品種少量生産対応"
    ]
  },
  {
    title: "プロトタイプ製作",
    description: "設計段階からの製作サポート。1個からでも高品質な試作品をお作りします。",
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    features: [
      "設計相談から対応",
      "最短3日納期",
      "材料提案サポート",
      "コストダウン提案"
    ]
  },
  {
    title: "量産対応",
    description: "安定した品質での量産体制。月産10,000個まで対応可能です。",
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
      </svg>
    ),
    features: [
      "月産10,000個対応",
      "品質の安定性保証",
      "納期管理システム",
      "コスト最適化"
    ]
  }
];

const technicalSpecs = [
  {
    item: "最大加工径",
    specification: "φ200mm",
    note: "チャック把握径"
  },
  {
    item: "最小加工径",
    specification: "φ0.5mm",
    note: "精密小径加工対応"
  },
  {
    item: "加工精度",
    specification: "±0.005mm",
    note: "寸法公差保証"
  },
  {
    item: "表面粗さ",
    specification: "Ra0.1μm以下",
    note: "鏡面仕上げ対応"
  },
  {
    item: "加工長さ",
    specification: "最大300mm",
    note: "長尺部品対応"
  },
  {
    item: "材料硬度",
    specification: "HRC60まで",
    note: "硬質材料加工可能"
  }
];

const equipment = [
  {
    name: "DMG MORI NTX2000",
    description: "最新型複合加工機による高精度加工",
    specs: [
      { label: "最大回転数", value: "6,000rpm" },
      { label: "加工径", value: "φ200mm" },
      { label: "精度", value: "±0.003mm" }
    ]
  },
  {
    name: "MAZAK QUICK TURN",
    description: "高速高精度CNC旋盤",
    specs: [
      { label: "最大回転数", value: "5,000rpm" },
      { label: "加工径", value: "φ150mm" },
      { label: "精度", value: "±0.005mm" }
    ]
  },
  {
    name: "三次元測定機",
    description: "ミツトヨ製高精度測定システム",
    specs: [
      { label: "測定精度", value: "±0.001mm" },
      { label: "測定範囲", value: "500×400×300mm" },
      { label: "温度管理", value: "20±1℃" }
    ]
  }
];

const materials = [
  "ステンレス鋼 (SUS304, SUS316等)",
  "アルミニウム合金 (A5052, A7075等)",
  "炭素鋼 (S45C, SCM440等)",
  "工具鋼 (SKD11, SKH51等)",
  "インコネル (Inconel 718等)",
  "チタン合金 (Ti-6Al-4V等)",
  "真鍮・銅合金",
  "樹脂材料 (PEEK, POM等)"
];

const precisionStandards = [
  {
    type: "寸法精度",
    precision: "±0.005mm",
    note: "標準公差、特殊要求にも対応"
  },
  {
    type: "真円度",
    precision: "0.003mm以下",
    note: "高精度回転体加工"
  },
  {
    type: "表面粗さ",
    precision: "Ra0.1μm〜Ra3.2μm",
    note: "用途に応じた最適仕上げ"
  },
  {
    type: "平行度・直角度",
    precision: "0.01mm以下",
    note: "幾何公差対応"
  }
];