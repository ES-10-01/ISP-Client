import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Headline, Text, TextInput } from 'react-native-paper';

import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';

export default function ChangePassword() {
    function resetPassword() {
        //TODO
    }



    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    return (
        <View>
            <TopOffset />
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Headline style={{ textAlign: 'center', }}>Smart Lock</Headline>
                    <Headline style={{ textAlign: 'center', }}>Сбросить пароль</Headline>
                    <TextInput
                        secureTextEntry={true}
                        mode="outlined"
                        label="Новый пароль"
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    <TextInput
                        secureTextEntry={true}
                        mode="outlined"
                        label=" Повторите пароль"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <Button onPress={resetPassword}>Изменить пароль</Button>
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
