import { ModelProviderEnum, ModelProviderType } from '../../types'
import { defineProvider } from '../registry'
import OpenAI from './models/openai'

export const echoInferProvider = defineProvider({
  id: ModelProviderEnum.EchoInfer,
  name: 'Echo Infer',
  type: ModelProviderType.OpenAI,
  description: 'Echo Infer OpenAI-compatible broker with privacy, fast, and best route aliases.',
  urls: {
    website: 'https://chat.builtbyecho.xyz',
    docs: 'https://chat.builtbyecho.xyz/settings',
    models: 'https://infer.builtbyecho.xyz/v1/models',
  },
  defaultSettings: {
    apiHost: 'https://infer.builtbyecho.xyz/v1',
    models: [
      {
        modelId: 'echo-private',
        nickname: 'Echo Private',
        labels: ['private', 'bankr'],
        contextWindow: 8192,
        maxOutput: 2048,
      },
      {
        modelId: 'echo-fast',
        nickname: 'Echo Fast',
        labels: ['fast'],
        contextWindow: 8192,
        maxOutput: 2048,
      },
      {
        modelId: 'echo-best',
        nickname: 'Echo Best',
        labels: ['best'],
        contextWindow: 16384,
        maxOutput: 4096,
      },
    ],
  },
  createModel: (config) => {
    return new OpenAI(
      {
        apiKey: config.effectiveApiKey,
        apiHost: config.formattedApiHost,
        model: config.model,
        dalleStyle: config.settings.dalleStyle || 'vivid',
        temperature: config.settings.temperature,
        topP: config.settings.topP,
        maxOutputTokens: config.settings.maxTokens,
        injectDefaultMetadata: config.globalSettings.injectDefaultMetadata,
        useProxy: config.providerSetting.useProxy || false,
        stream: config.settings.stream,
        listModelsFallback: config.providerSetting.models || echoInferProvider.defaultSettings?.models,
      },
      config.dependencies
    )
  },
  getDisplayName: (modelId, providerSettings) => {
    return `Echo Infer (${providerSettings?.models?.find((m) => m.modelId === modelId)?.nickname || modelId})`
  },
})
