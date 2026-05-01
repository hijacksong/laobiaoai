import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export default function Contact() {
  const [searchParams] = useSearchParams()
  const productName = searchParams.get('product') || ''

  return (
    <>
      <div className="min-h-screen pt-20 pb-10 px-4">
        <div className="container mx-auto max-w-lg">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="text-6xl mb-4">🤝</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              联系老表
            </h1>
            <p className="text-gray-600 text-lg">
              {productName
                ? `你对「${productName}」感兴趣？加老表微信，马上安排！`
                : '加老表微信，一起学AI！'}
            </p>
          </div>

          {/* WeChat Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-2 border-green-400">
            <div className="text-5xl mb-4">💚</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              微信扫码或搜索添加
            </h2>

            {/* WeChat ID */}
            <div className="bg-green-50 rounded-xl p-6 my-6 border-2 border-dashed border-green-300">
              <p className="text-sm text-green-600 mb-2">微信号</p>
              <p className="text-3xl font-bold text-green-700 tracking-wider select-all">
                aixdycom
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('aixdycom')
                  alert('✅ 已复制微信号：aixdycom')
                }}
                className="mt-3 px-6 py-2 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition-colors cursor-pointer"
              >
                📋 复制微信号
              </button>
            </div>

            {/* QR Code Placeholder */}
            <div className="bg-gray-100 rounded-xl p-8 mb-4">
              <div className="text-8xl mb-3">📱</div>
              <p className="text-gray-500 text-sm">
                微信扫码添加老表
              </p>
              <p className="text-gray-400 text-xs mt-1">
                （请将微信收款码/二维码保存为 public/qrcode/wechat.png）
              </p>
            </div>

            {productName && (
              <div className="bg-primary-50 rounded-xl p-4 mt-6">
                <p className="text-primary-700 font-semibold">
                  💡 添加时备注「{productName}」，优先通过
                </p>
              </div>
            )}
          </div>

          {/* Other Contact */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <a
              href="https://www.xiaohongshu.com/user/profile/老表AI"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-4 text-center shadow hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="text-3xl mb-2">📕</div>
              <div className="font-semibold text-gray-800">小红书</div>
              <div className="text-sm text-gray-500">老表AI</div>
            </a>
            <a
              href="https://www.zhihu.com/people/老表AI"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-4 text-center shadow hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="text-3xl mb-2">💡</div>
              <div className="font-semibold text-gray-800">知乎</div>
              <div className="text-sm text-gray-500">老表AI</div>
            </a>
          </div>

          {/* Back */}
          <div className="text-center mt-8">
            <Link
              to="/courses"
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              ← 返回课程页面
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
