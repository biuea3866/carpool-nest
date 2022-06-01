import { UserServiceDto } from "../dto/user.service.dto";
import { Users } from "../entity/users.entity";

export interface IUserService {
    loginUser(loginUserDto: UserServiceDto["LoginUser"]): Promise<string>;
    logoutUser(logoutUserDto: UserServiceDto["LogoutUser"]): Promise<number>;
    getUser(getUserDto: UserServiceDto["GetUser"]): Promise<Users>;
    getRiderInfo(getRiderInfoDto: UserServiceDto["GetRiderInfo"]): Promise<Users>;
    checkEmail(checkEmailDto: UserServiceDto["CheckEmailDto"]): Promise<void>;
    checkNickname(checkNicknameDto: UserServiceDto["CheckNicknameDto"]): Promise<void>;
    registerUser(registerUserDto: UserServiceDto["RegisterUserDto"]): Promise<void>;
    updateNickname(updateNicknameDto: UserServiceDto["UpdateNicknameDto"]): Promise<Users>;
    updatePassword(updatePasswordDto: UserServiceDto["UpdatePasswordDto"]): Promise<Users>;
    updateLicense(updateLicenseDto: UserServiceDto["UpdateLicenseDto"]): Promise<Users>;
    deleteUser(deleteUserDto: UserServiceDto["DeleteUserDto"]): Promise<Users>;
};