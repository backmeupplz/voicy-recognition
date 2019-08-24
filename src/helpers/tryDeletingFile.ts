// Dependencies
import { unlinkSync } from 'fs'

export function tryDeletingFile(path) {
  try {
    unlinkSync(path)
  } catch (err) {
    // do nothing
  }
}
