import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../auth/schemas/user.schema";
import mongoose from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

@Schema({
    timestamps: true
})

export class Account {
    @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  balance: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: mongoose.Types.ObjectId;
}

export const AccountSchema = SchemaFactory.createForClass(Account);