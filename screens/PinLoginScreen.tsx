import * as React from 'react';
import { Alert, DevSettings, StyleSheet } from 'react-native';
import { Button, Colors, Headline, IconButton, Modal, Portal, Text, TextInput, Title } from 'react-native-paper';
import { connect } from 'react-redux';

import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';
import { boundSetAuth, boundSetNoAuth } from '../data/Actions';
import DataFetcher from '../data/DataFetcher';
import DataStorage from '../data/DataStorage';
import { createUserCreds } from '../data/UserCreds';

function PinLoginScreen(props: any) {
    const [pin, setPin] = React.useState('');
    const [isFingerprint, setIsFingerprint] = React.useState(false);

    const enableFingerprint = () => setIsFingerprint(true);
    const disableFingerprint = () => setIsFingerprint(false);

    const [isLogin, setIsLogin] = React.useState(false);

    React.useEffect(() => {
        if (pin.length == 4) {
            setIsLogin(true);
            (async () => {
                const uid = await DataStorage.getUserUid(pin);
                const pass = await DataStorage.getUserPassword(pin);
                
                if (uid == null || pass == null) {
                    Alert.alert('Ошибка', 'Не правильный PIN-код.');
                    delAll();
                }
                else {
                    const creds = createUserCreds(uid, pass);
                    DataFetcher.login(creds)
                        .then(json => {
                            console.log(json);
                            if (json.status == 'OK') {
                                props.setAuth(uid, pass, json.data.privileges == 'ADMIN')
                            }
                            else {
                                Alert.alert('Ошибка', 'Неправильный UID или пароль.');
                            }
                        });
                }
                setIsLogin(false);
            })();
        }
    }, [pin]);

    const printPin = () => {
        let nums = pin.split('');
        while (nums.length < 4)
            nums.push('_');
        return nums.join(' ');
    }

    const NumBtn = (props: any) => {
        const numPress = () => {
            if (pin.length < 4)
                setPin(pin + props.num);
        }
        return (<Button onPress={numPress} labelStyle={styles.numBtnStyle}>{props.num}</Button>);
    };

    const delChar = () => {
        if (pin.length > 0)
            setPin(pin.substr(0, pin.length - 1));
    }

    const delAll = () => {
        setPin('');
    }

    const changeAccount = () => {
        //props.navigation.navigate('FirstLogin');
        //DevSettings.reload();
        DataStorage.deleteUserCreds();
        props.setNoAuth();
    }

    if (isLogin)
        return (
            <View>
                <TopOffset />
                <Headline>Выполняется вход...</Headline>
            </View>
        );

    return (
        <View>
            <TopOffset />
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Headline style={{ textAlign: 'center', }}>Smart Lock</Headline>
                    <Headline style={{ textAlign: 'center', }}>{printPin()}</Headline>
                    <View style={styles.rowStyle}>
                        <NumBtn num={'1'} />
                        <NumBtn num={'2'} />
                        <NumBtn num={'3'} />
                    </View>
                    <View style={styles.rowStyle}>
                        <NumBtn num={'4'} />
                        <NumBtn num={'5'} />
                        <NumBtn num={'6'} />
                    </View>
                    <View style={styles.rowStyle}>
                        <NumBtn num={'7'} />
                        <NumBtn num={'8'} />
                        <NumBtn num={'9'} />
                    </View>
                    <View style={styles.rowStyle}>
                        {/* <IconButton
                            onPress={enableFingerprint}
                            icon="fingerprint"
                            color={Colors.purple500}
                            size={20}
                            style={{ width: 50, }}
                        /> */}
                        <IconButton
                            onPress={delChar}
                            icon="chevron-left"
                            color={Colors.purple500}
                            size={20}
                            style={{ width: 50, }}
                        />
                        <NumBtn num={'0'} />
                        <IconButton
                            onPress={delAll}
                            icon="delete"
                            color={Colors.purple500}
                            size={20}
                            style={{ width: 50, }}
                        />
                        {/* <Button onPress={delChar}>del</Button> */}
                    </View>
                    <Button onPress={changeAccount}>Войти в другой аккаунт</Button>
                </View>
                <Portal>
                    <Modal visible={isFingerprint} onDismiss={disableFingerprint} contentContainerStyle={styles.modalContainerStyle}>
                        <Title>Вход по отпечатку</Title>
                        <Text>
                            Приложите палец к сканеру отпечатка.{'\n'}
                            Если нет сканера, используйте пин-код.
                        </Text>
                    </Modal>
                </Portal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: '30%',
        height: '100%',
    },
    formContainer: {
        marginLeft: '10%',
        marginRight: '10%',
    },
    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    numBtnStyle: {
        fontSize: 20,
    },

    modalContainerStyle: {
        backgroundColor: 'white',
        padding: 20,
    },
});

const mapDispatchToProps = (dispatch: any, props: any) => {
    return {
        setAuth: (uid: number, pass: string, isAdmin: boolean) => boundSetAuth(dispatch, uid, pass, isAdmin),
        setNoAuth: () => boundSetNoAuth(dispatch),
    }
};

export default connect(null, mapDispatchToProps)(PinLoginScreen);