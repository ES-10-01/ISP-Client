import aes from 'crypto-js/aes';
import { AsyncStorage } from 'react-native';

export default class DataStorage {
    public async getUserUid(pin: string) {
        const uidStrEncrypted = await AsyncStorage.getItem('uid');
        if (uidStrEncrypted == null)
            return null;
        const decryptedStr = aes.decrypt(uidStrEncrypted, pin).toString();
        const uid = +decryptedStr;
        return uid;
    }

    public async getUserPassword(pin: string) {
        const password = await AsyncStorage.getItem('password');
        if (password == null)
            return null;
        const decryptedStr = aes.decrypt(password, pin).toString();
        return decryptedStr;
    }

    public async setUserUid(uid: number, pin: string) {
        const encryptedStr = aes.encrypt(uid.toString(), pin).toString();
        await AsyncStorage.setItem('uid', encryptedStr);
    }

    public async setUserPassword(password: string, pin: string) {
        const encryptedStr = aes.encrypt(password, pin).toString();
        await AsyncStorage.setItem('password', encryptedStr);
    }
};
