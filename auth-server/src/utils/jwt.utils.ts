import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
class JwtUtils {
    constructor() {}

    public async generator(userId: string): Promise<string> {
        return jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            data: userId
        }, process.env.SECRET_KEY);
    }

    public async verify(token: string): Promise<any> {
        return jwt.verfiy(
            token.split('Bearer ')[1],
            process.env.SECRET_KEY
        );
    }
}

export { JwtUtils }