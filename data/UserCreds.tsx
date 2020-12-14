export interface UserCreds {
    userUid: number,
    password: string
};

export function createUserCreds(userUid: number, password: string): UserCreds {
    return {
        userUid,
        password
    };
}
  
