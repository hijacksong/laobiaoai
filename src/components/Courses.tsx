import { Link } from 'react-router-dom'

export default function Courses() {
  const courses = [
    {
      id: 1,
      title: 'ChatGPT人话版教程',
      description: '从注册到高级用法，老表手把手教你玩转ChatGPT',
      level: '零基础',
      duration: '30分钟',
      price: '免费',
      tag: '🔥 最热门',
      image: '🤖'
    },
    {
      id: 2,
      title: 'AI绘画零基础入门',
      description: 'Midjourney、Stable Diffusion，人话讲解，轻松上手',
      level: '零基础',
      duration: '45分钟',
      price: '免费',
      tag: '🎨 超实用',
      image: '🎨'
    },
    {
      id: 5,
      title: '用AI做副业赚钱',
      description: '10个AI副业项目，老表亲测有效，手把手教你赚钱',
      level: '进阶',
      duration: '2小时',
      price: '¥99',
      tag: '💰 高收益',
      image: '💰'
    }
  ]

  return (
    <section id="courses" className="py-20 px-4 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            老表精选课程
          </h2>
          <p className="text-xl text-gray-600">
            从零基础到赚钱实战，老表全程陪你
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer block border-2 border-transparent hover:border-primary-500"
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

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    📊 {course.level}
                  </span>
                  <span className="flex items-center gap-1">
                    ⏱️ {course.duration}
                  </span>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-primary-600">
                    {course.price}
                  </span>
                  <span className="px-6 py-3 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition-colors">
                    {course.price === '免费' ? '立即学习' : '了解详情'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link
            to="/courses"
            className="inline-block px-8 py-4 bg-white text-primary-600 rounded-full font-semibold text-lg hover:bg-primary-50 transition-all shadow-lg border-2 border-primary-500"
          >
            查看全部50+课程 →
          </Link>
        </div>
      </div>
    </section>
  )
}
