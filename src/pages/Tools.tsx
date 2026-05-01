import { useState } from 'react'
import Footer from '../components/Footer'

interface Tool {
  id: number
  name: string
  description: string
  category: string
  url: string
  icon: string
  price: string
  rating: number
  tags: string[]
}

export default function Tools() {
  const [selectedCategory, setSelectedCategory] = useState('全部')

  const categories = ['全部', '文本生成', 'AI绘画', '视频制作', '音频处理', '代码助手', '办公效率', '学习工具']

  const tools: Tool[] = [
    {
      id: 1,
      name: 'ChatGPT',
      description: '最强大的AI对话助手，老表天天用',
      category: '文本生成',
      url: 'https://chat.openai.com',
      icon: '🤖',
      price: '免费+付费',
      rating: 5,
      tags: ['对话', '写作', '翻译']
    },
    {
      id: 2,
      name: 'Midjourney',
      description: 'AI绘画神器，画啥都好看',
      category: 'AI绘画',
      url: 'https://midjourney.com',
      icon: '🎨',
      price: '付费',
      rating: 5,
      tags: ['绘画', '设计', '创意']
    },
    {
      id: 3,
      name: 'Stable Diffusion',
      description: '开源AI绘画，免费用',
      category: 'AI绘画',
      url: 'https://stability.ai',
      icon: '🖼️',
      price: '免费',
      rating: 4,
      tags: ['绘画', '开源', '免费']
    },
    {
      id: 4,
      name: 'GitHub Copilot',
      description: 'AI写代码，程序员必备',
      category: '代码助手',
      url: 'https://github.com/features/copilot',
      icon: '💻',
      price: '付费',
      rating: 5,
      tags: ['编程', '代码', '效率']
    },
    {
      id: 5,
      name: 'Notion AI',
      description: 'AI笔记助手，整理思路超快',
      category: '办公效率',
      url: 'https://notion.so',
      icon: '📝',
      price: '免费+付费',
      rating: 4,
      tags: ['笔记', '整理', '协作']
    },
    {
      id: 6,
      name: 'Runway',
      description: 'AI视频编辑，小白也能做大片',
      category: '视频制作',
      url: 'https://runwayml.com',
      icon: '🎬',
      price: '免费+付费',
      rating: 4,
      tags: ['视频', '编辑', '特效']
    },
    {
      id: 7,
      name: 'ElevenLabs',
      description: 'AI语音合成，声音超真实',
      category: '音频处理',
      url: 'https://elevenlabs.io',
      icon: '🎙️',
      price: '免费+付费',
      rating: 5,
      tags: ['语音', '配音', '朗读']
    },
    {
      id: 8,
      name: 'Grammarly',
      description: 'AI英语写作助手，改错超准',
      category: '学习工具',
      url: 'https://grammarly.com',
      icon: '✍️',
      price: '免费+付费',
      rating: 4,
      tags: ['英语', '写作', '语法']
    },
    {
      id: 9,
      name: 'DeepL',
      description: 'AI翻译神器，比谷歌翻译准',
      category: '文本生成',
      url: 'https://deepl.com',
      icon: '🌐',
      price: '免费+付费',
      rating: 5,
      tags: ['翻译', '多语言']
    }
  ]

  const filteredTools = selectedCategory === '全部'
    ? tools
    : tools.filter(tool => tool.category === selectedCategory)

  return (
    <>
      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              🛠️ 老表工具箱
            </h1>
            <p className="text-xl text-gray-600">
              精选100+实用AI工具，每个都有老表点评
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-primary-50 border-2 border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-primary-500"
              >
                {/* Icon & Badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl transform group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    tool.price === '免费'
                      ? 'bg-green-100 text-green-700'
                      : tool.price === '付费'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {tool.price}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {tool.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {tool.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < tool.rating ? 'text-yellow-400' : 'text-gray-300'}>
                      ⭐
                    </span>
                  ))}
                  <span className="text-sm text-gray-500 ml-2">
                    老表推荐
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="text-primary-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  去看看 <span>→</span>
                </div>
              </a>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button
              onClick={() => alert('🛠️ 更多工具正在收集中！\n\n老表正在测试更多AI工具，很快就会上线。\n\n有想推荐的工具？加微信：aixdycom')}
              className="px-8 py-4 bg-white text-primary-600 rounded-full font-semibold text-lg hover:bg-primary-50 transition-all shadow-lg border-2 border-primary-500 cursor-pointer"
            >
              加载更多工具 →
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
