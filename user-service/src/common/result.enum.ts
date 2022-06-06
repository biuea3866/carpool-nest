enum ResultCode {
    UNIQUE_EMAIL = 1000,
    UNIQUE_NICKNAME = 1001,
    FOUND_USER = 1002,
    SIGNED_IN = 1003,
    SIGNED_UP = 1004,
    UPDATED_PASSWORD = 1005,
    UPDATED_NICKNAME = 1006,
    UPDATED_LICENSE = 1007,
    DELTED_USER = 1008,
    LOGINED = 1009,
    LOGOUTED = 1010,
    REGISTERED = 1011,
    NOT_FOUND_USER = 2000,
    NOT_MATCHED_PASSWORD = 2001,
    DUPLICATED_EMAIL = 2002,
    DUPLICATED_NICKNAME = 2003,
    FAILED_TO_CREATE_USER = 2004,
    FAILED_TO_UPDATE_EMAIL = 2005,
    FAILED_TO_UPDATE_PASSWORD = 2006,
    FAILED_TO_UPDATE_NICKNAME = 2007,
    FAILED_TO_UPDATE_LICENSE = 2008,
    FAILED_TO_DELETE_USER = 2009,
    DATABASE_ERROR = 3000,
    EXCEPTION_ERROR = 3001,
    UN_AUTHENTICATION = 3003,
}

export { ResultCode };