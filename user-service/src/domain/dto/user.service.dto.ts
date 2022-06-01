import { License } from "../entity/license.entity";

class UserServiceDto {
    LoginUser = new class {
        email: string;
        password: string;
    }

    LogoutUser = new class {
        userId: string
    }

    GetUser = new class {
        userId: string;
    };

    GetRiderInfo = new class {
        userId: string;
    };

    CheckEmailDto = new class {
        email: string;
    };

    CheckNicknameDto = new class {
        nickname: string;
    };

    RegisterUserDto = new class {
        email: string;
        password: string;
        nickname: string;
        license?: License;
    }

    UpdateNicknameDto = new class {
        userId: string;
        nickname: string;
    }

    UpdatePasswordDto = new class {
        userId: string;
        password: string;
    };

    UpdateLicenseDto = new class {
        userId: string;
        license: License;
    };

    DeleteUserDto = new class {
        userId: string;
        isDelete: boolean;
    };
};

export { UserServiceDto };