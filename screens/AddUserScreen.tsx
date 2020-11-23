import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Headline, Text, TextInput } from 'react-native-paper';

import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';

export default function AddUser() {
    function change() {
        //TODO
    }


    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [login, setLogin] = React.useState('');

    return (
        <View>
            <TopOffset />
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Headline style={{ textAlign: 'center', }}>Smart Lock</Headline>
                    <Headline style={{ textAlign: 'center', }}>Добавление пользователя</Headline>
                    <TextInput
                      
                        mode="outlined"
                        label="Имя пользователя"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                      
                        mode="outlined"
                        label="Логин"
                        value={login}
                        onChangeText={setLogin}
                    />
                    <TextInput
                        secureTextEntry={true}
                        mode="outlined"
                        label=" Пароль"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <Button onPress={change}>Добавить пользователя</Button>
                </View>
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
    }
});
