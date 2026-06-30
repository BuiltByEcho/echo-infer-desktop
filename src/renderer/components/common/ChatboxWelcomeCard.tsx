import { Box, Button, Flex, Image, Paper, Stack, Text } from '@mantine/core'
import { useTranslation } from 'react-i18next'
import { navigateToSettings } from '@/modals/Settings'
import platform from '@/platform'
import echoBanner from '@/static/echo-banner.jpeg'
import echoInferIcon from '@/static/echo-infer-icon.png'
import type { HomeWelcomeCardMode } from '@/utils/homeWelcomeCard'

export function ChatboxWelcomeCard(props: { mode: HomeWelcomeCardMode; pageName: string; className?: string }) {
  const { mode, className } = props
  const { t } = useTranslation()

  if (mode === 'none') {
    return null
  }

  const detail =
    mode === 'expired-license'
      ? t('Your upstream license status does not affect Echo Infer. Paste your Echo Infer API key to keep chatting.')
      : t('Paste your existing Echo Infer API key to enable private desktop inference.')

  return (
    <Paper
      radius="lg"
      withBorder
      p={0}
      className={`overflow-hidden border-cyan-300/20 shadow-[0_18px_60px_rgba(0,0,0,0.18)] ${className || ''}`}
      style={{
        background: '#020719',
      }}
    >
      <Box
        p="md"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(2, 7, 25, 0.98) 0%, rgba(2, 7, 25, 0.82) 62%, rgba(2, 7, 25, 0.62) 100%), url(${echoBanner})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Stack gap="sm">
          <Flex gap="sm" align="center" justify="center" wrap="nowrap">
            <Box
              className="flex shrink-0 items-center justify-center"
              style={{
                width: 54,
                height: 54,
                borderRadius: 18,
                background: '#020719',
                border: '1px solid rgba(103, 241, 255, 0.45)',
                boxShadow: '0 0 30px rgba(103, 241, 255, 0.22)',
                overflow: 'hidden',
              }}
            >
              <Image
                data-testid="echo-infer-welcome-logo"
                src={echoInferIcon}
                alt="Echo Infer logo"
                w={50}
                h={50}
                fit="contain"
              />
            </Box>

            <Stack gap={2} className="min-w-0">
              <Text fw={800} size="lg" c="white" lh={1.05} style={{ letterSpacing: '-0.03em' }}>
                {t('Welcome to Echo Infer Desktop')}
              </Text>
              <Text size="xs" fw={700} style={{ color: '#67f1ff', letterSpacing: '0.02em' }}>
                {t('Built by Echo')} · {t('Shipped for private builders')}
              </Text>
            </Stack>
          </Flex>

          <Text size="xs" c="gray.3" className="text-center" lh={1.35}>
            {detail}
          </Text>

          <Flex gap="xs" justify="center" align="center" wrap="wrap">
            <Button
              size="xs"
              variant="filled"
              h={32}
              miw={180}
              fw={700}
              flex="0 1 auto"
              color="cyan"
              onClick={() => navigateToSettings('/provider/echo-infer')}
            >
              {t('Paste Echo Infer API key')}
            </Button>
            <Button
              size="xs"
              variant="subtle"
              h={32}
              fw={500}
              flex="0 1 auto"
              style={{ color: '#67f1ff' }}
              onClick={() => platform.openLink('https://chat.builtbyecho.xyz/settings')}
            >
              {t('Get or rotate a key')}
            </Button>
          </Flex>
        </Stack>
      </Box>
    </Paper>
  )
}
