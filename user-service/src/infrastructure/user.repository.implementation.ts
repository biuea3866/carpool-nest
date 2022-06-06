import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { IUserRepository } from './user.repository';
import { CommonException } from 'src/common/exception/common.exception';
import { UsersDocument } from 'src/domain/entity/users.entity';
import { Users } from 'src/domain/entity/users.entity';
import { ResultCode } from 'src/common/result.enum';

@Injectable()
class UserRepository implements IUserRepository {
    constructor(
        private readonly commonException: CommonException,
        @InjectModel(Users.name) private user: Model<UsersDocument>
    ) {}

    public async findUserByEmail(email: string): Promise<void | Users> {
        const user = await this.user.findOne({
            where: {
                email: email,
                isDelete: false
            }
        }).then(result => {
            return result;  
        }).catch(error => {
            this.commonException.exception(
                "findUserByEmail",
                error.toString(),
                ResultCode.DATABASE_ERROR
            )
        });

        if(user === null) {
            this.commonException.exception(
                "findUserByEmail",
                "유저가 존재하지 않습니다!",
                ResultCode.NOT_FOUND_USER
            )
        }

        return user;
    }

    public async findUserByUserId(userId: string): Promise<void | Users> {
        const user = await this.user.findOne({
            where: {
                userId,
                isDelete: false
            }
        }).then(result=> {
            return result;
        }).catch(error => {
            this.commonException.exception(
                "findUserByUserId",
                error.toString(),
                ResultCode.DATABASE_ERROR
            )
        });

        if(user === null) {
            this.commonException.exception(
                "findUserByUserId",
                "유저가 존재하지 않습니다!",
                ResultCode.NOT_FOUND_USER
            )
        }

        return user;
    }

    public async isExistByEmail(email: string): Promise<boolean> {
        await this.user.exists({
            where: { email }
        }).then(result => {
            if(result._id) {
                this.commonException.exception(
                    "isExistEmail",
                    "중복된 메일입니다!",
                    ResultCode.DUPLICATED_EMAIL
                );
            }
        }).catch(error => {
            this.commonException.exception(
                "isExistEmail",
                error.toString(),
                ResultCode.DATABASE_ERROR
            )
        });

        return false;
    }

    public async isExistByNickname(nickname: string): Promise<boolean> {
        await this.user.exists({
            where: { nickname }
        }).then(result => {
            if(result._id) {
                this.commonException.exception(
                    "isExistNickname",
                    "중복된 닉네임입니다!",
                    ResultCode.DUPLICATED_NICKNAME
                );
            }
        }).catch(error => {
            this.commonException.exception(
                "isExistNickname",
                error.toString(),
                ResultCode.DATABASE_ERROR
            )
        });

        return false
    }

    public async save(userEntity: Users): Promise<void> {
        await new this.user(userEntity).save()
                                       .then(user => {
                                           if(user === null) {
                                               this.commonException.exception(
                                                   "save",
                                                   "회원가입에 실패했습니다!",
                                                   ResultCode.DATABASE_ERROR
                                               )
                                           }
                                       })
                                       .catch(error => {
                                           this.commonException.exception(
                                               "save",
                                               error.toString(),
                                               ResultCode.DATABASE_ERROR
                                           )
                                       });
    }

    public async updatePasswordByUser(updateUser: Users): Promise<void | Users> {
        const user = await this.user.findOneAndUpdate(
            { userId: updateUser.userId }, 
            { $set: { password: updateUser.password } },
            { new: true }
        ).then(result => {
            if(result.password !== updateUser.password) {
                this.commonException.exception(
                    "updatePasswordByUserId",
                    "패스워드가 변경되지 않았습니다.",
                    ResultCode.FAILED_TO_UPDATE_PASSWORD
                );
            }

            return result;
        })
        .catch(error => {
            this.commonException.exception(
                "updatePasswordByUserId",
                error.toString(),
                ResultCode.DATABASE_ERROR
            )
        });

        return user;
    }

    public async updateNicknameByUser(updateUser: Users): Promise<void | Users> {
        const user = await this.user.findOneAndUpdate(
            { userId: updateUser.userId }, 
            { $set: { nickname: updateUser.nickname } },
            { new: true }
        ).then(result => {
            if(result.nickname !== updateUser.nickname) {
                this.commonException.exception(
                    "updateNicknameByUserId",
                    "닉네임이 변경되지 않았습니다.",
                    ResultCode.FAILED_TO_UPDATE_NICKNAME
                );
            }

            return result;
        })
        .catch(error => {
            this.commonException.exception(
                "updateNicknameByUserId",
                error.toString(),
                ResultCode.DATABASE_ERROR
            )
        });

        return user;
    }

    public async updateLicenseByUser(updateUser: Users): Promise<void | Users> {
        const user = await this.user.findOneAndUpdate(
            { userId: updateUser.userId }, 
            { $set: { license: updateUser.license } },
            { new: true }
        ).then(result => {
            if(result.license.licNumber != updateUser.license.licNumber) {
                this.commonException.exception(
                    "updateLicenseByUserId",
                    "운전면허가 등록되지 않았습니다!",
                    ResultCode.FAILED_TO_UPDATE_LICENSE
                );
            }

            return result;
        })
        .catch(error => {
            this.commonException.exception(
                "updateLicenseByUserId",
                error.toString(),
                ResultCode.DATABASE_ERROR
            )
        });

        return user;
    }

    public async deleteByUser(deleteUser: Users): Promise<void | Users> {
        const user = await this.user.findOneAndUpdate(
            { userId: deleteUser.userId }, 
            { $set: { isDelete: deleteUser.isDelete } },
            { new: true }
        ).then(result => {
            if(result.isDelete !== deleteUser.isDelete) {
                this.commonException.exception(
                    "deleteUser",
                    "유저 삭제에 실패했습니다!",
                    ResultCode.FAILED_TO_DELETE_USER
                );
            }

            return user;
        }).catch(error => {
            this.commonException.exception(
                "deleteUser",
                error.toString(),
                ResultCode.DATABASE_ERROR
            )
        });
        
        return user;
    }
}

export { UserRepository };