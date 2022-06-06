import { Injectable } from '@nestjs/common';
import { AuthtenticationException } from 'src/common/exception/auth.exception';
import { CommonException } from 'src/common/exception/common.exception';
import { logger } from 'src/common/logger/logger';
import { ResultCode } from 'src/common/result.enum';
import { UserRepository } from 'src/infrastructure/user.repository.implementation';
import { v4 } from 'uuid';
import { UserServiceDto } from '../dto/user.service.dto';
import { License } from '../entity/license.entity';
import { LicenseRole } from '../entity/license.role';
import { Users } from '../entity/users.entity';
import { IUserService } from './user.service';

@Injectable()
class UserService implements IUserService {
    constructor(
        private readonly jwtUtils: JwtUtils,
        private readonly passwordUtils: PasswordUtils,
        private readonly stringUtils: CheckStringUtils,
        private readonly authException: AuthtenticationException,
        private readonly commonException: CommonException,
        private readonly userRepository: UserRepository
    ) {}

    public async loginUser(loginUserDto: UserServiceDto["LoginUser"]): Promise<string> {
        const {
            email,
            password
        } = loginUserDto;

        const user = await this.userRepository.findUserByEmail(email);

        if(!(await this.passwordUtils.checker(
            password, 
            user.password
        ))) {
            this.commonException.exception(
                "AuthService's loginUser",
                "Not matched password",
                ResultCode.NOT_MATCHED_PASSWORD
            );
        }

        const accessToken: string = await this.jwtUtils.generator(user.userId);

        logger.info("AuthService's loginUser: " + accessToken);

        return accessToken;
    }

    public async logoutUser(context: any): Promise<number> {
        const userId: string = (await this.jwtUtils.verify(context.userId)).data;

        if(!userId) {
            this.authException.exception("AuthService's logoutUser");
        }
    
        logger.info("AuthService's logoutUser: Successfully logout!");
        
        return ResultCode.LOGOUTED;
    }

    public async getUser(getUserDto: UserServiceDto["GetUser"]): Promise<Users> {
        const user = await this.userRepository.findUserByUserId(getUserDto.userId);

        logger.info("AuthServices' getUser: " + user.toString());

        return user;
    }

    public async getRiderInfo(getRiderInfoDto: UserServiceDto["GetRiderInfo"]): Promise<Users> {
        const user = await this.userRepository.findUserByUserId(getRiderInfoDto.userId);

        logger.info("AuthService's getRiderInfo: " + user.toString());

        return user;
    }

    public async checkEmail(checkEmailDto: UserServiceDto["CheckEmailDto"]): Promise<void> {
        const { email } = checkEmailDto;
        
        await this.userRepository.isExistByEmail(email);
    }

    public async checkNickname(checkNicknameDto: UserServiceDto["CheckNicknameDto"]): Promise<void> {
        const { nickname } = checkNicknameDto;

        await this.userRepository.isExistByNickname(nickname);
    }

    public async registerUser(registerUserDto: UserServiceDto["RegisterUserDto"]): Promise<void> {
        const {
            email,
            password,
            nickname,
            license
        } = registerUserDto;

        const userEntity: Users = license ? {
            email,
            password: (await this.passwordUtils.generator(password)),
            nickname,
            createdAt: new Date(),
            role: LicenseRole.DRIVER,
            license,
            userId: v4(),
            isDelete: false
        }: {
            email,
            password: (await this.passwordUtils.generator(password)),
            nickname,
            createdAt: new Date(),
            role: LicenseRole.PASSENGER,
            license: null,
            userId: v4(),
            isDelete: false
        };

        this.userRepository.save(userEntity);
    }

    public async updateNickname(updateNicknameDto: UserServiceDto["UpdateNicknameDto"]): Promise<Users> {
        const {
            userId,
            nickname
        } = updateNicknameDto;

        const user = await this.userRepository.findUserByUserId(userId);
        user.nickname = nickname;

        return await this.userRepository.updateNicknameByUser(user)
    }

    public async updatePassword(updatePasswordDto: UserServiceDto["UpdatePasswordDto"]): Promise<Users> {
        const {
            userId, 
            password,
        } = updatePasswordDto;

        
        const user = await this.userRepository.findUserByUserId(userId);
        user.password = password;

        return await this.userRepository.updatePasswordByUser(user);
    }

    public async updateLicense(updateLicenseDto: UserServiceDto["UpdateLicenseDto"]): Promise<Users> {
        const {
            userId,
            license
        } = updateLicenseDto;

        const licenseEntity: License = {
            birthDate: license.birthDate,
            licNumber: license.licNumber,
            name: license.name
        };

        const user = await this.userRepository.findUserByEmail(userId);
        user.license = licenseEntity;

        return await this.userRepository.updateLicenseByUser(user);
    }

    public async deleteUser(deleteUserDto: UserServiceDto["DeleteUserDto"]): Promise<Users> {
        const { 
            userId,
            isDelete 
        } = deleteUserDto;

        const user = await this.userRepository.findUserByUserId(userId);
        user.isDelete = isDelete;

        return await this.userRepository.deleteByUser(user);
    }
}

export { UserService };