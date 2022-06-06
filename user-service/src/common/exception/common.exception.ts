import { ApolloError } from "apollo-server-express";
import { logger } from "../logger/logger";

class CommonException {
    constructor() {}

    public exception(
        method: string,
        message: string,
        code: number
    ) {
        logger.error(method + ": " + message);

        throw new ApolloError(
            message,
            code.toString(), {
                'code': code
            }
        );
    }
}

export { CommonException };