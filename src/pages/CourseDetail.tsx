import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import Footer from '../components/Footer'
import { handlePayment } from '../utils/payment'

interface Lesson {
  id: number
  title: string
  duration: string
  isFree: boolean
  isCompleted: boolean
}

interface CourseDetail {
  id: number
  title: string
  description: string
  level: string
  duration: string
  price: string
  isFree: boolean
  tag: string
  image: string
  lessons: Lesson[]
  students: number
  rating: number
  instructor: string
  whatYouLearn: string[]
  requirements: string[]
}

export default function CourseDetail() {
  const { id } = useParams()
  const [_lesson, _setLesson] = useState<number | null>(null)

  // 模拟课程数据
  const courses: Record<string, CourseDetail> = {
    '1': {
      id: 1,
      title: 'ChatGPT人话版教程',
      description: '从注册到高级用法，老表手把手教你玩转ChatGPT，零基础也能学会',
      level: '零基础',
      duration: '30分钟',
      price: '免费',
      isFree: true,
      tag: '🔥 最热门',
      image: '🤖',
      students: 8520,
      rating: 5,
      instructor: '老表',
      whatYouLearn: [
        '如何注册和登录ChatGPT',
        '基础对话技巧和提示词写法',
        '用ChatGPT写文案、翻译、总结',
        '高级功能：联网搜索、图片识别',
        '实用案例：工作、学习、生活场景'
      ],
      requirements: [
        '会用电脑和浏览器',
        '有邮箱账号',
        '无需编程基础'
      ],
      lessons: [
        { id: 1, title: '第1课：ChatGPT是什么？为什么这么火？', duration: '5分钟', isFree: true, isCompleted: false },
        { id: 2, title: '第2课：手把手教你注册ChatGPT账号', duration: '8分钟', isFree: true, isCompleted: false },
        { id: 3, title: '第3课：基础对话技巧 - 让AI更懂你', duration: '6分钟', isFree: true, isCompleted: false },
        { id: 4, title: '第4课：实战案例 - 用ChatGPT写文案', duration: '7分钟', isFree: true, isCompleted: false },
        { id: 5, title: '第5课：高级技巧 - 提升10倍效率', duration: '4分钟', isFree: true, isCompleted: false }
      ]
    },
    '2': {
      id: 2,
      title: 'AI绘画零基础入门',
      description: 'Midjourney、Stable Diffusion，人话讲解，轻松上手画出好看的图',
      level: '零基础',
      duration: '45分钟',
      price: '免费',
      isFree: true,
      tag: '🎨 超实用',
      image: '🎨',
      students: 6340,
      rating: 5,
      instructor: '老表',
      whatYouLearn: [
        'AI绘画的基本原理（人话版）',
        'Midjourney注册和使用',
        'Stable Diffusion本地部署',
        '提示词写法和技巧',
        '实战：画头像、海报、插画'
      ],
      requirements: [
        '对绘画感兴趣',
        '有Discord账号（Midjourney需要）',
        '无需绘画基础'
      ],
      lessons: [
        { id: 1, title: '第1课：AI绘画是什么？能做什么？', duration: '5分钟', isFree: true, isCompleted: false },
        { id: 2, title: '第2课：Midjourney注册和基础使用', duration: '10分钟', isFree: true, isCompleted: false },
        { id: 3, title: '第3课：提示词写法 - 画出你想要的图', duration: '8分钟', isFree: true, isCompleted: false },
        { id: 4, title: '第4课：实战 - 画一个好看的头像', duration: '7分钟', isFree: true, isCompleted: false },
        { id: 5, title: '第5课：Stable Diffusion入门', duration: '10分钟', isFree: true, isCompleted: false },
        { id: 6, title: '第6课：高级技巧 - 风格控制', duration: '5分钟', isFree: true, isCompleted: false }
      ]
    },
    '3': {
      id: 3,
      title: '10个必备AI工具',
      description: '老表精选10个最实用的AI工具，每个都有详细教程和使用技巧',
      level: '零基础',
      duration: '1小时',
      price: '免费',
      isFree: true,
      tag: '⭐ 精选',
      image: '🛠️',
      students: 5280,
      rating: 5,
      instructor: '老表',
      whatYouLearn: [
        '10个最实用的AI工具推荐',
        '每个工具的注册和使用方法',
        '实际应用场景和案例',
        '如何选择适合自己的工具',
        '省钱技巧：免费替代方案'
      ],
      requirements: [
        '会用电脑和手机',
        '有基本的网络知识',
        '愿意尝试新工具'
      ],
      lessons: [
        { id: 1, title: '第1课：AI工具全景图 - 如何选择？', duration: '6分钟', isFree: true, isCompleted: false },
        { id: 2, title: '第2课：ChatGPT - 最强对话助手', duration: '6分钟', isFree: true, isCompleted: false },
        { id: 3, title: '第3课：Midjourney - AI绘画神器', duration: '6分钟', isFree: true, isCompleted: false },
        { id: 4, title: '第4课：Notion AI - 智能笔记助手', duration: '6分钟', isFree: true, isCompleted: false },
        { id: 5, title: '第5课：GitHub Copilot - AI编程助手', duration: '6分钟', isFree: true, isCompleted: false },
        { id: 6, title: '第6课：Runway - AI视频编辑', duration: '6分钟', isFree: true, isCompleted: false },
        { id: 7, title: '第7课：ElevenLabs - AI语音合成', duration: '6分钟', isFree: true, isCompleted: false },
        { id: 8, title: '第8课：DeepL - AI翻译神器', duration: '6分钟', isFree: true, isCompleted: false },
        { id: 9, title: '第9课：Grammarly - AI写作助手', duration: '6分钟', isFree: true, isCompleted: false },
        { id: 10, title: '第10课：如何持续发现新工具', duration: '6分钟', isFree: true, isCompleted: false }
      ]
    },
    '4': {
      id: 4,
      title: 'AI提示词入门',
      description: '学会写好提示词，让AI更懂你的意思，效果提升10倍',
      level: '零基础',
      duration: '40分钟',
      price: '免费',
      isFree: true,
      tag: '💡 必学',
      image: '✍️',
      students: 4920,
      rating: 4,
      instructor: '老表',
      whatYouLearn: [
        '什么是提示词（Prompt）',
        '提示词的基本结构和写法',
        '常见错误和优化技巧',
        '不同场景的提示词模板',
        '高级技巧：角色扮演、思维链'
      ],
      requirements: [
        '使用过ChatGPT或类似工具',
        '想提升AI使用效果',
        '无需技术背景'
      ],
      lessons: [
        { id: 1, title: '第1课：提示词是什么？为什么重要？', duration: '5分钟', isFree: true, isCompleted: false },
        { id: 2, title: '第2课：提示词的基本结构', duration: '7分钟', isFree: true, isCompleted: false },
        { id: 3, title: '第3课：常见错误 - 你可能踩过的坑', duration: '6分钟', isFree: true, isCompleted: false },
        { id: 4, title: '第4课：优化技巧 - 让AI更懂你', duration: '8分钟', isFree: true, isCompleted: false },
        { id: 5, title: '第5课：场景模板 - 拿来就用', duration: '8分钟', isFree: true, isCompleted: false },
        { id: 6, title: '第6课：高级技巧 - 角色扮演和思维链', duration: '6分钟', isFree: true, isCompleted: false }
      ]
    },
    '5': {
      id: 5,
      title: '用AI做副业赚钱',
      description: '10个AI副业项目，老表亲测有效，手把手教你从0到月入过万',
      level: '进阶',
      duration: '2小时',
      price: '¥99',
      isFree: false,
      tag: '💰 高收益',
      image: '💰',
      students: 1240,
      rating: 5,
      instructor: '老表',
      whatYouLearn: [
        '10个可落地的AI副业项目',
        '如何找客户和接单',
        '定价策略和谈判技巧',
        '用AI提升工作效率',
        '从0到月入过万的完整路径'
      ],
      requirements: [
        '掌握基础AI工具使用',
        '有一定执行力',
        '每天能投入1-2小时'
      ],
      lessons: [
        { id: 1, title: '第1课：AI副业全景图 - 哪些能赚钱？', duration: '10分钟', isFree: true, isCompleted: false },
        { id: 2, title: '第2课：项目1 - AI文案写作（月入5000+）', duration: '15分钟', isFree: false, isCompleted: false },
        { id: 3, title: '第3课：项目2 - AI绘画接单（月入8000+）', duration: '15分钟', isFree: false, isCompleted: false },
        { id: 4, title: '第4课：项目3 - AI视频制作（月入10000+）', duration: '15分钟', isFree: false, isCompleted: false },
        { id: 5, title: '第5课：项目4 - AI翻译服务（月入6000+）', duration: '12分钟', isFree: false, isCompleted: false },
        { id: 6, title: '第6课：项目5 - AI配音接单（月入7000+）', duration: '12分钟', isFree: false, isCompleted: false },
        { id: 7, title: '第7课：如何找客户 - 3个有效渠道', duration: '12分钟', isFree: false, isCompleted: false },
        { id: 8, title: '第8课：定价策略 - 不贱卖也不吓跑客户', duration: '10分钟', isFree: false, isCompleted: false },
        { id: 9, title: '第9课：接单话术 - 提高成交率', duration: '10分钟', isFree: false, isCompleted: false },
        { id: 10, title: '第10课：案例分析 - 老表的真实经历', duration: '15分钟', isFree: false, isCompleted: false }
      ]
    },
    '6': {
      id: 6,
      title: 'AI办公效率提升',
      description: '用AI提升工作效率，每天节省2小时，老板都夸你',
      level: '进阶',
      duration: '1.5小时',
      price: '¥79',
      isFree: false,
      tag: '⚡ 高效',
      image: '💼',
      students: 980,
      rating: 5,
      instructor: '老表',
      whatYouLearn: [
        '用AI自动化重复性工作',
        'AI辅助写邮件、报告、PPT',
        '数据分析和图表生成',
        '会议纪要自动整理',
        '时间管理和任务规划'
      ],
      requirements: [
        '有办公工作经验',
        '使用Office或在线办公软件',
        '想提升工作效率'
      ],
      lessons: [
        { id: 1, title: '第1课：AI办公全景 - 哪些能自动化？', duration: '8分钟', isFree: true, isCompleted: false },
        { id: 2, title: '第2课：用AI写邮件 - 3分钟搞定', duration: '10分钟', isFree: false, isCompleted: false },
        { id: 3, title: '第3课：用AI做PPT - 10分钟完成', duration: '12分钟', isFree: false, isCompleted: false },
        { id: 4, title: '第4课：用AI写报告 - 告别加班', duration: '10分钟', isFree: false, isCompleted: false },
        { id: 5, title: '第5课：数据分析 - AI帮你找规律', duration: '10分钟', isFree: false, isCompleted: false },
        { id: 6, title: '第6课：会议纪要 - 自动整理要点', duration: '8分钟', isFree: false, isCompleted: false },
        { id: 7, title: '第7课：Excel自动化 - 公式不用记', duration: '10分钟', isFree: false, isCompleted: false },
        { id: 8, title: '第8课：时间管理 - AI帮你规划', duration: '8分钟', isFree: false, isCompleted: false },
        { id: 9, title: '第9课：团队协作 - AI提升沟通效率', duration: '8分钟', isFree: false, isCompleted: false },
        { id: 10, title: '第10课：综合案例 - 一天的高效工作流', duration: '10分钟', isFree: false, isCompleted: false }
      ]
    },
    '7': {
      id: 7,
      title: 'AI创作全流程',
      description: '从文案到视频，用AI完成整个创作流程，打造个人IP',
      level: '进阶',
      duration: '3小时',
      price: '¥129',
      isFree: false,
      tag: '🎬 全面',
      image: '🎥',
      students: 760,
      rating: 5,
      instructor: '老表',
      whatYouLearn: [
        'AI辅助选题和内容策划',
        '用AI写爆款文案',
        'AI生成配图和封面',
        'AI视频制作和剪辑',
        '完整的创作工作流'
      ],
      requirements: [
        '想做内容创作',
        '有自媒体账号或想开始',
        '愿意持续输出内容'
      ],
      lessons: [
        { id: 1, title: '第1课：AI创作全景 - 完整工作流', duration: '10分钟', isFree: true, isCompleted: false },
        { id: 2, title: '第2课：选题策划 - AI帮你找热点', duration: '12分钟', isFree: false, isCompleted: false },
        { id: 3, title: '第3课：文案创作 - 写出爆款标题', duration: '15分钟', isFree: false, isCompleted: false },
        { id: 4, title: '第4课：文案创作 - 正文结构和技巧', duration: '15分钟', isFree: false, isCompleted: false },
        { id: 5, title: '第5课：配图生成 - AI画出吸睛图片', duration: '12分钟', isFree: false, isCompleted: false },
        { id: 6, title: '第6课：封面设计 - 提升点击率', duration: '10分钟', isFree: false, isCompleted: false },
        { id: 7, title: '第7课：视频脚本 - AI帮你写分镜', duration: '12分钟', isFree: false, isCompleted: false },
        { id: 8, title: '第8课：视频制作 - AI剪辑和特效', duration: '15分钟', isFree: false, isCompleted: false },
        { id: 9, title: '第9课：配音和字幕 - AI一键生成', duration: '10分钟', isFree: false, isCompleted: false },
        { id: 10, title: '第10课：发布优化 - 标签和推荐算法', duration: '10分钟', isFree: false, isCompleted: false },
        { id: 11, title: '第11课：数据分析 - 优化内容策略', duration: '10分钟', isFree: false, isCompleted: false },
        { id: 12, title: '第12课：案例实战 - 从0到10万粉', duration: '20分钟', isFree: false, isCompleted: false }
      ]
    },
    '8': {
      id: 8,
      title: 'AI编程助手实战',
      description: '用AI写代码，效率提升5倍，适合程序员和想学编程的人',
      level: '进阶',
      duration: '2.5小时',
      price: '¥99',
      isFree: false,
      tag: '💻 专业',
      image: '💻',
      students: 620,
      rating: 4,
      instructor: '老表',
      whatYouLearn: [
        'GitHub Copilot完全指南',
        'ChatGPT辅助编程技巧',
        'AI帮你debug和优化代码',
        '用AI学习新技术',
        '实战项目：AI辅助开发'
      ],
      requirements: [
        '有编程基础或想学编程',
        '了解至少一门编程语言',
        '有代码编辑器（VS Code等）'
      ],
      lessons: [
        { id: 1, title: '第1课：AI编程助手全景', duration: '8分钟', isFree: true, isCompleted: false },
        { id: 2, title: '第2课：GitHub Copilot安装和配置', duration: '10分钟', isFree: false, isCompleted: false },
        { id: 3, title: '第3课：Copilot基础用法 - 代码补全', duration: '12分钟', isFree: false, isCompleted: false },
        { id: 4, title: '第4课：Copilot高级技巧 - 注释生成代码', duration: '15分钟', isFree: false, isCompleted: false },
        { id: 5, title: '第5课：ChatGPT辅助编程 - 提示词技巧', duration: '12分钟', isFree: false, isCompleted: false },
        { id: 6, title: '第6课：用AI写函数和算法', duration: '15分钟', isFree: false, isCompleted: false },
        { id: 7, title: '第7课：用AI Debug - 快速找bug', duration: '12分钟', isFree: false, isCompleted: false },
        { id: 8, title: '第8课：代码优化 - AI帮你重构', duration: '12分钟', isFree: false, isCompleted: false },
        { id: 9, title: '第9课：学习新技术 - AI当你的老师', duration: '10分钟', isFree: false, isCompleted: false },
        { id: 10, title: '第10课：实战项目 - AI辅助开发Todo App', duration: '25分钟', isFree: false, isCompleted: false },
        { id: 11, title: '第11课：最佳实践 - 如何高效使用AI', duration: '10分钟', isFree: false, isCompleted: false }
      ]
    }
  }

  const course = courses[id || '1']

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">课程不存在</h1>
          <Link to="/courses" className="text-primary-600 hover:underline">
            返回课程列表
          </Link>
        </div>
      </div>
    )
  }

  const handleStartLearning = (lessonId: number) => {
    const lesson = course.lessons.find(l => l.id === lessonId)
    if (!lesson) return

    if (!lesson.isFree && !course.isFree) {
      alert('这是付费课程，请先购买后观看。\n\n演示版本暂不支持实际支付，实际版本会接入Stripe支付。')
      return
    }

    _setLesson(lessonId)
    // 实际应该跳转到视频播放页面
    alert(`正在播放：${lesson.title}\n\n演示版本暂无视频内容，实际版本会嵌入视频播放器。`)
  }

  return (
    <>
      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary-600">首页</Link>
            <span className="mx-2">/</span>
            <Link to="/courses" className="hover:text-primary-600">课程</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{course.title}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Course Header */}
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                <div className="flex items-start gap-6">
                  <div className="text-8xl">{course.image}</div>
                  <div className="flex-1">
                    <div className="inline-block bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-3">
                      {course.tag}
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">
                      {course.title}
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">
                      {course.description}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        👤 {course.instructor}
                      </span>
                      <span className="flex items-center gap-1">
                        📊 {course.level}
                      </span>
                      <span className="flex items-center gap-1">
                        ⏱️ {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        👥 {course.students.toLocaleString()}人学过
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-3">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < course.rating ? 'text-yellow-400 text-xl' : 'text-gray-300 text-xl'}>
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  📚 你会学到什么
                </h2>
                <ul className="space-y-3">
                  {course.whatYouLearn.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-primary-500 text-xl">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  📋 学习要求
                </h2>
                <ul className="space-y-3">
                  {course.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Course Content */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  📖 课程内容
                </h2>
                <div className="space-y-3">
                  {course.lessons.map((lesson, _index) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-xl hover:border-primary-500 transition-colors cursor-pointer"
                      onClick={() => handleStartLearning(lesson.id)}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">
                          {lesson.isCompleted ? '✅' : '▶️'}
                        </span>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {lesson.title}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {lesson.duration}
                          </span>
                        </div>
                      </div>
                      {!lesson.isFree && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                          🔒 付费
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-primary-600 mb-2">
                    {course.price}
                  </div>
                  {!course.isFree && (
                    <p className="text-sm text-gray-500">一次购买，永久观看</p>
                  )}
                </div>

                <button
                  onClick={() => {
                    if (course.isFree) {
                      handleStartLearning(1)
                    } else {
                      handlePayment(`course-${id}`, 'course')
                    }
                  }}
                  className="w-full px-6 py-4 bg-primary-500 text-white rounded-full font-semibold text-lg hover:bg-primary-600 transition-colors mb-4 cursor-pointer"
                >
                  {course.isFree ? '免费学习' : `立即购买 - ${course.price}`}
                </button>

                {!course.isFree && (
                  <div className="space-y-3 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>7天无理由退款</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>✓</span>
                      <span>永久观看，免费更新</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>✓</span>
                      <span>加入专属学习社群</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>✓</span>
                      <span>老表在线答疑</span>
                    </div>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-bold text-gray-800 mb-3">课程包含</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span>📚</span>
                      <span>{course.lessons.length}节视频课</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⏱️</span>
                      <span>{course.duration}总时长</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📱</span>
                      <span>支持手机/电脑观看</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📄</span>
                      <span>配套学习资料</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mt-6">
                  <Link
                    to="/chat"
                    className="block w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-semibold text-center hover:bg-gray-200 transition-colors"
                  >
                    💬 咨询老表
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
