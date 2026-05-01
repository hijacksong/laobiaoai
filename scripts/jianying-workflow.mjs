/**
 * 老表AI - 剪映数字人视频批量制作工具
 *
 * 使用流程：
 * 1. DeepSeek 生成讲稿 → 保存为 .txt
 * 2. 剪映导入讲稿 → AI数字人自动播报
 * 3. 导出视频 → 上传到 public/course-videos/
 *
 * 使用：
 *   node scripts/jianying-workflow.mjs free    # 只生成4门免费课
 *   node scripts/jianying-workflow.mjs all     # 生成全部70节课
 *   node scripts/jianying-workflow.mjs course 1 # 只生成第1门课
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

const DEEPSEEK_API_KEY = 'sk-dc942266183e46db8a301f7ea2733a1a'
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'

// ============================================
// 课程数据
// ============================================
const COURSES = [
  {
    id: 1, title: 'ChatGPT人话版教程', isFree: true,
    desc: '从注册到高级用法，老表手把手教你玩转ChatGPT',
    lessons: [
      { title: 'ChatGPT是什么？为什么这么火？', min: 5 },
      { title: '手把手教你注册ChatGPT账号', min: 8 },
      { title: '基础对话技巧 - 让AI更懂你', min: 6 },
      { title: '实战案例 - 用ChatGPT写文案', min: 7 },
      { title: '高级技巧 - 提升10倍效率', min: 4 },
    ]
  },
  {
    id: 2, title: 'AI绘画零基础入门', isFree: true,
    desc: 'Midjourney、Stable Diffusion，人话讲解',
    lessons: [
      { title: 'AI绘画是什么？能做什么？', min: 5 },
      { title: 'Midjourney注册和基础使用', min: 10 },
      { title: '提示词写法 - 画出你想要的图', min: 8 },
      { title: '实战 - 画一个好看的头像', min: 7 },
      { title: 'Stable Diffusion入门', min: 10 },
      { title: '高级技巧 - 风格控制', min: 5 },
    ]
  },
  {
    id: 3, title: '10个必备AI工具', isFree: true,
    desc: '老表精选10个最实用的AI工具',
    lessons: [
      { title: 'AI工具全景图 - 如何选择？', min: 6 },
      { title: 'ChatGPT - 最强对话助手', min: 6 },
      { title: 'Midjourney - AI绘画神器', min: 6 },
      { title: 'Notion AI - 智能笔记助手', min: 6 },
      { title: 'GitHub Copilot - AI编程助手', min: 6 },
      { title: 'Runway - AI视频编辑', min: 6 },
      { title: 'ElevenLabs - AI语音合成', min: 6 },
      { title: 'DeepL - AI翻译神器', min: 6 },
      { title: 'Grammarly - AI写作助手', min: 6 },
      { title: '如何持续发现新工具', min: 6 },
    ]
  },
  {
    id: 4, title: 'AI提示词入门', isFree: true,
    desc: '学会写好提示词，让AI更懂你的意思',
    lessons: [
      { title: '提示词是什么？为什么重要？', min: 5 },
      { title: '提示词的基本结构', min: 7 },
      { title: '常见错误 - 你可能踩过的坑', min: 6 },
      { title: '优化技巧 - 让AI更懂你', min: 8 },
      { title: '场景模板 - 拿来就用', min: 8 },
      { title: '高级技巧 - 角色扮演和思维链', min: 6 },
    ]
  },
]

// ============================================
// 剪映优化的讲稿生成
// ============================================
async function generateJianyingScript(courseTitle, lessonTitle, durationMin, lessonNum, totalLessons) {
  const wordCount = durationMin * 180 // 每分钟180字

  const systemPrompt = `你是"老表AI"的讲师。风格：接地气、口语化、像朋友聊天。
关键要求（适配剪映数字人）：
- 短句为主（每句不超过25字），方便数字人播报
- 用【】标注画面切换点
- 用▲标注重点强调
- 用▶ 标注操作步骤
- 禁止使用markdown格式，纯文本输出
- 每段之间空一行方便剪映分段`

  const userPrompt = `为《${courseTitle}》第${lessonNum}/${totalLessons}课《${lessonTitle}》写讲稿。

时长要求：${durationMin}分钟，约${wordCount}字

结构：
1. 【开场】（20秒）
   - 嘿老表们好！我是老表
   - 上节课我们学了xxx（第1课跳过）
   - 今天咱们来搞懂：${lessonTitle}

2. 【正文】（${durationMin - 1}分钟）
   分3-5个重点，每个重点格式：

   【画面：要点标题】
   讲解内容（2-4句）
   ▶ 操作步骤（如果涉及）
   ▲ 重点提醒

   示例：
   【画面：ChatGPT注册页面】
   首先咱们打开ChatGPT官网
   看到右上角有个注册按钮
   ▶ 点这个按钮，输入你的邮箱
   ▲ 注意要用能收到验证码的邮箱

3. 【结尾】（15秒）
   好，今天咱们学了xxx
   记住最关键的一点：xxx
   下节课咱们来搞xxx
   老表们，下课！

请直接输出讲稿，不要加任何说明文字。`

  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: Math.max(wordCount * 3, 2000)
    })
  })

  if (!response.ok) throw new Error(`API error: ${response.status}`)
  const data = await response.json()
  return data.choices[0].message.content
}

// ============================================
// 主流程
// ============================================
async function main() {
  const args = process.argv.slice(2)
  const mode = args[0] || 'free'

  // 选择课程
  let targets = []
  if (mode === 'all') {
    targets = COURSES
  } else if (mode === 'course' && args[1]) {
    const cid = parseInt(args[1])
    targets = COURSES.filter(c => c.id === cid)
    if (targets.length === 0) {
      console.log(`❌ 没有找到课程 ${cid}`)
      process.exit(1)
    }
  } else {
    // 默认：只生成免费课
    targets = COURSES.filter(c => c.isFree)
  }

  const totalLessons = targets.reduce((s, c) => s + c.lessons.length, 0)
  const totalMin = targets.reduce((s, c) => s + c.lessons.reduce((ss, l) => ss + l.min, 0), 0)

  console.log('═══════════════════════════════════════')
  console.log('  剪映数字人视频讲稿批量生成')
  console.log('═══════════════════════════════════════')
  console.log(`  课程数：${targets.length} 门`)
  console.log(`  总课时：${totalLessons} 节`)
  console.log(`  总时长：约 ${totalMin} 分钟`)
  console.log(`  预计 DeepSeek 费用：约 ¥${(totalLessons * 0.03).toFixed(1)}`)
  console.log('═══════════════════════════════════════\n')

  // 创建输出目录
  const scriptsDir = join(process.cwd(), 'public', 'course-scripts')
  if (!existsSync(scriptsDir)) mkdirSync(scriptsDir, { recursive: true })

  let globalCount = 0
  for (const course of targets) {
    console.log(`\n📚 ${course.title}`)
    console.log('   ' + '─'.repeat(40))

    for (let i = 0; i < course.lessons.length; i++) {
      globalCount++
      const lesson = course.lessons[i]

      process.stdout.write(`   🎬 [${globalCount}/${totalLessons}] ${lesson.title}... `)

      try {
        const script = await generateJianyingScript(
          course.title,
          lesson.title,
          lesson.min,
          i + 1,
          course.lessons.length
        )

        // 保存为 .txt（方便剪映导入）
        const filename = `C${course.id}-L${i + 1}-${lesson.title.replace(/[\\/:*?"<>|]/g, '')}.txt`
        const filepath = join(scriptsDir, filename)
        writeFileSync(filepath, script, 'utf-8')

        console.log('✅')
      } catch (error) {
        console.log(`❌ ${error.message}`)
      }

      // 限速
      await new Promise(r => setTimeout(r, 300))
    }
  }

  // 生成剪映导入指南
  const guide = generateJianyingGuide(targets)
  writeFileSync(join(scriptsDir, '剪映导入指南.txt'), guide, 'utf-8')

  console.log('\n═══════════════════════════════════════')
  console.log('  ✅ 全部完成！')
  console.log(`  📁 public/course-scripts/`)
  console.log(`  📋 剪映导入指南已生成`)
  console.log('═══════════════════════════════════════')
}

function generateJianyingGuide(courses) {
  return `═══════════════════════════════════════
  老表AI - 剪映数字人视频制作指南
═══════════════════════════════════════

📦 准备工作：
1. 下载剪映专业版：https://www.capcut.cn/
2. 安装后打开，登录账号

🎬 制作步骤（每节课）：

1. 新建项目 → 选择"文本配音"

2. 粘贴讲稿：
   - 打开 public/course-scripts/CX-LX-xxx.txt
   - 全选复制 → 粘贴到剪映文本框

3. 选择数字人：
   - 点击"数字人" → 选一个男主播
   - 推荐：昊然 / 晓晨（男声）
   - 调整语速：1.0x（正常速度）

4. 自动生成视频：
   - 剪映会自动将文字转成数字人播报
   - 根据【画面】标注添加配图/录屏
   - 根据▶标注添加操作演示

5. 添加字幕：
   - 点击"智能字幕" → 自动识别
   - 调整字体大小和位置

6. 导出视频：
   - 格式：MP4
   - 分辨率：1080p
   - 保存到：public/course-videos/

📊 本批次课程清单：
${courses.map(c => {
  return `
${c.id}. ${c.title}（${c.lessons.length}节）
${c.lessons.map((l, i) => `   ${i+1}. ${l.title} [${l.min}分钟] → C${c.id}-L${i+1}-${l.title.replace(/[\\/:*?"<>|]/g, '')}.txt`).join('\n')}`
}).join('\n')}

💡 效率技巧：
- 同一门课用同一个数字人，风格统一
- 先做第1节课，调整好模板后批量做其余课
- 每节课约需5-10分钟操作（讲稿已生成好）
- 批量渲染时选择"添加到渲染队列"

⏱️ 预计制作时间：
  • 讲稿：已由 DeepSeek 自动生成 ✅
  • 数字人播报：自动生成（约等于课程时长）
  • 配图/录屏：每节课 5-10 分钟
  • 导出渲染：约等于课程时长

💰 总成本：几乎免费（只需要 DeepSeek API 生成讲稿，约 ¥1-2）`
}

main().catch(console.error)
