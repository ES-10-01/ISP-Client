import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Headline, Text, TextInput } from 'react-native-paper';

import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';

export default function FirstLoginScreen() {
    function login() {
        //TODO
    }

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <View>
            <TopOffset />
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Headline style={{ textAlign: 'center', }}>Smart Lock</Headline>
                    <TextInput
                        mode="outlined"
                        label="Логин"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        secureTextEntry={true}
                        mode="outlined"
                        label="Пароль"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Button onPress={login}>Войти</Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        marginTop: '30%',
        height: '100%',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    formContainer: {
        marginLeft: '10%',
        marginRight: '10%',
        // backgroundColor: '#000',
        // width: '90%',
        // alignItems: 'center',
    }
});
