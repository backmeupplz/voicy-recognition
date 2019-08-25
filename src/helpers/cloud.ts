// Dependencies
import * as path from 'path'
const Storage = require('@google-cloud/storage')

function getStorage(key: any) {
  return new Storage({
    credentials: key,
    projectId: key.project_id,
  })
}

export async function put(filePath: string, key: any): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const storage = getStorage(key)
      const bucket = storage.bucket(key.project_id)
      const exists = await bucket.exists()
      if (!exists[0]) {
        bucket.create(async err => {
          if (err) {
            reject(err)
            return
          }
          try {
            const uri = await upload(bucket, filePath, key)
            resolve(uri)
          } catch (error) {
            reject(error)
          }
        })
      } else {
        try {
          const uri = await upload(bucket, filePath, key)
          resolve(uri)
        } catch (err) {
          reject(err)
        }
      }
    } catch (err) {
      reject(err)
    }
  })
}

export function upload(bucket, filePath, key): Promise<string> {
  return new Promise((resolve, reject) => {
    bucket.upload(filePath, (err, file) => {
      if (err) {
        reject(err)
        return
      }
      resolve(`gs://${key.project_id}/${file.name}`)
    })
  })
}

export function del(uri: string, key: any) {
  return new Promise((resolve, reject) => {
    try {
      const storage = getStorage(key)
      const bucket = storage.bucket(key.project_id)
      const file = bucket.file(path.basename(uri))
      file.delete(err => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      })
    } catch (err) {
      reject(err)
    }
  })
}
