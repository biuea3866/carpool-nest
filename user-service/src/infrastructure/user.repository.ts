import { Users } from "src/domain/entity/users.entity";

export interface IUserRepository {
    findUserByEmail(email: string): Promise<void | Users>;
    findUserByUserId(userId: string): Promise<void | Users>;
    isExistByEmail(email: string): Promise<boolean>;
    isExistByNickname(nickname: string): Promise<boolean>;
    save(user: Users): Promise<void>;
    updatePasswordByUser(user: Users): Promise<void | Users>;
    updateNicknameByUser(user: Users): Promise<void | Users>;
    updateLicenseByUser(user: Users): Promise<void | Users>;
    deleteByUser(user: Users): Promise<void | Users>;
}