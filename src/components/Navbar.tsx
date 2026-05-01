import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-3xl">👋</span>
            <span className="text-2xl font-bold text-primary-600">老表AI</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              首页
            </Link>
            <Link to="/tools" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              🛠️ 工具箱
            </Link>
            <Link to="/courses" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              🎓 课程
            </Link>
            <Link to="/chat" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              💬 问答
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/courses"
              className="px-6 py-2 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition-colors"
            >
              开始学习
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
