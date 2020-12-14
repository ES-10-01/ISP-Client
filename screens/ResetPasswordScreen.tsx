import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Headline, Text, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';
import DataFetcher from '../data/DataFetcher';

const mapStateToProps = (state: any) => {
    const { creds} = state
    return { creds };
};

export default connect(mapStateToProps)(ResetPassword);

 function ResetPassword({ creds }:  { creds:any }) {
    function resetPassword() {
        setErrorText('');
        setText('');
        if(newPassword!=confirmPassword) {setErrorText('Пароли не совпадают');
        return;} 
        DataFetcher.updatePassword(creds,newPassword).then(json => {
            console.log(json);
            if (json.status == 'OK') {
            setText('Пароль успешно обновлен' );
            }
            else {
                setErrorText('Ошибка смены пароля');
            }
        });
          }


    const [errortext, setErrorText] = React.useState('');
    const [text, setText] = React.useState('');
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
                    <Text style={styles.text}>{text}</Text>
                    <Text style={styles.errtext}>{errortext}</Text>
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
    },
    text: {
        color: '#00ff00',
        textAlign: 'center'
        
    },
    errtext: {
        color: '#AA0000',
        textAlign: 'center'
        
    }
});
