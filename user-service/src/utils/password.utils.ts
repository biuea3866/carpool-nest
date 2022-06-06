import bcrypt from 'bcrypt';

class PasswordUtils {
    constructor() {}

    public async generator(password: string): Promise<string> {
        return await bcrypt.hash(
            password,
            10
        );
    }

    public async verify(
        originPassword: string,
        encryptedPassword: string
    ): Promise<boolean> {
        return await bcrypt.compare(
            originPassword,
            encryptedPassword
        );
    }
}

export { PasswordUtils };