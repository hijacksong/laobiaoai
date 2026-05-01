// ========================================
// 老表AI 支付模块
// 当前：演示模式（弹出提示）
// 正式上线：替换为 Lemon Squeezy 或爱发电
// ========================================

// 课程价格配置
export const PRICES = {
  'course-5': { name: '用AI做副业赚钱', price: 9900, currency: 'CNY' },       // ¥99
  'course-6': { name: 'AI办公效率提升', price: 7900, currency: 'CNY' },       // ¥79
  'course-7': { name: 'AI创作全流程', price: 12900, currency: 'CNY' },        // ¥129
  'course-8': { name: 'AI编程助手实战', price: 9900, currency: 'CNY' },       // ¥99
  'community-year': { name: '老表社群一年会员', price: 19900, currency: 'CNY' }, // ¥199
  'community-month': { name: '老表社群月度会员', price: 1990, currency: 'CNY' }, // ¥19.9
}

// ========================================
// 正式上线时，改为真实支付跳转：
// ========================================

// 方案1：Lemon Squeezy（推荐 - 支持支付宝/微信，无需营业执照）
// const LEMON_SQUEEZY_LINKS = {
//   'course-5': 'https://laobiaoai.lemonsqueezy.com/checkout/buy/xxx',
//   'course-6': 'https://laobiaoai.lemonsqueezy.com/checkout/buy/xxx',
//   ...
// }

// 方案2：爱发电（最简单 - 赞助模式）
// const AFDIAN_LINK = 'https://afdian.com/a/laobiaoai'

// 方案3：微信/支付宝收款码（最直接）
// 直接展示收款码图片，用户扫码支付

// ========================================

export type PaymentType = 'course' | 'membership'

interface PaymentResult {
  success: boolean
  message: string
  orderId?: string
}

// 统一支付入口
export async function handlePayment(
  productId: string,
  _type: PaymentType = 'course'
): Promise<PaymentResult> {
  // 演示模式 → 跳转微信联系页面
  const product = PRICES[productId as keyof typeof PRICES]
  const productName = product ? encodeURIComponent(product.name) : ''
  window.location.href = `/contact?product=${productName}`

  return { success: true, message: '跳转联系页面', orderId: `DEMO-${Date.now()}` }
}

// 格式化价格显示
export function formatPrice(cents: number): string {
  return `¥${(cents / 100).toFixed(0)}`
}
