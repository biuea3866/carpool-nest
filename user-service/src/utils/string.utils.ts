class StringUtils {
    constructor() {}

    public checkEmail(email: string): Boolean {
        const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    
        return regex.test(email) ? true : false;
    }

    public checkPassword(password: string): Boolean {
        const regex = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;

        return regex.test(password) ? true: false;
    }
}

export { StringUtils };