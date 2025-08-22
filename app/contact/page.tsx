'use client';

import type { Metadata } from 'next';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    inquiryType: '',
    projectDetails: '',
    material: '',
    quantity: '',
    deadline: '',
    budget: '',
    message: '',
    attachments: null as File[] | null,
    privacyAgreed: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, attachments: files }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      // Reset form
      setFormData({
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        inquiryType: '',
        projectDetails: '',
        material: '',
        quantity: '',
        deadline: '',
        budget: '',
        message: '',
        attachments: null,
        privacyAgreed: false
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
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
              お問い合わせ
              <span className="block text-lg md:text-xl font-normal mt-4 opacity-90">
                Contact Us
              </span>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              技術的なご相談から見積もりまで、<br />
              専門スタッフが丁寧にサポートいたします
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              各種お問い合わせ方法
            </h2>
            <p className="text-lg text-gray-600">
              お急ぎの場合はお電話、詳細なご相談はフォームをご利用ください
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <ContactMethodCard key={index} method={method} />
            ))}
          </div>
        </div>
      </section>

      {/* Business Hours & Calendar */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Business Hours */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 text-brand-red mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                営業時間・休業日
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">平日</span>
                  <span className="text-brand-red font-semibold">9:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">土曜日</span>
                  <span className="text-gray-600">休業</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-900">日曜・祝日</span>
                  <span className="text-gray-600">休業</span>
                </div>
                <div className="mt-6 p-4 bg-brand-red/10 rounded-lg">
                  <h4 className="font-semibold text-brand-red mb-2">年末年始休業</h4>
                  <p className="text-sm text-gray-700">12月29日〜1月3日</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">ゴールデンウィーク</h4>
                  <p className="text-sm text-gray-700">カレンダー通り（要確認）</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">夏季休業</h4>
                  <p className="text-sm text-gray-700">8月13日〜8月16日</p>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 text-brand-red mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                緊急時連絡先
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">緊急対応ホットライン</h4>
                  <p className="text-red-700 font-mono text-lg">080-1234-5678</p>
                  <p className="text-sm text-red-600 mt-1">営業時間外の緊急案件専用</p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">対応可能な緊急案件</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-brand-red rounded-full mt-2"></div>
                      <span>製造ライン停止による緊急修理部品</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-brand-red rounded-full mt-2"></div>
                      <span>航空宇宙・医療機器等の緊急案件</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-brand-red rounded-full mt-2"></div>
                      <span>品質不具合による緊急対応</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>注意：</strong>緊急対応は割増料金（+50%）が適用されます。
                    事前にお見積もりをご確認ください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              技術相談・見積もり依頼フォーム
            </h2>
            <p className="text-lg text-gray-600">
              詳細なご要望をお聞かせください。専門スタッフが適切なソリューションをご提案いたします
            </p>
          </div>

          {submitStatus === 'success' && (
            <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-green-800 font-semibold">お問い合わせを受付いたしました</h3>
                  <p className="text-green-700 text-sm mt-1">2営業日以内にご連絡いたします。</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">企業・お客様情報</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                    会社名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors duration-200"
                    placeholder="株式会社〇〇"
                  />
                </div>
                <div>
                  <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-2">
                    ご担当者様名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contactPerson"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors duration-200"
                    placeholder="田中 太郎"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors duration-200"
                    placeholder="tanaka@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    電話番号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors duration-200"
                    placeholder="03-1234-5678"
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">プロジェクト詳細</h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                    お問い合わせ種別 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors duration-200"
                  >
                    <option value="">選択してください</option>
                    <option value="quote">見積もり依頼</option>
                    <option value="prototype">プロトタイプ製作</option>
                    <option value="mass-production">量産依頼</option>
                    <option value="technical-consultation">技術相談</option>
                    <option value="quality-issue">品質に関するお問い合わせ</option>
                    <option value="partnership">協業・パートナーシップ</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="projectDetails" className="block text-sm font-medium text-gray-700 mb-2">
                    製品・部品詳細 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="projectDetails"
                    name="projectDetails"
                    rows={4}
                    value={formData.projectDetails}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors duration-200"
                    placeholder="製品の用途、寸法、精度要求、特殊な要件等を詳しくお書きください"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="material" className="block text-sm font-medium text-gray-700 mb-2">
                      材料
                    </label>
                    <select
                      id="material"
                      name="material"
                      value={formData.material}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors duration-200"
                    >
                      <option value="">選択してください</option>
                      <option value="stainless">ステンレス鋼</option>
                      <option value="aluminum">アルミニウム合金</option>
                      <option value="carbon-steel">炭素鋼</option>
                      <option value="tool-steel">工具鋼</option>
                      <option value="inconel">インコネル</option>
                      <option value="titanium">チタン合金</option>
                      <option value="brass">真鍮・銅合金</option>
                      <option value="resin">樹脂材料</option>
                      <option value="other">その他</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                      数量
                    </label>
                    <input
                      type="text"
                      id="quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors duration-200"
                      placeholder="例：100個、月産1000個"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                      納期希望
                    </label>
                    <input
                      type="text"
                      id="deadline"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors duration-200"
                      placeholder="例：2024年3月末、可能な限り早急に"
                    />
                  </div>
                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                      予算感
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors duration-200"
                    >
                      <option value="">選択してください</option>
                      <option value="under-10">10万円未満</option>
                      <option value="10-50">10万円〜50万円</option>
                      <option value="50-100">50万円〜100万円</option>
                      <option value="100-500">100万円〜500万円</option>
                      <option value="over-500">500万円以上</option>
                      <option value="discuss">要相談</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">追加情報・ファイル添付</h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    その他ご要望・メッセージ
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors duration-200"
                    placeholder="図面の有無、特殊な要件、過去の取引実績等がございましたらお書きください"
                  />
                </div>

                <div>
                  <label htmlFor="attachments" className="block text-sm font-medium text-gray-700 mb-2">
                    ファイル添付（図面・仕様書等）
                  </label>
                  <input
                    type="file"
                    id="attachments"
                    name="attachments"
                    onChange={handleFileChange}
                    multiple
                    accept=".pdf,.dwg,.step,.stp,.igs,.iges,.jpg,.png"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors duration-200"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    対応形式：PDF, DWG, STEP, IGES, JPG, PNG（最大10MB）
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy Policy Agreement */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="privacyAgreed"
                  name="privacyAgreed"
                  checked={formData.privacyAgreed}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-4 h-4 text-brand-red bg-gray-100 border-gray-300 rounded focus:ring-brand-red"
                />
                <div className="text-sm">
                  <label htmlFor="privacyAgreed" className="font-medium text-gray-900">
                    個人情報の取り扱いについて同意する <span className="text-red-500">*</span>
                  </label>
                  <p className="text-gray-600 mt-1">
                    お客様の個人情報は、お問い合わせ対応および営業活動の目的でのみ使用し、
                    第三者への提供は行いません。詳しくは
                    <Link href="/privacy" className="text-brand-red hover:underline">プライバシーポリシー</Link>
                    をご確認ください。
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting || !formData.privacyAgreed}
                className="bg-brand-red text-white px-12 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-red/20"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>送信中...</span>
                  </div>
                ) : (
                  'お問い合わせを送信'
                )}
              </button>
              <p className="text-sm text-gray-500 mt-4">
                送信後、2営業日以内にご連絡いたします
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Access Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              アクセス・所在地
            </h2>
            <p className="text-lg text-gray-600">
              ご来社の際は事前にお電話でご連絡ください
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">所在地・連絡先</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">住所</h4>
                      <p className="text-gray-700">
                        〒123-4567<br />
                        東京都港区芝公園1-2-3 製造ビル5F
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">電話番号</h4>
                      <p className="text-gray-700 font-mono">03-1234-5678</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">メールアドレス</h4>
                      <p className="text-gray-700">info@take-parts-factory.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">交通アクセス</h3>
                <div className="space-y-3">
                  {accessInfo.map((access, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-brand-red rounded-full"></div>
                      <span className="text-gray-700">{access}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>駐車場：</strong>来客用5台完備（要予約）
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <p>Google Maps 埋め込み予定地</p>
                  <p className="text-sm mt-2">インタラクティブマップ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Contact Method Card Component
function ContactMethodCard({ method }: { method: typeof contactMethods[0] }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-4">
        <method.icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{method.description}</p>
      <div className="space-y-2">
        {method.details.map((detail, idx) => (
          <p key={idx} className="text-brand-red font-medium text-sm">{detail}</p>
        ))}
      </div>
      {method.urgent && (
        <div className="mt-4 p-2 bg-red-50 rounded-lg">
          <p className="text-red-600 text-xs font-medium">緊急対応可</p>
        </div>
      )}
    </div>
  );
}

// Sample data
const contactMethods = [
  {
    title: "電話でのお問い合わせ",
    description: "お急ぎの場合は直接お電話ください",
    details: ["03-1234-5678", "平日 9:00-18:00"],
    urgent: true,
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
      </svg>
    )
  },
  {
    title: "メールでのお問い合わせ",
    description: "詳細な資料添付が可能です",
    details: ["info@take-parts-factory.com", "24時間受付"],
    urgent: false,
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
      </svg>
    )
  },
  {
    title: "FAXでのお問い合わせ",
    description: "図面等の送付に便利",
    details: ["03-1234-5679", "24時間受信"],
    urgent: false,
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    title: "オンライン相談",
    description: "Teams・Zoom対応",
    details: ["要予約制", "平日 9:00-17:00"],
    urgent: false,
    icon: ({ className }: { className: string }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
      </svg>
    )
  }
];

const accessInfo = [
  "JR山手線・京浜東北線「浜松町駅」徒歩8分",
  "都営三田線・浅草線「御成門駅」徒歩5分",
  "都営大江戸線「赤羽橋駅」徒歩7分",
  "東京モノレール「浜松町駅」徒歩8分",
  "首都高速道路「芝公園IC」車で3分"
];