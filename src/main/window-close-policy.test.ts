import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const mainSource = () => readFileSync(join(process.cwd(), 'src/main/main.ts'), 'utf8')

function extractHandlerBody(source: string, handlerName: string): string {
  const start = source.indexOf(handlerName)
  if (start === -1) {
    return ''
  }
  const bodyStart = source.indexOf('=> {', start)
  if (bodyStart === -1) {
    return ''
  }
  let depth = 0
  for (let index = bodyStart + 4; index < source.length; index++) {
    const char = source[index]
    if (char === '{') {
      depth++
    } else if (char === '}') {
      if (depth === 0) {
        return source.slice(bodyStart + 4, index)
      }
      depth--
    }
  }
  return ''
}

function stripLineComments(source: string): string {
  return source
    .split('\n')
    .map((line) => line.replace(/\/\/.*$/, ''))
    .join('\n')
}

describe('desktop window close policy', () => {
  it('quits the app when all windows close on non-macOS desktops', () => {
    const body = stripLineComments(extractHandlerBody(mainSource(), "app.on('window-all-closed'"))

    expect(body).toMatch(/if \(process\.platform !== 'darwin'\)\s*{\s*app\.quit\(\)/)
  })

  it('routes the custom title-bar close button to app quit on Windows/Linux', () => {
    const body = stripLineComments(extractHandlerBody(mainSource(), "ipcMain.handle('window:close'"))

    expect(body).toMatch(/if \(process\.platform !== 'darwin'\)\s*{\s*app\.quit\(\)/)
    expect(body).toContain('mainWindow?.close()')
  })
})
