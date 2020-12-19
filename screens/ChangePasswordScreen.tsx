import * as React from 'react';
import { ActionSheetIOS, StyleSheet } from 'react-native';
import { Button, Headline, Text, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';
import DataFetcher from '../data/DataFetcher';
import { createUserCreds } from '../data/UserCreds';

const mapStateToProps = (state: any) => {
    const { creds} = state
    return { creds };
};

export default connect(mapStateToProps)(ChangePassword);

 function ChangePassword({ creds }:  { creds:any }) {
    
    function change() {
        setErrorText('');
        setText('');
        if(creds.password!=oldPassword) {setErrorText('Старый пароль указан неверно');
        return;}
        if(newPassword!=confirmPassword) {setErrorText('Пароли не совпадают');
        return;}
        if(newPassword==oldPassword) {setErrorText('Этот пароль уже используется');
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



    const [oldPassword, setPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [errortext, setErrorText] = React.useState('');
    const [text, setText] = React.useState('');
    

    return (
        <View>
            <TopOffset />
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Headline style={{ textAlign: 'center', }}>Смена пароля</Headline>
                    <TextInput
                        secureTextEntry={true}
                        mode="outlined"
                        label="Старый пароль"
                        value={oldPassword}
                        onChangeText={setPassword}
                    />
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
                    <Button onPress={change}>Изменить пароль</Button>
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
