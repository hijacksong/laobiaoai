/**
 * 老表AI - 课程视频脚本生成器
 *
 * 功能：
 * 1. 从 CourseDetail.tsx 提取所有课程数据
 * 2. 使用 DeepSeek API 为每节课生成讲稿
 * 3. 输出 JSON 格式，可直接用于 HeyGen/Synthesia 批量渲染
 *
 * 使用：node scripts/generate-scripts.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = join(__dirname, '..')

// ============================================
// 配置
// ============================================
const DEEPSEEK_API_KEY = process.env.VITE_DEEPSEEK_API_KEY || process.env.DEEPSEEK_API_KEY || 'sk-dc942266183e46db8a301f7ea2733a1a'
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'

// 输出目录
const SCRIPTS_DIR = join(PROJECT_ROOT, 'public', 'course-scripts')
const VIDEOS_DIR = join(PROJECT_ROOT, 'public', 'course-videos')

// ============================================
// 课程数据（从 CourseDetail.tsx 提取）
// ============================================
const COURSES = [
  {
    id: 1,
    title: 'ChatGPT人话版教程',
    description: '从注册到高级用法，老表手把手教你玩转ChatGPT',
    lessons: [
      { id: 1, title: 'ChatGPT是什么？为什么这么火？', duration: '5分钟' },
      { id: 2, title: '手把手教你注册ChatGPT账号', duration: '8分钟' },
      { id: 3, title: '基础对话技巧 - 让AI更懂你', duration: '6分钟' },
      { id: 4, title: '实战案例 - 用ChatGPT写文案', duration: '7分钟' },
      { id: 5, title: '高级技巧 - 提升10倍效率', duration: '4分钟' },
    ]
  },
  {
    id: 2,
    title: 'AI绘画零基础入门',
    description: 'Midjourney、Stable Diffusion，人话讲解',
    lessons: [
      { id: 1, title: 'AI绘画是什么？能做什么？', duration: '5分钟' },
      { id: 2, title: 'Midjourney注册和基础使用', duration: '10分钟' },
      { id: 3, title: '提示词写法 - 画出你想要的图', duration: '8分钟' },
      { id: 4, title: '实战 - 画一个好看的头像', duration: '7分钟' },
      { id: 5, title: 'Stable Diffusion入门', duration: '10分钟' },
      { id: 6, title: '高级技巧 - 风格控制', duration: '5分钟' },
    ]
  },
  {
    id: 3,
    title: '10个必备AI工具',
    description: '老表精选10个最实用的AI工具',
    lessons: [
      { id: 1, title: 'AI工具全景图 - 如何选择？', duration: '6分钟' },
      { id: 2, title: 'ChatGPT - 最强对话助手', duration: '6分钟' },
      { id: 3, title: 'Midjourney - AI绘画神器', duration: '6分钟' },
      { id: 4, title: 'Notion AI - 智能笔记助手', duration: '6分钟' },
      { id: 5, title: 'GitHub Copilot - AI编程助手', duration: '6分钟' },
      { id: 6, title: 'Runway - AI视频编辑', duration: '6分钟' },
      { id: 7, title: 'ElevenLabs - AI语音合成', duration: '6分钟' },
      { id: 8, title: 'DeepL - AI翻译神器', duration: '6分钟' },
      { id: 9, title: 'Grammarly - AI写作助手', duration: '6分钟' },
      { id: 10, title: '如何持续发现新工具', duration: '6分钟' },
    ]
  },
  {
    id: 4,
    title: 'AI提示词入门',
    description: '学会写好提示词，让AI更懂你的意思',
    lessons: [
      { id: 1, title: '提示词是什么？为什么重要？', duration: '5分钟' },
      { id: 2, title: '提示词的基本结构', duration: '7分钟' },
      { id: 3, title: '常见错误 - 你可能踩过的坑', duration: '6分钟' },
      { id: 4, title: '优化技巧 - 让AI更懂你', duration: '8分钟' },
      { id: 5, title: '场景模板 - 拿来就用', duration: '8分钟' },
      { id: 6, title: '高级技巧 - 角色扮演和思维链', duration: '6分钟' },
    ]
  },
  {
    id: 5,
    title: '用AI做副业赚钱',
    description: '10个AI副业项目，手把手教你从0到月入过万',
    lessons: [
      { id: 1, title: 'AI副业全景图 - 哪些能赚钱？', duration: '10分钟' },
      { id: 2, title: '项目1 - AI文案写作（月入5000+）', duration: '15分钟' },
      { id: 3, title: '项目2 - AI绘画接单（月入8000+）', duration: '15分钟' },
      { id: 4, title: '项目3 - AI视频制作（月入10000+）', duration: '15分钟' },
      { id: 5, title: '项目4 - AI翻译服务（月入6000+）', duration: '12分钟' },
      { id: 6, title: '项目5 - AI配音接单（月入7000+）', duration: '12分钟' },
      { id: 7, title: '如何找客户 - 3个有效渠道', duration: '12分钟' },
      { id: 8, title: '定价策略 - 不贱卖也不吓跑客户', duration: '10分钟' },
      { id: 9, title: '接单话术 - 提高成交率', duration: '10分钟' },
      { id: 10, title: '案例分析 - 老表的真实经历', duration: '15分钟' },
    ]
  },
  {
    id: 6,
    title: 'AI办公效率提升',
    description: '用AI提升工作效率，每天节省2小时',
    lessons: [
      { id: 1, title: 'AI办公全景 - 哪些能自动化？', duration: '8分钟' },
      { id: 2, title: '用AI写邮件 - 3分钟搞定', duration: '10分钟' },
      { id: 3, title: '用AI做PPT - 10分钟完成', duration: '12分钟' },
      { id: 4, title: '用AI写报告 - 告别加班', duration: '10分钟' },
      { id: 5, title: '数据分析 - AI帮你找规律', duration: '10分钟' },
      { id: 6, title: '会议纪要 - 自动整理要点', duration: '8分钟' },
      { id: 7, title: 'Excel自动化 - 公式不用记', duration: '10分钟' },
      { id: 8, title: '时间管理 - AI帮你规划', duration: '8分钟' },
      { id: 9, title: '团队协作 - AI提升沟通效率', duration: '8分钟' },
      { id: 10, title: '综合案例 - 一天的高效工作流', duration: '10分钟' },
    ]
  },
  {
    id: 7,
    title: 'AI创作全流程',
    description: '从文案到视频，用AI完成整个创作流程',
    lessons: [
      { id: 1, title: 'AI创作全景 - 完整工作流', duration: '10分钟' },
      { id: 2, title: '选题策划 - AI帮你找热点', duration: '12分钟' },
      { id: 3, title: '文案创作 - 写出爆款标题', duration: '15分钟' },
      { id: 4, title: '文案创作 - 正文结构和技巧', duration: '15分钟' },
      { id: 5, title: '配图生成 - AI画出吸睛图片', duration: '12分钟' },
      { id: 6, title: '封面设计 - 提升点击率', duration: '10分钟' },
      { id: 7, title: '视频脚本 - AI帮你写分镜', duration: '12分钟' },
      { id: 8, title: '视频制作 - AI剪辑和特效', duration: '15分钟' },
      { id: 9, title: '配音和字幕 - AI一键生成', duration: '10分钟' },
      { id: 10, title: '发布优化 - 标签和推荐算法', duration: '10分钟' },
      { id: 11, title: '数据分析 - 优化内容策略', duration: '10分钟' },
      { id: 12, title: '案例实战 - 从0到10万粉', duration: '20分钟' },
    ]
  },
  {
    id: 8,
    title: 'AI编程助手实战',
    description: '用AI写代码，效率提升5倍',
    lessons: [
      { id: 1, title: 'AI编程助手全景', duration: '8分钟' },
      { id: 2, title: 'GitHub Copilot安装和配置', duration: '10分钟' },
      { id: 3, title: 'Copilot基础用法 - 代码补全', duration: '12分钟' },
      { id: 4, title: 'Copilot高级技巧 - 注释生成代码', duration: '15分钟' },
      { id: 5, title: 'ChatGPT辅助编程 - 提示词技巧', duration: '12分钟' },
      { id: 6, title: '用AI写函数和算法', duration: '15分钟' },
      { id: 7, title: '用AI Debug - 快速找bug', duration: '12分钟' },
      { id: 8, title: '代码优化 - AI帮你重构', duration: '12分钟' },
      { id: 9, title: '学习新技术 - AI当你的老师', duration: '10分钟' },
      { id: 10, title: '实战项目 - AI辅助开发Todo App', duration: '25分钟' },
      { id: 11, title: '最佳实践 - 如何高效使用AI', duration: '10分钟' },
    ]
  }
]

// ============================================
// DeepSeek API 调用
// ============================================
async function callDeepSeek(systemPrompt, userPrompt) {
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
      max_tokens: 4000
    })
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}

// ============================================
// 生成单节讲稿
// ============================================
async function generateLessonScript(courseTitle, lessonTitle, duration, lessonNum, totalLessons) {
  const systemPrompt = `你是"老表AI"课程的讲师"老表"，风格接地气、亲切，像朋友聊天一样讲课。
语言要点：
- 用"老表""咱们"等亲切称呼
- 避免专业术语，用人话解释
- 适当使用"嘿""来""搞定"等口语
- 每节课开头打招呼，结尾总结要点
- 在关键操作处标注【演示画面】`

  const userPrompt = `请为课程《${courseTitle}》的第${lessonNum}/${totalLessons}课写讲稿。

课程：${courseTitle}
课时：${lessonTitle}
时长：${duration}

要求：
1. 开场白（15秒）：打招呼 + 回顾上节 + 本节预告
2. 主体内容：分3-5个要点展开，每个要点有【演示画面】标注
3. 结尾总结（10秒）：本节要点回顾 + 下节预告
4. 总字数约 ${parseInt(duration) * 180} 字（按每分钟180字计算）
5. 全程用老表的口吻

输出格式：
---
## ${lessonTitle}

【开场】
（开场内容...）

【正文】
### 要点1：xxx
【演示画面】具体画面描述
（讲解内容...）

### 要点2：xxx
...

【结尾】
（总结和下节预告...）
---`

  return callDeepSeek(systemPrompt, userPrompt)
}

// ============================================
// 批量生成
// ============================================
async function generateAllScripts() {
  if (!existsSync(SCRIPTS_DIR)) {
    mkdirSync(SCRIPTS_DIR, { recursive: true })
  }
  if (!existsSync(VIDEOS_DIR)) {
    mkdirSync(VIDEOS_DIR, { recursive: true })
  }

  const totalLessons = COURSES.reduce((sum, c) => sum + c.lessons.length, 0)
  const totalDuration = COURSES.reduce((sum, c) => {
    return sum + c.lessons.reduce((s, l) => s + parseInt(l.duration), 0)
  }, 0)

  console.log('═══════════════════════════════════════')
  console.log('  老表AI - 课程视频脚本批量生成器')
  console.log('═══════════════════════════════════════')
  console.log(`  课程数：${COURSES.length} 门`)
  console.log(`  总课时：${totalLessons} 节`)
  console.log(`  总时长：约 ${totalDuration} 分钟`)
  console.log('═══════════════════════════════════════\n')

  // 先生成课程索引清单
  const courseIndex = COURSES.map(c => ({
    id: c.id,
    title: c.title,
    description: c.description,
    lessonCount: c.lessons.length,
    lessons: c.lessons.map(l => ({
      id: l.id,
      title: l.title,
      duration: l.duration
    }))
  }))

  for (const course of COURSES) {
    console.log(`\n📚 正在处理：${course.title}`)
    console.log(`   ${'─'.repeat(40)}`)

    const courseScripts = {
      courseId: course.id,
      courseTitle: course.title,
      courseDescription: course.description,
      generatedAt: new Date().toISOString(),
      lessons: []
    }

    for (let i = 0; i < course.lessons.length; i++) {
      const lesson = course.lessons[i]
      const lessonTitle = `${i + 1}. ${lesson.title}`

      process.stdout.write(`   🎬 [${i + 1}/${course.lessons.length}] ${lesson.title}... `)

      try {
        const script = await generateLessonScript(
          course.title,
          lesson.title,
          lesson.duration,
          i + 1,
          course.lessons.length
        )

        courseScripts.lessons.push({
          lessonId: lesson.id,
          lessonNumber: i + 1,
          title: lesson.title,
          duration: lesson.duration,
          script: script
        })

        // 保存单节脚本
        const safeTitle = lesson.title.replace(/[\\/:*?"<>|]/g, '-')
        const lessonFile = join(SCRIPTS_DIR, `course-${course.id}-lesson-${lesson.id}-${safeTitle}.md`)
        writeFileSync(lessonFile, script, 'utf-8')

        console.log('✅')
      } catch (error) {
        console.log(`❌ ${error.message}`)
      }

      // 避免请求过快
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    // 保存课程全部脚本的 JSON
    const courseFile = join(SCRIPTS_DIR, `course-${course.id}-${course.title}.json`)
    writeFileSync(courseFile, JSON.stringify(courseScripts, null, 2), 'utf-8')

    console.log(`   ✅ 已保存到：public/course-scripts/course-${course.id}-${course.title}.json`)
  }

  // 生成总清单
  const manifest = {
    generatedAt: new Date().toISOString(),
    totalCourses: COURSES.length,
    totalLessons: totalLessons,
    totalDurationMinutes: totalDuration,
    courses: courseIndex
  }
  writeFileSync(join(SCRIPTS_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf-8')

  console.log('\n═══════════════════════════════════════')
  console.log('  ✅ 全部生成完成！')
  console.log(`  📁 脚本目录：public/course-scripts/`)
  console.log(`  📋 清单文件：public/course-scripts/manifest.json`)
  console.log('═══════════════════════════════════════')
  console.log('\n下一步：')
  console.log('  1. 查看脚本：ls public/course-scripts/')
  console.log('  2. 使用 HeyGen API 批量渲染视频')
  console.log('  3. 或用剪映专业版导入脚本手动制作')
}

// ============================================
// 生成 HeyGen 渲染配置
// ============================================
function generateHeyGenConfig() {
  const config = {
    provider: 'heygen',
    apiEndpoint: 'https://api.heygen.com/v2/video/generate',
    avatarId: 'default-chinese-male', // 需要替换为实际avatar ID
    voiceId: 'zh-CN-XiaoxiaoNeural',   // 需要替换为实际voice ID
    courses: COURSES.map(course => ({
      courseId: course.id,
      courseTitle: course.title,
      videos: course.lessons.map(lesson => ({
        lessonId: lesson.id,
        title: lesson.title,
        duration: lesson.duration,
        scriptFile: `public/course-scripts/course-${course.id}-lesson-${lesson.id}-${lesson.title.replace(/[\\/:*?"<>|]/g, '-')}.md`,
        outputFile: `public/course-videos/course-${course.id}-lesson-${lesson.id}.mp4`
      }))
    }))
  }

  const configFile = join(VIDEOS_DIR, 'heygen-config.json')
  writeFileSync(configFile, JSON.stringify(config, null, 2), 'utf-8')
  console.log(`\n📋 HeyGen 渲染配置已生成：${configFile}`)
}

// ============================================
// 主流程
// ============================================
async function main() {
  const args = process.argv.slice(2)
  const command = args[0] || 'scripts'

  switch (command) {
    case 'scripts':
      // 生成讲稿
      await generateAllScripts()
      // 生成 HeyGen 配置
      generateHeyGenConfig()
      break

    case 'heygen-config':
      // 仅生成 HeyGen 配置
      generateHeyGenConfig()
      break

    case 'preview':
      // 预览课程清单（不调用 API）
      const totalLessons = COURSES.reduce((sum, c) => sum + c.lessons.length, 0)
      const totalDuration = COURSES.reduce((sum, c) => {
        return sum + c.lessons.reduce((s, l) => s + parseInt(l.duration), 0)
      }, 0)

      console.log('📊 课程清单预览：\n')
      COURSES.forEach(c => {
        const dur = c.lessons.reduce((s, l) => s + parseInt(l.duration), 0)
        const free = c.id <= 4 ? '免费' : `¥${c.id === 5 ? 99 : c.id === 6 ? 79 : c.id === 7 ? 129 : 99}`
        console.log(`  ${c.id}. ${c.title} (${free}, ${dur}分钟, ${c.lessons.length}节)`)
        c.lessons.forEach((l, i) => {
          console.log(`     ${i+1}. ${l.title} [${l.duration}]`)
        })
      })
      console.log(`\n  总计：${COURSES.length}门课，${totalLessons}节，约${totalDuration}分钟`)

      // 估算成本
      const estimatedHeyGenCost = totalDuration * 0.3 // 约 $0.3/分钟
      console.log(`\n💰 估算成本（HeyGen）：约 $${estimatedHeyGenCost.toFixed(0)}（按$0.3/分钟）`)
      console.log(`💰 估算成本（DeepSeek脚本生成）：约 ¥${(totalLessons * 0.02).toFixed(1)}（按每节约2000 token）`)
      break

    default:
      console.log('用法：')
      console.log('  node scripts/generate-scripts.mjs scripts       # 生成所有课程讲稿')
      console.log('  node scripts/generate-scripts.mjs heygen-config  # 仅生成HeyGen配置')
      console.log('  node scripts/generate-scripts.mjs preview         # 预览课程清单')
  }
}

main().catch(console.error)
