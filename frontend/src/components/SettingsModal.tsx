import React from 'react'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  apiKey: string
  onSaveApiKey: (key: string) => void
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, apiKey, onSaveApiKey }) => {
  const [tempKey, setTempKey] = React.useState(apiKey)

  React.useEffect(() => {
    setTempKey(apiKey)
  }, [apiKey])

  const handleSave = () => {
    onSaveApiKey(tempKey)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">设置</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                千问 API Key
              </label>
              <input
                type="password"
                value={tempKey}
                onChange={(e) => setTempKey(e.target.value)}
                placeholder="请输入您的千问 API Key"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <p className="mt-2 text-xs text-gray-400">
                API Key 将保存在浏览器本地，不会上传到服务器
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-sm font-medium text-gray-300 mb-2">如何获取 API Key？</h3>
              <ol className="text-xs text-gray-400 space-y-1 list-decimal list-inside">
                <li>访问阿里云百炼平台</li>
                <li>登录并进入控制台</li>
                <li>创建应用并获取 API Key</li>
              </ol>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-lg transition-opacity font-medium"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
