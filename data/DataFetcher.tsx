import { UserCreds } from "./UserCreds";

export default class DataFetcher {
    //private static API_BASE_URL = 'https://es-isp-server.herokuapp.com/api';
    private static API_BASE_URL = 'http://188.242.89.179:8080/api';

    public static login(creds: UserCreds) {
        return this.performRequest('/user/login', {
            ...this.credsToObject(creds)
        });
    }

    public static updatePassword(creds: UserCreds, newPass: string) {
        return this.performRequest('/user/update', {
            ...this.credsToObject(creds),
            'new_password': newPass
        });
    }

    public static getAllLocks(creds: UserCreds) {
        return this.performRequest('/lock/all', {
            ...this.credsToObject(creds), 
        });
    }

    public static openLock(creds: UserCreds, lockUid: number) {
        return this.performRequest('/lock/open', {
            ...this.credsToObject(creds),
            'lock_uid': lockUid
        });
    }

    public static getLockStatus(creds: UserCreds, lockUid: number) {
        return this.performRequest('/lock/status', {
            ...this.credsToObject(creds),
            'lock_uid': lockUid
        });
    }

    public static cancelLockOpen(creds: UserCreds, lockUid: number) {
        return this.performRequest('/lock/cancel', {
            ...this.credsToObject(creds),
            'lock_uid': lockUid
        });
    }

    public static adminGetAllUsers(creds: UserCreds) {
        return this.performRequest('/admin/user/all', {
            ...this.credsToObject(creds),
        });
    }

    public static adminAddUser(creds: UserCreds, name: string,
            surname: string, privelege: 'user' | 'admin') {
        return this.performRequest('/admin/user/add', {
            ...this.credsToObject(creds),
            'name': name,
            'surname': surname,
            'privileges': privelege
        });
    }

    public static adminDeleteUser(creds: UserCreds, targetUid: number) {
        return this.performRequest('/admin/user/delete', {
            ...this.credsToObject(creds),
            'target_user_uid': targetUid
        });
    }

    public static adminUpdateUser(creds: UserCreds, targetUid: number,
            resetPassword: boolean) {
        return this.performRequest('/admin/user/update', {
            ...this.credsToObject(creds),
            'target_user_uid': targetUid,
            'reset_password': resetPassword
           
        });
    }

    public static adminRenameLock(creds: UserCreds, lockUid: number, newName: string) {
        return this.performRequest('/admin/lock/rename', {
            ...this.credsToObject(creds),
            'lock_uid': lockUid,
            'lock_new_name': newName
        });
    }

    public static adminDeleteLock(creds: UserCreds, lockUid: number) {
        return this.performRequest('/admin/lock/delete', {
            ...this.credsToObject(creds),
            'lock_uid': lockUid
        });
    }

    public static adminAddLockAccess(creds: UserCreds, lockUid: number, userUid: number) {
        return this.performRequest('/admin/user/lock/add', {
            ...this.credsToObject(creds),
            'lock_uid': lockUid,
            'target_user_uid': userUid
        });
    }

    public static adminRemoveLockAccess(creds: UserCreds, lockUid: number, userUid: number) {
        return this.performRequest('/admin/user/lock/delete', {
            ...this.credsToObject(creds),
            'lock_uid': lockUid,
            'target_user_uid': userUid
        });
    }

    public static adminGetUserLocks(creds: UserCreds, userUid: number) {
        return this.performRequest('/admin/user/lock/all', {
            ...this.credsToObject(creds),
            'target_user_uid': userUid
        });
    }

    public static adminGetAllLocks(creds: UserCreds) {
        return this.performRequest('/admin/lock/all', {
            ...this.credsToObject(creds)
        });
    }


    private static credsToObject(creds: UserCreds) {
        return {
            'credentials': {
                'user_uid': creds.userUid,
                'password': creds.password
            }
        }
    }

    private static async performRequest(relativeUrl: string, data: any) {
        const url = this.API_BASE_URL + relativeUrl;
        try {
            const result = await this.performRequestImpl(url, data);
            return result;
        }
        catch (e: any) {
            return {
                status: 'req_fail',
                message: 'Failed to perform fetch'
            };
        }
    }

    private static async performRequestImpl(url: string, data: any) {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (result.status !== 200) {
            return {
                status: 'req_fail',
                message: `HTTP request failed (code ${result.status})`
            }
        }
        return result.json();
    }
};
