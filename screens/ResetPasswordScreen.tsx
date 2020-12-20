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

 function ResetPassword(props:any) {
   
    const user = props.route.params.userData;
 
   

    function resetPassword() {
     
        
                  
        DataFetcher.adminUpdateUser(props.creds, user['uid'], true).then(json => {
            console.log(json);
            if (json.status == 'OK') {
                setText1( json.data.password);
             }
            else {
                setErrorText('Ошибка смены пароля');
            }
        });
          }

    const [errortext, setErrorText] = React.useState('');
    const [text, setText] = React.useState('');
    const [text1, setText1] = React.useState('');
   


    return (
        <View>
            <TopOffset />
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Headline style={{ textAlign: 'center', }}>Сменить свой пароль</Headline>
                  
                    <Button onPress={resetPassword}>Сбросить Пароль</Button>
                    <Text style={styles.text}>{text}</Text>
                    <Text style={styles.text}>{text1}</Text>
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
