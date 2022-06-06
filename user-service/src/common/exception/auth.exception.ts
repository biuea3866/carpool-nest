import { ApolloError } from 'apollo-server-express';
import { ResultCode } from 'src/common/result.enum';
import { logger } from '../logger/logger';

class AuthtenticationException {
    constructor() {}

    public exception(method: string) {
        logger.error(method + ": Not Authenticated");

        throw new ApolloError(
            "Not Authenticated",
            ResultCode.UN_AUTHENTICATION.toString(), {
                'code': ResultCode.UN_AUTHENTICATION
            }
        );
    }
}

export { AuthtenticationException };