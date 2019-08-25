// Dependencies
import * as cloud from './cloud'

export async function google(key: any, filePath: string) {
  // Upload to drive
  const uri = await cloud.put(filePath, key)
  // Transcribe
  const SpeechClient = require('@google-cloud/speech').SpeechClient
  const speech = new SpeechClient({
    credentials: key,
  })
  const request = {
    config: {
      enableWordTimeOffsets: true,
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US',
    },
    audio: {
      uri,
    },
  }
  try {
    const [operation] = await speech.longRunningRecognize(request)
    const [response] = await operation.promise()
    const resultingStrings = []
    response.results.forEach(result => {
      if (!result.alternatives[0].words.length) {
        return
      }
      const text = result.alternatives[0].transcript.trim()
      if (text) {
        resultingStrings.push(text)
      }
    })
    return resultingStrings.join('. ')
  } catch (err) {
    throw err
  } finally {
    await cloud.del(uri, key)
  }
}
