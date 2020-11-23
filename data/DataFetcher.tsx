import { UserCreds } from "./UserCreds";

export default class DataFetcher {
    private API_BASE_URL = 'https://es-isp-server.herokuapp.com/api';

    public login(creds: UserCreds) {
        return this.performRequest('/user/login', {
            ...this.credsToObject(creds)
        });
    }

    public updatePassword(creds: UserCreds, newPass: string) {
        return this.performRequest('/user/update', {
            ...this.credsToObject(creds),
            'new_password': newPass
        });
    }

    public getAllLocks(creds: UserCreds) {
        return this.performRequest('/lock/all', {
            ...this.credsToObject(creds), 
        });
    }

    public openLock(creds: UserCreds, lockUid: number) {
        return this.performRequest('/lock/open', {
            ...this.credsToObject(creds),
            'lock_uid': lockUid
        });
    }

    public getLockStatus(creds: UserCreds, lockUid: number) {
        return this.performRequest('/lock/status', {
            ...this.credsToObject(creds),
            'lock_uid': lockUid
        });
    }

    public cancelLockOpen(creds: UserCreds, lockUid: number) {
        return this.performRequest('/lock/cancel', {
            ...this.credsToObject(creds),
            'lock_uid': lockUid
        });
    }

    public adminAddUser(creds: UserCreds, privelege: 'user' | 'admin') {
        return this.performRequest('/admin', {
            ...this.credsToObject(creds),
            'privileges': privelege
        });
    }
    

    private credsToObject(creds: UserCreds) {
        return {
            'user_uid': creds.userUid,
            'password': creds.password
        }
    }

    private async performRequest(relativeUrl: string, data: any) {
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

    private async performRequestImpl(url: string, data: any) {
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
