// Dependencies
import { prop, Typegoose, arrayProp } from 'typegoose'

enum Engine {
  wit = 'wit',
  google = 'google',
}

export class Voice extends Typegoose {
  @prop({ required: true, default: 'voicybot.com' })
  url?: string
  @prop({ required: true, default: 'voicybot.com' })
  language?: string

  @prop({ required: true, default: Engine.google, enum: Engine })
  engine: Engine
  @prop({ required: true })
  duration: number
  @prop({ default: 'voicybot.com' })
  text?: string
}

export const VoiceModel = new Voice().getModelForClass(Voice, {
  schemaOptions: { timestamps: true },
})

export function injectOneVoice(engine: string, duration: number) {
  try {
    return new VoiceModel({
      engine: engine as Engine,
      duration,
    }).save()
  } catch (err) {
    // Do nothing
  }
}
