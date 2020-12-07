import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Headline, Text, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';

import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';
import { boundSetAuth } from '../data/Actions';
import DataFetcher from '../data/DataFetcher';
import { createUserCreds } from '../data/UserCreds';

function convertUid(uidStr: string) {
    try {
        return +uidStr;
    }
    catch (e) {
        return null;
    }
}

function FirstLoginScreen(props: any) {
    function login() {
        const uid = convertUid(userUid);
        if (uid == null || uid == 0) {
            setError('Нужно указать корректный UID.');
            return;
        }
        if (password == null || password.length < 1) {
            setError('Нужно указать корректный пароль.');
            return;
        }

        DataFetcher.login(createUserCreds(+userUid, password))
            .then(json => {
                console.log(json);
                if (json.status == 'OK') {
                    props.setAuth(+userUid, password, false)
                }
                else {
                    setError('Неправильный UID или пароль.');
                }
            });
    }

    const [userUid, setUserUid] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    return (
        <View>
            <TopOffset />
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Headline style={{ textAlign: 'center', }}>Smart Lock</Headline>
                    <TextInput
                        mode="outlined"
                        label="UID Пользователя"
                        value={userUid}
                        onChangeText={setUserUid}
                        keyboardType="numeric"
                    />
                    <TextInput
                        secureTextEntry={true}
                        mode="outlined"
                        label="Пароль"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Button onPress={login}>Войти</Button>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: '25%',
        height: '100%',
    },
    formContainer: {
        marginLeft: '10%',
        marginRight: '10%',
    },
    errorText: {
        color: '#AA0000',
        textAlign: 'center'
    }
});

const mapDispatchToProps = (dispatch: any, props: any) => {
    return {
        setAuth: (uid: number, pass: string, isAdmin: boolean) => boundSetAuth(dispatch, uid, pass, isAdmin),
    }
};

export default connect(null, mapDispatchToProps)(FirstLoginScreen);
