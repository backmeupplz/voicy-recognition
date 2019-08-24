// Dependencies
import { ReadStream } from 'fs'
import { path } from 'temp'
import { createWriteStream } from 'fs'

export function saveReadStream(rs: ReadStream): Promise<string> {
  const filePath = path({ suffix: '.voicytemp' })
  const ws = createWriteStream(filePath)
  rs.pipe(ws)
  return new Promise((res, rej) => {
    rs.on('error', err => rej(err))
    rs.on('end', () => res(filePath))
  })
}
