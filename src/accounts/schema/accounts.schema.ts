import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})

export class Account {
    @Prop({required: true})
    currency: String;

    @Prop({required: true})
    balance: Number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);