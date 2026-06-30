import platform from '@/platform'

export const featureFlags = {
  echoBrandedShell: true,
  mcp: platform.type === 'desktop',
  knowledgeBase: platform.type === 'desktop',
  skills: false,
  taskMode: false,
  imageCreator: false,
  copilots: false,
  helpCenter: false,
  aboutLink: false,
}
