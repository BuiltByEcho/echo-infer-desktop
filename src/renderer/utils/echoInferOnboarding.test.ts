import { settings as defaultSettings } from '@shared/defaults'
import { ModelProviderEnum, type Settings } from '@shared/types'
import { describe, expect, it } from 'vitest'
import { getEchoInferOnboardingState } from './echoInferOnboarding'

function withEchoInferKey(keyValue: string): Settings {
  const base = defaultSettings()
  return {
    ...base,
    providers: {
      ...base.providers,
      [ModelProviderEnum.EchoInfer]: {
        ...base.providers?.[ModelProviderEnum.EchoInfer],
        apiKey: keyValue,
      },
    },
  }
}

describe('getEchoInferOnboardingState', () => {
  it('prompts first-run desktop users to paste an Echo Infer API key', () => {
    const state = getEchoInferOnboardingState(defaultSettings())

    expect(state.needsCredential).toBe(true)
    expect(state.settingsPath).toBe('/provider/echo-infer')
    expect(state.defaultBaseUrl).toBe('https://infer.builtbyecho.xyz/v1')
    expect(state.defaultModel).toBe('echo-private')
  })

  it('does not prompt once an Echo Infer API key is configured', () => {
    const state = getEchoInferOnboardingState(withEchoInferKey('echo_sk_test'))

    expect(state.needsCredential).toBe(false)
  })
})
