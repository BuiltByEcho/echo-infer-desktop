import { ModelProviderEnum, type Settings } from '@shared/types'

export const ECHO_INFER_SETTINGS_PATH = '/provider/echo-infer' as const
export const ECHO_INFER_DEFAULT_BASE_URL = 'https://infer.builtbyecho.xyz/v1'
export const ECHO_INFER_DEFAULT_MODEL = 'echo-private'

export type EchoInferOnboardingState = {
  needsCredential: boolean
  settingsPath: '/provider/echo-infer'
  defaultBaseUrl: string
  defaultModel: string
}

export function getEchoInferOnboardingState(settings: Settings): EchoInferOnboardingState {
  const echoInferSettings = settings.providers?.[ModelProviderEnum.EchoInfer]
  const configuredCredential = typeof echoInferSettings?.apiKey === 'string' ? echoInferSettings.apiKey.trim() : ''

  return {
    needsCredential: configuredCredential.length === 0,
    settingsPath: ECHO_INFER_SETTINGS_PATH,
    defaultBaseUrl: echoInferSettings?.apiHost || ECHO_INFER_DEFAULT_BASE_URL,
    defaultModel: echoInferSettings?.models?.[0]?.modelId || ECHO_INFER_DEFAULT_MODEL,
  }
}
