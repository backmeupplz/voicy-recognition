// Dependencies
import * as cloud from './cloud'

export async function google(key: any, filePath: string, language: string) {
  // Upload to drive
  console.log(`Uploading ${filePath}`)
  const uri = await cloud.put(filePath, key)
  console.log(`Recognizing ${uri}`)
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
      languageCode: language,
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
    console.log('Result', resultingStrings)
    return resultingStrings.join('. ')
  } catch (err) {
    throw err
  } finally {
    await cloud.del(uri, key)
  }
}
