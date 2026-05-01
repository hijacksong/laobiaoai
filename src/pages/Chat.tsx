import { useState, useRef, useEffect } from 'react'
import Footer from '../components/Footer'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '嘿，老表！我是你的AI助手，有啥问题尽管问我！用人话给你讲明白 😊'
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      // 调用DeepSeek API
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: '你是"老表AI"的AI助手。你的说话风格要接地气、用人话，像朋友一样亲切。不要用太专业的术语，要用简单易懂的比喻和例子。称呼用户为"老表"。回答要简洁明了，不要太长。'
            },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 500
        })
      })

      if (!response.ok) {
        throw new Error('API请求失败')
      }

      const data = await response.json()
      const assistantMessage = data.choices[0].message.content

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: assistantMessage
      }])
    } catch (error) {
      console.error('DeepSeek API错误:', error)

      // 如果API调用失败，显示友好的错误提示
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '老表，不好意思，我这会儿有点卡壳了 😅\n\n可能是网络问题或者API配置有问题。你可以：\n1. 检查一下网络连接\n2. 确认DeepSeek API Key是否配置正确\n3. 稍后再试试\n\n需要帮助的话，可以联系我们的技术支持！'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              💬 老表问答
            </h1>
            <p className="text-xl text-gray-600">
              24小时AI助手，有问题随时问
            </p>
            {!import.meta.env.VITE_DEEPSEEK_API_KEY && (
              <div className="mt-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
                ⚠️ 提示：请在 .env 文件中配置 VITE_DEEPSEEK_API_KEY 以启用真实AI对话
              </div>
            )}
          </div>

          {/* Chat Container */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Messages */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                      message.role === 'user'
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">👋</span>
                        <span className="font-semibold">老表</span>
                      </div>
                    )}
                    <p className="whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-2xl px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">👋</span>
                      <span className="font-semibold">老表</span>
                      <div className="flex gap-1 ml-2">
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>.</span>
                        <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="问老表任何问题..."
                  className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:border-primary-500 transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-8 py-3 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? '发送中...' : '发送'}
                </button>
              </div>
            </form>
          </div>

          {/* Tips */}
          <div className="mt-8 bg-primary-50 rounded-2xl p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-3">💡 老表提示</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• 用人话问问题，老表也用人话回答</li>
              <li>• 不懂就问，没有傻问题</li>
              <li>• 可以让老表举例子、打比方</li>
              <li>• 支持连续对话，老表会记住上下文</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
