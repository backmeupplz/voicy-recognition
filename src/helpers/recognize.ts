// Dependencies
import { tryDeletingFile } from './tryDeletingFile'
import { duration, flacify } from './flac'
import { wit } from './wit'
import { google } from './google'
import { ReadStream } from 'fs'
import { injectOneVoice } from '../models'

export async function recognizeWit(key: string, filePath: string) {
  try {
    // Conver to flac
    const size = await duration(filePath)
    // Recognize
    const text = await wit(key, filePath, size)
    await injectOneVoice('wit', size)
    return text
  } finally {
    tryDeletingFile(filePath)
  }
}

export async function recognizeGoogle(
  key: ReadStream,
  filePath: string,
  language: string
) {
  try {
    // Convert to flac
    const { flacPath, duration } = await flacify(filePath)
    // Recognize
    const text = await google(await rsToJson(key), flacPath, language)
    await injectOneVoice('google', duration)
    return text
  } finally {
    tryDeletingFile(filePath)
  }
}

function rsToJson(rs: ReadStream): Promise<Object> {
  return new Promise((res, rej) => {
    let result = ''
    rs.on('data', (data: any) => {
      result = `${result}${data}`
    })
    rs.on('end', () => {
      res(JSON.parse(result))
    })
    rs.on('error', err => {
      rej(err)
    })
  })
}
