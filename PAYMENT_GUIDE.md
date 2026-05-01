# 老表AI 支付功能开通指南

## 当前状态
✅ **演示模式** - 所有购买按钮点击后会弹出提示，引导加微信

## 🚀 正式开通支付（二选一）

---

### 方案1：Lemon Squeezy（推荐 ⭐）
**优点**：支持支付宝/微信支付，无需营业执照，个人即可开通

**步骤**：
1. 访问 https://www.lemonsqueezy.com 注册
2. 创建 Store，添加产品（对应课程价格）
3. 获取每个产品的 Checkout URL
4. 在 `src/utils/payment.ts` 中：
   ```typescript
   // 填入真实链接
   const LEMON_SQUEEZY_LINKS = {
     'course-5': 'https://laobiaoai.lemonsqueezy.com/checkout/buy/xxx',
     'course-6': 'https://laobiaoai.lemonsqueezy.com/checkout/buy/xxx',
     ...
   }
   ```
5. 在 `.env` 中设置：`VITE_ENABLE_PAYMENT=true`
6. 在 `payment.ts` 的 `realPayment()` 函数中启用跳转逻辑

**费用**：每笔交易 5% + $0.50

---

### 方案2：爱发电（最简单）
**优点**：国内平台，一分钟开通，支持微信/支付宝

**步骤**：
1. 访问 https://afdian.com 注册
2. 创建赞助方案（对应不同课程价格）
3. 获取赞助链接
4. 把购买按钮改为跳转爱发电链接

**费用**：平台服务费 6%

---

### 方案3：微信/支付宝收款码
**优点**：0手续费

**步骤**：
1. 生成微信和支付宝收款码
2. 把收款码图片放到 `public/qrcode/` 目录
3. 点击购买时弹出收款码 + 订单号
4. 用户扫码支付后手动确认

**缺点**：需要人工确认，不能自动发货

---

## 🛠️ 技术实现

### 启用真实支付
1. 按上面步骤获取支付链接
2. 编辑 `src/utils/payment.ts`
3. 设置环境变量 `.env`：`VITE_ENABLE_PAYMENT=true`
4. 重新部署

### 当前代码结构
```
src/utils/payment.ts    ← 支付模块（修改这里接入真实支付）
src/pages/CourseDetail.tsx  ← 课程购买按钮
src/pages/Courses.tsx       ← 会员开通按钮
src/pages/Community.tsx     ← 社群加入按钮
```
