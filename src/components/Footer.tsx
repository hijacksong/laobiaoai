import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-4xl">👋</span>
              <span className="text-2xl font-bold">老表AI</span>
            </Link>
            <p className="text-gray-400">
              用人话讲AI<br />
              你身边最靠谱的AI老表
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">快速链接</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/courses" className="hover:text-primary-400 transition-colors">老表教学</Link></li>
              <li><Link to="/tools" className="hover:text-primary-400 transition-colors">老表工具箱</Link></li>
              <li><Link to="/chat" className="hover:text-primary-400 transition-colors">老表问答</Link></li>
              <li><Link to="/community" className="hover:text-primary-400 transition-colors">老表社群</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-lg mb-4">学习资源</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/courses" className="hover:text-primary-400 transition-colors">免费课程</Link></li>
              <li><Link to="/courses" className="hover:text-primary-400 transition-colors">付费课程</Link></li>
              <li><Link to="/tools" className="hover:text-primary-400 transition-colors">AI工具</Link></li>
              <li><Link to="/courses" className="hover:text-primary-400 transition-colors">常见问题</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">联系老表</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <span>💬 微信：aixdycom</span>
                <span className="block text-xs text-gray-500 mt-0.5">添加微信，老表在线答疑</span>
              </li>
              <li>
                <a href="https://www.xiaohongshu.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
                  📕 小红书：老表AI
                </a>
              </li>
              <li>
                <a href="https://www.zhihu.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400 transition-colors">
                  💡 知乎：老表AI
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 老表AI. 用人话讲AI，让每个人都能玩转AI.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-primary-400 transition-colors">隐私政策</a>
            <a href="#" className="hover:text-primary-400 transition-colors">服务条款</a>
            <Link to="/community" className="hover:text-primary-400 transition-colors">关于我们</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
