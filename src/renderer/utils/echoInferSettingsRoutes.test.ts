import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = process.cwd()
const readSource = (relativePath: string) => readFileSync(join(root, relativePath), 'utf8')

describe('Echo Infer settings entry points', () => {
  it('opens Echo Infer provider settings by default instead of upstream provider upsells', () => {
    const settingsIndex = readSource('src/renderer/routes/settings/index.tsx')
    const providerIndex = readSource('src/renderer/routes/settings/provider/index.tsx')
    const providerPage = readSource('src/renderer/routes/settings/provider/$providerId.tsx')

    expect(settingsIndex).toContain("providerId: 'echo-infer'")
    expect(settingsIndex).not.toContain("'/settings/chatbox-ai'")
    expect(providerIndex).toContain("providerId: 'echo-infer'")
    expect(providerIndex).not.toContain("providerId: 'openai'")
    expect(providerPage).toContain('Paste your existing Echo Infer API key')
    expect(providerPage).toContain('Check tests echo-private')
  })

  it('hides legacy Chatbox AI from the default provider list while keeping Echo Infer first', () => {
    const providerRoute = readSource('src/renderer/routes/settings/provider/route.tsx')

    expect(providerRoute).toContain('ModelProviderEnum.EchoInfer')
    expect(providerRoute).toContain('p.id !== ModelProviderEnum.ChatboxAI')
    expect(providerRoute).not.toContain('Put ChatboxAI first')
    expect(providerRoute).not.toContain('const chatboxAI = systemProviders.find')
  })

  it('keeps the first-run welcome card branded for Echo Infer Desktop', () => {
    const welcomeCard = readSource('src/renderer/components/common/ChatboxWelcomeCard.tsx')

    expect(welcomeCard).toContain('Welcome to Echo Infer Desktop')
    expect(welcomeCard).not.toContain('Welcome to Chatbox!')
    expect(welcomeCard).not.toContain('Login Chatbox AI')
  })

  it('does not subscribe to a freshly allocated onboarding object on every settings-store snapshot', () => {
    const homeRoute = readSource('src/renderer/routes/index.tsx')

    expect(homeRoute).not.toContain('useSettingsStore(getEchoInferOnboardingState)')
    expect(homeRoute).toContain('const echoInferNeedsCredential = useSettingsStore')
  })
})
