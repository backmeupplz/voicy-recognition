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
  @prop()
  text?: string
}

export const VoiceModel = new Voice().getModelForClass(Voice, {
  schemaOptions: { timestamps: true },
})
