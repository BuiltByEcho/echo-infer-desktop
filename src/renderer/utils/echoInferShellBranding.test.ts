import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = process.cwd()
const readSource = (relativePath: string) => readFileSync(join(root, relativePath), 'utf8')

describe('Echo Infer branded desktop shell', () => {
  it('brands the sidebar shell with the Echo logo instead of the upstream Chatbox mark', () => {
    const sidebar = readSource('src/renderer/Sidebar.tsx')

    expect(sidebar).toContain('Echo Infer')
    expect(sidebar).toContain('Private AI chat')
    expect(sidebar).toContain("import echoInferIcon from './static/echo-infer-icon.png'")
    expect(sidebar).toContain('data-testid="echo-infer-sidebar-logo"')
    expect(sidebar).not.toContain("import icon from './static/icon.png'")
    expect(sidebar).not.toContain('>Chatbox<')
    expect(sidebar).not.toContain("navigate({ to: '/about' })} style={{ cursor: 'pointer' }}")
  })

  it('ships Echo logo/banner assets for visible product branding surfaces', () => {
    expect(existsSync(join(root, 'src/renderer/static/echo-infer-icon.png'))).toBe(true)
    expect(existsSync(join(root, 'src/renderer/static/echo-banner.jpeg'))).toBe(true)
    expect(existsSync(join(root, 'src/renderer/static/icons/providers/echo-infer.png'))).toBe(true)
  })

  it('uses the Echo banner and logo on the first-run welcome card', () => {
    const welcomeCard = readSource('src/renderer/components/common/ChatboxWelcomeCard.tsx')

    expect(welcomeCard).toContain("import echoBanner from '@/static/echo-banner.jpeg'")
    expect(welcomeCard).toContain("import echoInferIcon from '@/static/echo-infer-icon.png'")
    expect(welcomeCard).toContain('data-testid="echo-infer-welcome-logo"')
    expect(welcomeCard).toContain('Built by Echo')
    expect(welcomeCard).toContain('Shipped for private builders')
  })

  it('hides nonessential upstream feature entry points without deleting their routes', () => {
    const sidebar = readSource('src/renderer/Sidebar.tsx')
    const flags = readSource('src/renderer/utils/feature-flags.ts')

    expect(flags).toContain('echoBrandedShell: true')
    expect(flags).toContain('imageCreator: false')
    expect(flags).toContain('copilots: false')
    expect(flags).toContain('helpCenter: false')
    expect(flags).toContain('aboutLink: false')

    expect(sidebar).not.toContain('data-testid="new-image-button"')
    expect(sidebar).not.toContain("label={t('My Copilots')}")
    expect(sidebar).not.toContain("label={t('Help')}")
    expect(sidebar).not.toContain('<AboutNavLink')
    expect(readSource('src/renderer/routes/image-creator/index.tsx')).toContain("createFileRoute('/image-creator/')")
    expect(readSource('src/renderer/routes/copilots/route.tsx')).toContain("createFileRoute('/copilots')")
  })

  it('brands the guide/onboarding copy for Echo Infer instead of upstream Chatbox', () => {
    const guideHook = readSource('src/renderer/routes/guide/-hooks/useGuideSession.ts')
    const userTypeCards = readSource('src/renderer/routes/guide/-components/UserTypeCards.tsx')
    const guideRoute = readSource('src/renderer/routes/guide/index.tsx')
    const avatar = readSource('src/renderer/components/common/Avatar.tsx')

    expect(guideHook).toContain("I'm Echo, your Echo Infer setup guide")
    expect(guideHook).toContain('Echo Infer Desktop is a focused private AI chat client')
    expect(guideHook).toContain('infer.builtbyecho.xyz')
    expect(guideHook).not.toContain('Chatbox is an **all-in-one AI chat client**')
    expect(guideHook).not.toContain('hi@chatboxai.com')
    expect(guideHook).not.toContain('Product Manual')
    expect(guideHook).not.toContain('Help Center')
    expect(guideHook).not.toContain('Follow Chatbox')

    expect(userTypeCards).toContain('Connect Echo Infer')
    expect(userTypeCards).not.toContain('Use Chatbox AI service')
    expect(guideRoute).toContain('Echo Infer Guide')
    expect(guideRoute).toContain('provider="echo-infer"')
    expect(guideRoute).toContain("import echoBanner from '@/static/echo-banner.jpeg'")
    expect(guideRoute).toContain("import echoInferIcon from '@/static/echo-infer-icon.png'")
    expect(guideRoute).toContain('data-testid="echo-infer-guide-hero"')
    expect(userTypeCards).toContain("import echoInferIcon from '@/static/echo-infer-icon.png'")
    expect(userTypeCards).toContain('echo-infer-guide-card-logo')
    expect(userTypeCards).not.toContain('icon-chatbox.svg')
    expect(avatar).toContain("import echoInferIcon from '@/static/echo-infer-icon.png'")
    expect(avatar).toContain("sessionType === 'guide'")
    expect(avatar).toContain('Echo Infer assistant logo')
    expect(guideRoute).not.toContain('provider="chatbox-ai"')
    expect(guideRoute).not.toContain('Chatbox Guide')
  })

  it('uses Echo Infer Desktop as the renderer document title and metadata', () => {
    const indexHtml = readSource('src/renderer/index.html')

    expect(indexHtml).toContain('<title>Echo Infer Desktop</title>')
    expect(indexHtml).toContain('content="Echo Infer Desktop"')
    expect(indexHtml).not.toContain('<title>Chatbox</title>')
    expect(indexHtml).not.toContain('content="chatbox"')
  })

  it('keeps the Echo-branded sidebar clean by hiding upstream seeded example chats', () => {
    const sessionList = readSource('src/renderer/components/session/SessionList.tsx')
    const initialData = readSource('src/renderer/packages/initial_data.ts')

    expect(initialData).toContain('ECHO_INFER_VISIBLE_BUILTIN_SESSION_IDS')
    expect(initialData).toContain('HIDDEN_ECHO_INFER_BUILTIN_SESSION_IDS')
    expect(initialData).toContain("'justchat-b612-406a-985b-3ab4d2c482ff'")
    expect(sessionList).toContain('visibleSessions')
    expect(sessionList).toContain('HIDDEN_ECHO_INFER_BUILTIN_SESSION_IDS.has(session.id)')
    expect(sessionList).not.toContain('data={sortedSessions}')
    expect(sessionList).not.toContain('sortedSessions?.map((session) => session.id)')
  })
})
