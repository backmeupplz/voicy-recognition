// Dependencies
import * as ffmpeg from 'fluent-ffmpeg'
import { path } from 'temp'
import { tryDeletingFile } from './tryDeletingFile'

export function flacify(
  filePath: string
): Promise<{ flacPath: string; duration: number }> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, info) => {
      if (err) {
        reject(err)
        return
      }

      const fileSize = info.format.duration
      const output = path({ suffix: '.flac' })

      ffmpeg()
        .on('error', error => {
          tryDeletingFile(output)
          reject(error)
        })
        .on('end', () => resolve({ flacPath: output, duration: fileSize }))
        .input(filePath)
        .setStartTime(0)
        .duration(fileSize)
        .output(output)
        .audioFrequency(16000)
        .toFormat('s16le')
        .run()
    })
  })
}

export function duration(filePath: string): Promise<number> {
  return new Promise((res, rej) => {
    ffmpeg.ffprobe(filePath, (err, info) => {
      if (err) {
        return rej(err)
      }
      res(info.format.duration)
    })
  })
}
