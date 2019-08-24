// Dependencies
import { tryDeletingFile } from './tryDeletingFile'
import { duration } from './flac'
import { wit } from './wit'

export async function recognizeWit(key: string, filePath: string) {
  try {
    // Conver to flac
    const size = await duration(filePath)
    // Recognize
    const text = await wit(key, filePath, size)
    return text
  } finally {
    tryDeletingFile(filePath)
  }
}
