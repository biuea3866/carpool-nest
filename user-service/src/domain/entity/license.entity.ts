import {
    Prop,
    Schema,
    SchemaFactory
} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LicenseDocument = License & Document;

@Schema()
export class License {
    @Prop({ required: true })
    birthDate: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    licNumber: string;
};

export const LicenseSchema = SchemaFactory.createForClass(License);