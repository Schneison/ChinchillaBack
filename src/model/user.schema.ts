import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
export type UserDocument = User & Document;

/**
 * Mongoose Schema for the MongoDB database users table.
 */
@Schema({ timestamps: true })
export class User {
    /**
     * Full name of the user, this should only contain lower- and uppercase letters.
     */
    @Prop({ required: true })
    fullname: string;
    /**
     * Telephone number of the user
     */
    @Prop({ required: true, unique: true })
    number: string;
    /**
     * Username wich only consists of lowercase letters, an underscore and numbers.
     */
    @Prop({ required: true, lowercase: true, unique: true })
    username: string;
    /**
     * Date of the creation of this object
     */
    @Prop({ immutable: true })
    createdAt?: Date;
    /**
     * Date at which the object was last updated
     */
    @Prop()
    updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
