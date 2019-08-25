// Dependencies
import { Context } from 'koa'
import { Controller, Post } from 'koa-router-ts'
import * as asyncBusboy from 'async-busboy'
import { errors } from '../helpers/errors'
import { recognizeWit, recognizeGoogle } from '../helpers/recognize'
import { saveReadStream } from '../helpers/saveReadStream'

@Controller('/recognize')
export default class {
  @Post('/wit')
  async wit(ctx: Context) {
    // Get the file and key
    const { files, fields } = await asyncBusboy(ctx.req)
    const file = files[0]
    const key = fields.key
    if (!file || !key) {
      return ctx.throw(403, errors.invalidFormat)
    }
    // Save file
    const filePath = await saveReadStream(file)
    // Respond
    ctx.body = {
      text: await recognizeWit(key, filePath),
    }
  }

  @Post('/google')
  async google(ctx: Context) {
    // Get the file and key
    const { files, fields } = await asyncBusboy(ctx.req)
    const key = files[0]
    const file = files[1]
    const language = fields.language
    if (!file || !key || !language) {
      return ctx.throw(403, errors.invalidFormat)
    }
    // Save file
    const filePath = await saveReadStream(file)
    // Respond
    ctx.body = {
      text: await recognizeGoogle(key, filePath),
    }
  }
}
