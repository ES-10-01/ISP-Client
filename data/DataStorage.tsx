//import aes from 'crypto-js/aes';
import { AsyncStorage } from 'react-native';

// Save as plaintext because 'crypto-js' not supported in Expo
export default class DataStorage {
    public static async getUserUid(pin: string) {
        if (!(await this.checkPin(pin)))
            return null;
        const uidStr = await AsyncStorage.getItem('uid');
        if (uidStr == null)
            return null;
        return +uidStr;
        
        // const uidStrEncrypted = await AsyncStorage.getItem('uid');
        // if (uidStrEncrypted == null)
        //     return null;
        // const decryptedStr = aes.decrypt(uidStrEncrypted, pin).toString();
        // const uid = +decryptedStr;
        // return uid;
    }

    public static async getUserPassword(pin: string) {
        if (!(await this.checkPin(pin)))
            return null;
        const password = await AsyncStorage.getItem('password');
        return password;
        // const password = await AsyncStorage.getItem('password');
        // if (password == null)
        //     return null;
        // const decryptedStr = aes.decrypt(password, pin).toString();
        // return decryptedStr;
    }

    public static async setUserUid(uid: number, pin: string) {
        await AsyncStorage.setItem('pin', pin);
        await AsyncStorage.setItem('uid', uid.toString());
        // const encryptedStr = aes.encrypt(uid.toString(), pin).toString();
        // await AsyncStorage.setItem('uid', encryptedStr);
    }

    public static async setUserPassword(password: string, pin: string) {
        await AsyncStorage.setItem('pin', pin);
        await AsyncStorage.setItem('password', password);
        // const encryptedStr = aes.encrypt(password, pin).toString();
        // await AsyncStorage.setItem('password', encryptedStr);
    }

    public static async isPinSet() {
        return await AsyncStorage.getItem('pin') != null;
    }

    private static async checkPin(pin: string) {
        console.log('entered pin: ' + pin);
        const realPin = await AsyncStorage.getItem('pin');
        console.log('real pin: ' + realPin);
        console.log('cmp: ' + (realPin == pin));
        return realPin === pin;
    }

    public static async deleteUserCreds() {
        await AsyncStorage.removeItem('uid');
        await AsyncStorage.removeItem('password');
        await AsyncStorage.removeItem('pin');
    }
};
