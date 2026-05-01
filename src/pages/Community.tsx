import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { handlePayment } from '../utils/payment'

export default function Community() {
  const scrollToPricing = () => {
    const el = document.getElementById('pricing')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const benefits = [
    {
      icon: '👥',
      title: '10000+老表',
      description: '和10000+志同道合的老表一起学习，互相帮助，共同进步'
    },
    {
      icon: '💬',
      title: '每日交流',
      description: '分享学习心得、项目经验、赚钱案例，每天都有新收获'
    },
    {
      icon: '🎓',
      title: '老表答疑',
      description: '老表每周在线答疑，解答你的疑问，分享最新AI资讯'
    },
    {
      icon: '🎁',
      title: '专属福利',
      description: '独家资料、工具推荐、优惠活动，社群成员专享'
    },
    {
      icon: '🚀',
      title: '项目合作',
      description: '找合作伙伴、接项目、找客户，社群就是你的资源库'
    },
    {
      icon: '📚',
      title: '学习资料',
      description: '精选教程、案例库、工具清单，持续更新，免费下载'
    }
  ]

  const testimonials = [
    {
      name: '小李',
      avatar: '👨',
      role: 'AI文案师',
      content: '加入社群3个月，从小白到月入8000+。老表们都很热心，有问题随时能得到解答。',
      income: '月入8000+'
    },
    {
      name: '小王',
      avatar: '👩',
      role: 'AI绘画师',
      content: '社群里认识了很多大佬，学到了很多实战技巧。现在接单稳定，感谢老表！',
      income: '月入12000+'
    },
    {
      name: '老张',
      avatar: '👨‍💼',
      role: '自由职业者',
      content: '用AI提升工作效率后，每天节省2小时。社群的资源和人脉太值了！',
      income: '效率提升200%'
    }
  ]

  const activities = [
    {
      title: '每周直播',
      time: '每周三晚8点',
      description: '老表在线分享最新AI工具和技巧，现场答疑'
    },
    {
      title: '每日打卡',
      time: '每天',
      description: '学习打卡，养成习惯，坚持就有收获'
    },
    {
      title: '月度分享',
      time: '每月最后一周',
      description: '优秀学员分享赚钱经验，真实案例，可复制'
    },
    {
      title: '线下聚会',
      time: '不定期',
      description: '各地老表线下见面，交流合作，拓展人脉'
    }
  ]

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-20 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              👥 加入老表社群
            </h1>
            <p className="text-2xl mb-8 text-primary-100">
              10000+老表在这里学习、交流、赚钱
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={scrollToPricing} className="px-8 py-4 bg-white text-primary-600 rounded-full font-semibold text-lg hover:bg-primary-50 transition-all shadow-lg">
                立即加入社群
              </button>
              <Link
                to="/chat"
                className="px-8 py-4 bg-primary-700 text-white rounded-full font-semibold text-lg hover:bg-primary-800 transition-all border-2 border-white/30"
              >
                咨询老表
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-primary-100">
              <div className="text-center">
                <div className="text-4xl font-bold">10,000+</div>
                <div className="text-sm">社群成员</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">500+</div>
                <div className="text-sm">每日活跃</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">100+</div>
                <div className="text-sm">成功案例</div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                社群能给你什么？
              </h2>
              <p className="text-xl text-gray-600">
                不只是学习，更是资源和人脉
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="text-6xl mb-4">{benefit.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                老表们怎么说
              </h2>
              <p className="text-xl text-gray-600">
                真实反馈，真实收益
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-5xl">{testimonial.avatar}</div>
                    <div>
                      <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    "{testimonial.content}"
                  </p>
                  <div className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
                    {testimonial.income}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Activities */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                社群活动
              </h2>
              <p className="text-xl text-gray-600">
                丰富多彩，持续学习
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-primary-50 to-white rounded-2xl p-8 shadow-lg border-2 border-primary-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {activity.title}
                    </h3>
                    <span className="px-4 py-1 bg-primary-500 text-white rounded-full text-sm font-semibold">
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing - add id for scroll */}
        <section id="pricing" className="py-20 px-4 bg-gradient-to-br from-primary-500 to-primary-600">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-3xl p-12 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  加入方式
                </h2>
                <p className="text-xl text-gray-600">
                  两种方式，任你选择
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Free */}
                <div className="border-2 border-gray-200 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    免费加入
                  </h3>
                  <div className="text-4xl font-bold text-primary-600 mb-6">
                    ¥0
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-600">访问社群基础内容</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-600">参与每日打卡</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-600">观看直播回放</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">✗</span>
                      <span className="text-gray-400">专属学习资料</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400">✗</span>
                      <span className="text-gray-400">老表1对1答疑</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => alert('🎉 欢迎加入老表社群！\n\n演示版已自动加入，完整功能即将上线。\n\n请添加微信：aixdycom 获取最新通知')}
                    className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    免费加入
                  </button>
                </div>

                {/* Premium */}
                <div className="border-2 border-primary-500 rounded-2xl p-8 relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-primary-500 text-white rounded-full text-sm font-semibold">
                    推荐
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    会员加入
                  </h3>
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    ¥199
                  </div>
                  <div className="text-sm text-gray-500 mb-6">一年会员</div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-600">所有免费权益</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-600">专属学习资料库</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-600">老表1对1答疑</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-600">优先参与线下活动</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-600">课程优惠券</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => handlePayment('community-year', 'membership')}
                    className="w-full px-6 py-3 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition-colors cursor-pointer"
                  >
                    立即开通
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              还在犹豫？
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              先加入免费社群体验，觉得有价值再升级会员
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={scrollToPricing} className="px-8 py-4 bg-primary-500 text-white rounded-full font-semibold text-lg hover:bg-primary-600 transition-colors">
                免费加入社群
              </button>
              <Link
                to="/chat"
                className="px-8 py-4 bg-white text-primary-600 rounded-full font-semibold text-lg hover:bg-primary-50 transition-colors border-2 border-primary-500"
              >
                咨询老表
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
