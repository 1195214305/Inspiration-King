/**
 * ESA Pages 边缘函数入口
 * 灵感王 - 小说梗概生成器
 */

async function fetch(request) {
  const url = new URL(request.url)
  const path = url.pathname

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  }

  // 处理 CORS 预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // 处理 /api/generate 请求
  if (path === '/api/generate') {
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: '仅支持 POST 请求' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    try {
      const { text, apiKey } = await request.json()

      if (!text || !apiKey) {
        return new Response(JSON.stringify({ error: '缺少必要参数' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
      }

      // 第一步：提取核心梗概
      const extractPrompt = `请从以下小说文本中提取核心梗概，要求简洁犀利，突出核心冲突和情感爆发点。严格禁止输出带有AI或网络元素的内容。

小说文本：
${text}

请直接输出核心梗概，不要有任何前缀或解释。`

      const extractResponse = await globalThis.fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'qwen-plus',
          messages: [
            { role: 'user', content: extractPrompt }
          ],
          temperature: 0.7
        })
      })

      if (!extractResponse.ok) {
        throw new Error('千问API调用失败')
      }

      const extractData = await extractResponse.json()
      const extractedPlot = extractData.choices[0].message.content.trim()

      // 第二步：生成10个类似梗概
      const generatePrompt = `根据以下核心梗概，生成10个类似的小说梗概。要求：
1. 大脑洞、爆炸性情节、多重反转
2. 严格禁止输出带有AI或网络元素的核心梗概
3. 符合"追妻火葬场"（后悔的前任试图挽回）、"世事无常"（社会剧/现实主义）、"复仇爽文"（满足复仇故事）、"悬疑"等类型
4. 根据以下公式生成：
   - 核心冲突 = 欲望/需求 × 致命障碍 × 代价
   - 独特元素 = 反套路设定 + 象征性细节
   - 情感爆发点 = 伏笔 × 转折点时机 × 心理冲击
   - 不可避免的结果 = 逻辑闭环 × 余韵设计

核心梗概：
${extractedPlot}

请输出10个梗概，每个梗概用"---"分隔，不要有编号或其他前缀。`

      const generateResponse = await globalThis.fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'qwen-plus',
          messages: [
            { role: 'user', content: generatePrompt }
          ],
          temperature: 0.9
        })
      })

      if (!generateResponse.ok) {
        throw new Error('千问API调用失败')
      }

      const generateData = await generateResponse.json()
      const generatedText = generateData.choices[0].message.content.trim()

      // 解析生成的梗概
      const generatedPlots = generatedText
        .split('---')
        .map(plot => plot.trim())
        .filter(plot => plot.length > 0)
        .slice(0, 10)

      return new Response(JSON.stringify({
        extractedPlot,
        generatedPlots
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })

    } catch (error) {
      console.error('生成失败:', error)
      return new Response(JSON.stringify({
        error: error.message || '生成失败，请重试'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
  }

  // 非 API 请求，返回 404 让 ESA 处理静态资源
  return new Response(null, { status: 404 })
}

export default { fetch }
