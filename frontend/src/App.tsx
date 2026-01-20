import { useState, useEffect } from 'react'
import SettingsModal from './components/SettingsModal'

interface PlotIdea {
  id: number
  content: string
}

function App() {
  const [inputText, setInputText] = useState('')
  const [extractedPlot, setExtractedPlot] = useState('')
  const [generatedPlots, setGeneratedPlots] = useState<PlotIdea[]>([])
  const [loading, setLoading] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const savedKey = localStorage.getItem('qwen_api_key')
    if (savedKey) {
      setApiKey(savedKey)
    }
  }, [])

  const handleSaveApiKey = (key: string) => {
    setApiKey(key)
    localStorage.setItem('qwen_api_key', key)
  }

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setError('请输入小说文本')
      return
    }

    if (!apiKey) {
      setError('请先在设置中配置千问 API Key')
      setShowSettings(true)
      return
    }

    setLoading(true)
    setError('')
    setExtractedPlot('')
    setGeneratedPlots([])

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          apiKey: apiKey,
        }),
      })

      if (!response.ok) {
        throw new Error('生成失败，请检查 API Key 是否正确')
      }

      const data = await response.json()
      setExtractedPlot(data.extractedPlot)
      setGeneratedPlots(data.generatedPlots.map((plot: string, index: number) => ({
        id: index + 1,
        content: plot,
      })))
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('已复制到剪贴板')
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 头部 */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-5xl font-bold text-white">灵感王</h1>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="设置"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          <p className="text-xl text-gray-300">小说梗概提取与生成器</p>
          <p className="text-sm text-gray-400 mt-2">输入小说文本，一键提取核心梗概并生成10个类似创意</p>
        </header>

        {/* 错误提示 */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {/* 输入区域 */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 shadow-2xl">
            <label className="block text-lg font-semibold text-white mb-3">
              输入小说文本
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="粘贴您的小说文本或故事梗概..."
              className="w-full h-48 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all"
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !inputText.trim()}
              className="mt-4 w-full py-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-opacity text-lg shadow-lg"
            >
              {loading ? '生成中...' : '提取梗概并生成创意'}
            </button>
          </div>
        </div>

        {/* 提取的梗概 */}
        {extractedPlot && (
          <div className="mb-8">
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm rounded-2xl p-6 border border-primary/30 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">提取的核心梗概</h2>
                <button
                  onClick={() => copyToClipboard(extractedPlot)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm"
                >
                  复制
                </button>
              </div>
              <p className="text-gray-200 leading-relaxed text-lg">{extractedPlot}</p>
            </div>
          </div>
        )}

        {/* 生成的梗概列表 */}
        {generatedPlots.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-white mb-6 text-center">生成的创意梗概</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {generatedPlots.map((plot) => (
                <div
                  key={plot.id}
                  className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-primary/50 transition-all shadow-xl hover:shadow-2xl"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-primary font-bold text-lg">创意 #{plot.id}</span>
                    <button
                      onClick={() => copyToClipboard(plot.content)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      title="复制"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{plot.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 页脚 */}
        <footer className="mt-16 text-center text-gray-400 text-sm">
          <p className="mb-2">本项目由<a href="https://www.aliyun.com/product/esa" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-secondary transition-colors">阿里云ESA</a>提供加速、计算和保护</p>
          <img src="https://img.alicdn.com/imgextra/i3/O1CN01H1UU3i1Cti9lYtFrs_!!6000000000139-2-tps-7534-844.png" alt="阿里云ESA" className="mx-auto mt-4 h-8 opacity-80" />
        </footer>
      </div>

      {/* 设置弹窗 */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />
    </div>
  )
}

export default App
