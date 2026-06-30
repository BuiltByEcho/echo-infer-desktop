import { describe, expect, it } from 'vitest'
import { chatSessionSettings, getDefaultPrompt, newConfigs, pictureSessionSettings, settings } from './defaults'
import { ModelProviderEnum, type SessionSettings, type Settings, Theme } from './types'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

describe('defaults', () => {
  it('settings() returns expected default values', () => {
    const result: Settings = settings()

    expect(result.theme).toBe(Theme.System)
    expect(result.language).toBe('en')
    expect(result.fontSize).toBe(14)
    expect(result.spellCheck).toBe(true)
    expect(result.showWordCount).toBe(false)
    expect(result.showTokenCount).toBe(false)
    expect(result.showTokenUsed).toBe(true)
  })

  it('settings() returns allowReportingAndTracking as true', () => {
    expect(settings().allowReportingAndTracking).toBe(true)
  })

  it('settings() disables auto updates until Echo release infrastructure is configured', () => {
    expect(settings().autoUpdate).toBe(false)
  })

  it('settings() returns enableMarkdownRendering as true', () => {
    expect(settings().enableMarkdownRendering).toBe(true)
  })

  it('settings() returns shortcuts object with expected keys', () => {
    const result = settings().shortcuts

    expect(Object.keys(result).sort()).toEqual(
      [
        'quickToggle',
        'inputBoxFocus',
        'inputBoxWebBrowsingMode',
        'newChat',
        'newPictureChat',
        'sessionListNavNext',
        'sessionListNavPrev',
        'sessionListNavTargetIndex',
        'dialogOpenSearch',
        'inputBoxSendMessage',
        'inputBoxSendMessageWithoutResponse',
        'optionNavUp',
        'optionNavDown',
        'optionSelect',
      ].sort()
    )
  })

  it('newConfigs() returns object with uuid string', () => {
    const result = newConfigs()

    expect(typeof result.uuid).toBe('string')
    expect(result.uuid).toMatch(UUID_REGEX)
  })

  it('getDefaultPrompt() returns expected string', () => {
    expect(getDefaultPrompt()).toBe('You are Echo Infer Desktop, a helpful assistant running through Echo Infer.')
  })

  it('settings() preconfigures Echo Infer as an OpenAI-compatible provider', () => {
    const echoInfer = settings().providers?.[ModelProviderEnum.EchoInfer]

    expect(echoInfer?.apiHost).toBe('https://infer.builtbyecho.xyz/v1')
    expect(echoInfer?.models?.map((model) => model.modelId)).toEqual(['echo-private', 'echo-fast', 'echo-best'])
    expect(echoInfer?.models?.[0]?.nickname).toBe('Echo Private')
  })

  it('chatSessionSettings() defaults new chats to Echo Infer private inference', () => {
    const result: SessionSettings = chatSessionSettings()

    expect(result.provider).toBe(ModelProviderEnum.EchoInfer)
    expect(result.modelId).toBe('echo-private')
  })

  it('pictureSessionSettings() returns provider, modelId, dalleStyle, imageGenerateNum', () => {
    const result: SessionSettings = pictureSessionSettings()

    expect(result.provider).toBe(ModelProviderEnum.ChatboxAI)
    expect(result.modelId).toBe('DALL-E-3')
    expect(result.dalleStyle).toBe('vivid')
    expect(result.imageGenerateNum).toBe(1)
  })
})
