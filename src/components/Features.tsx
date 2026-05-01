import { Link } from 'react-router-dom'

export default function Features() {
  const features = [
    {
      icon: '🎓',
      title: '老表教学',
      description: '手把手教你用AI工具，从入门到精通，全程人话讲解',
      link: '/courses'
    },
    {
      icon: '🛠️',
      title: '老表工具箱',
      description: '精选100+实用AI工具，每个都有老表点评和使用教程',
      link: '/tools'
    },
    {
      icon: '💬',
      title: '老表问答',
      description: '24小时AI助手，有问题随时问，老表风格回答',
      link: '/chat'
    },
    {
      icon: '👥',
      title: '老表社群',
      description: '加入10000+老表大家庭，一起学习交流，共同进步',
      link: '/community'
    }
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            老表能帮你啥？
          </h2>
          <p className="text-xl text-gray-600">
            四大板块，全方位陪你玩转AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-primary-500 cursor-pointer"
            >
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-4 text-primary-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                了解更多 <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
