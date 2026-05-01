import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { handlePayment } from '../utils/payment'

interface Course {
  id: number
  title: string
  description: string
  level: string
  duration: string
  price: string
  isFree: boolean
  tag: string
  image: string
  lessons: number
  students: number
  rating: number
}

export default function Courses() {
  const [activeTab, setActiveTab] = useState<'free' | 'paid' | 'faq'>('free')

  const freeCourses: Course[] = [
    {
      id: 1,
      title: 'ChatGPT人话版教程',
      description: '从注册到高级用法，老表手把手教你玩转ChatGPT，零基础也能学会',
      level: '零基础',
      duration: '30分钟',
      price: '免费',
      isFree: true,
      tag: '🔥 最热门',
      image: '🤖',
      lessons: 5,
      students: 8520,
      rating: 5
    },
    {
      id: 2,
      title: 'AI绘画零基础入门',
      description: 'Midjourney、Stable Diffusion，人话讲解，轻松上手画出好看的图',
      level: '零基础',
      duration: '45分钟',
      price: '免费',
      isFree: true,
      tag: '🎨 超实用',
      image: '🎨',
      lessons: 8,
      students: 6340,
      rating: 5
    },
    {
      id: 3,
      title: '10个必备AI工具',
      description: '老表精选10个最实用的AI工具，每个都有详细教程和使用技巧',
      level: '零基础',
      duration: '1小时',
      price: '免费',
      isFree: true,
      tag: '⭐ 精选',
      image: '🛠️',
      lessons: 10,
      students: 5280,
      rating: 5
    },
    {
      id: 4,
      title: 'AI提示词入门',
      description: '学会写好提示词，让AI更懂你的意思，效果提升10倍',
      level: '零基础',
      duration: '40分钟',
      price: '免费',
      isFree: true,
      tag: '💡 必学',
      image: '✍️',
      lessons: 6,
      students: 4920,
      rating: 4
    }
  ]

  const paidCourses: Course[] = [
    {
      id: 5,
      title: '用AI做副业赚钱',
      description: '10个AI副业项目，老表亲测有效，手把手教你从0到月入过万',
      level: '进阶',
      duration: '2小时',
      price: '¥99',
      isFree: false,
      tag: '💰 高收益',
      image: '💰',
      lessons: 15,
      students: 1240,
      rating: 5
    },
    {
      id: 6,
      title: 'AI办公效率提升',
      description: '用AI提升工作效率，每天节省2小时，老板都夸你',
      level: '进阶',
      duration: '1.5小时',
      price: '¥79',
      isFree: false,
      tag: '⚡ 高效',
      image: '💼',
      lessons: 12,
      students: 980,
      rating: 5
    },
    {
      id: 7,
      title: 'AI创作全流程',
      description: '从文案到视频，用AI完成整个创作流程，打造个人IP',
      level: '进阶',
      duration: '3小时',
      price: '¥129',
      isFree: false,
      tag: '🎬 全面',
      image: '🎥',
      lessons: 20,
      students: 760,
      rating: 5
    },
    {
      id: 8,
      title: 'AI编程助手实战',
      description: '用AI写代码，效率提升5倍，适合程序员和想学编程的人',
      level: '进阶',
      duration: '2.5小时',
      price: '¥99',
      isFree: false,
      tag: '💻 专业',
      image: '💻',
      lessons: 18,
      students: 620,
      rating: 4
    }
  ]

  const faqs = [
    {
      question: '课程是录播还是直播？',
      answer: '目前都是录播课程，可以随时学习。每周会有1-2次直播答疑，老表会在线解答大家的问题。'
    },
    {
      question: '零基础能学会吗？',
      answer: '完全可以！老表的课程都是用人话讲的，不会有复杂的专业术语。只要你会用电脑、会上网，就能学会。'
    },
    {
      question: '付费课程可以退款吗？',
      answer: '购买后7天内，如果觉得不满意，可以无条件退款。我们对课程质量有信心，但也尊重你的选择。'
    },
    {
      question: '学完能找到工作吗？',
      answer: '课程主要教你用AI提升效率、做副业赚钱。不是就业培训，但掌握这些技能后，找工作会更有竞争力。'
    },
    {
      question: '有学习群吗？',
      answer: '有的！购买付费课程后，会邀请你加入老表社群。里面有10000+老表一起学习交流，还有老表定期分享。'
    },
    {
      question: '课程会更新吗？',
      answer: '会的！AI技术发展很快，我们会持续更新课程内容。购买后可以免费观看所有更新内容。'
    },
    {
      question: '可以开发票吗？',
      answer: '可以的！购买后联系客服，提供开票信息，我们会在3个工作日内开具电子发票。'
    },
    {
      question: '有优惠活动吗？',
      answer: '经常有！关注我们的公众号"老表AI"，每月都有限时优惠。新用户首次购买还有专属折扣。'
    }
  ]

  const displayCourses = activeTab === 'free' ? freeCourses : paidCourses

  return (
    <>
      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              🎓 老表课程
            </h1>
            <p className="text-xl text-gray-600">
              从零基础到赚钱实战，老表全程陪你
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('free')}
              className={`px-8 py-3 rounded-full font-semibold text-lg transition-all ${
                activeTab === 'free'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-primary-50 border-2 border-gray-200'
              }`}
            >
              免费课程
            </button>
            <button
              onClick={() => setActiveTab('paid')}
              className={`px-8 py-3 rounded-full font-semibold text-lg transition-all ${
                activeTab === 'paid'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-primary-50 border-2 border-gray-200'
              }`}
            >
              付费课程
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-8 py-3 rounded-full font-semibold text-lg transition-all ${
                activeTab === 'faq'
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-primary-50 border-2 border-gray-200'
              }`}
            >
              常见问题
            </button>
          </div>

          {/* Courses Grid */}
          {activeTab !== 'faq' && (
            <div className="grid md:grid-cols-2 gap-8">
              {displayCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  {/* Tag */}
                  <div className="bg-primary-500 text-white px-4 py-2 text-sm font-semibold">
                    {course.tag}
                  </div>

                  {/* Image */}
                  <div className="bg-gradient-to-br from-primary-100 to-primary-200 h-48 flex items-center justify-center">
                    <span className="text-8xl">{course.image}</span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        📊 {course.level}
                      </span>
                      <span className="flex items-center gap-1">
                        ⏱️ {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        📚 {course.lessons}节课
                      </span>
                    </div>

                    {/* Rating & Students */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < course.rating ? 'text-yellow-400' : 'text-gray-300'}>
                            ⭐
                          </span>
                        ))}
                        <span className="text-sm text-gray-500 ml-2">
                          {course.students.toLocaleString()}人学过
                        </span>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-primary-600">
                        {course.price}
                      </span>
                      <Link
                        to={`/courses/${course.id}`}
                        className="px-6 py-3 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition-colors"
                      >
                        {course.isFree ? '立即学习' : '立即购买'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* FAQ Section */}
          {activeTab === 'faq' && (
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-start gap-3">
                    <span className="text-primary-500">Q{index + 1}:</span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed pl-10">
                    {faq.answer}
                  </p>
                </div>
              ))}

              {/* Contact */}
              <div className="bg-primary-50 rounded-2xl p-8 text-center mt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  还有其他问题？
                </h3>
                <p className="text-gray-600 mb-6">
                  随时联系老表，我们会尽快回复你
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/chat"
                    className="px-8 py-3 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition-colors"
                  >
                    💬 在线咨询
                  </Link>
                  <a
                    href="mailto:hi@laobiaoai.com"
                    className="px-8 py-3 bg-white text-primary-600 rounded-full font-semibold hover:bg-primary-50 transition-colors border-2 border-primary-500"
                  >
                    📧 微信联系：aixdycom
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Membership Banner */}
          {activeTab !== 'faq' && (
            <div className="mt-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">
                🎉 老表会员 - 全部课程免费看
              </h2>
              <p className="text-xl mb-6 text-primary-100">
                只需 ¥19.9/月，解锁所有课程 + 专属社群 + 每周直播
              </p>
              <button
                onClick={() => handlePayment('community-month', 'membership')}
                className="px-8 py-4 bg-white text-primary-600 rounded-full font-semibold text-lg hover:bg-primary-50 transition-all shadow-lg cursor-pointer"
              >
                立即开通会员 - ¥19.9/月
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
