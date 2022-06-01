import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import { License } from './license.entity';
import { LicenseRole } from './license.role';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;
    
    @Prop({ required: true })
    nickname: string;

    @Prop({ 
        required: true,
        default: Date.now
    })
    createdAt: Date;

    @Prop({ 
        required: true,
        default: LicenseRole.PASSENGER
    })
    role: string;

    @Prop({ required: true })
    isDelete: boolean;

    @Prop({ required: false })
    license: License
}

export const UserSchema = SchemaFactory.createForClass(Users);