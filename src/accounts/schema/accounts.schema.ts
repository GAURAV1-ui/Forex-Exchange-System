import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/auth/schemas/user.schema";
import mongoose from "mongoose";

@Schema({
    timestamps: true
})

export class Account {
    @Prop({required: true})
    currency: String;

    @Prop({required: true})
    balance: Number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}

export const AccountSchema = SchemaFactory.createForClass(Account);