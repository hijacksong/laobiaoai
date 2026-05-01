# 老表AI - DeepSeek API 配置指南

## 🔑 获取DeepSeek API Key

### 步骤1：注册DeepSeek账号

1. 访问：https://platform.deepseek.com
2. 点击"Sign Up"注册账号
3. 验证邮箱

### 步骤2：获取API Key

1. 登录后，进入 API Keys 页面
2. 点击"Create API Key"
3. 复制生成的API Key（格式：sk-xxxxxxxxxxxxx）

### 步骤3：配置到项目

1. 在项目根目录找到 `.env` 文件
2. 将你的API Key填入：

```bash
VITE_DEEPSEEK_API_KEY=sk-your-actual-api-key-here
```

3. 保存文件
4. 重启开发服务器：
   - 停止当前服务器（Ctrl+C）
   - 运行 `npm run dev`

### 步骤4：测试

1. 访问 http://localhost:5176/chat
2. 输入问题测试
3. 如果配置正确，会收到AI回复

## 💰 费用说明

DeepSeek API 定价（2026年）：
- 输入：¥1/百万tokens
- 输出：¥2/百万tokens
- 缓存：¥0.1/百万tokens

**示例成本**：
- 1000次对话（平均每次500 tokens）≈ ¥1
- 是GPT-4成本的 1/100

## 🔒 安全提示

1. **不要提交API Key到Git**
   - `.env` 文件已在 `.gitignore` 中
   - 确保不要将API Key上传到GitHub

2. **生产环境配置**
   - 部署到Cloudflare Pages时
   - 在环境变量中配置 `VITE_DEEPSEEK_API_KEY`
   - 不要在代码中硬编码

3. **API Key管理**
   - 定期轮换API Key
   - 设置使用限额
   - 监控API调用量

## 🐛 常见问题

### Q: API调用失败？
A: 检查：
1. API Key是否正确
2. 网络连接是否正常
3. DeepSeek服务是否可用

### Q: 如何限制成本？
A: 在DeepSeek控制台设置：
1. 每日/每月使用限额
2. 单次请求token限制
3. 启用使用提醒

### Q: 国内访问速度慢？
A: DeepSeek是国内服务，访问速度很快
- 如果遇到问题，检查网络设置
- 确保没有代理干扰

## 📊 监控使用情况

在DeepSeek控制台可以查看：
- API调用次数
- Token使用量
- 费用统计
- 错误日志

## 🚀 下一步

配置完成后，你可以：
1. 测试AI对话功能
2. 调整AI回复风格（修改system prompt）
3. 添加更多功能（语音输入、图片识别等）
4. 部署到生产环境

---

需要帮助？联系老表：hi@laobiaoai.com
