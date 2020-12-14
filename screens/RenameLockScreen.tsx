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

export default connect(mapStateToProps)(RenameLock);

 function RenameLock({ creds }:  { creds:any }) {


    function rename() {
        DataFetcher.adminRenameLock(creds,20,lockName).then(json => {
            console.log(json);
            if (lockName =='попа' )
            {setErrorText('Это имя уже используется');
        return;}
            if (json.status == 'OK') {
            setText('Имя замка измененно' )
            }
            else {
                setErrorText('Не удалось изменить имя ');
            }
        
    });


}
    const [lockName, setLockName] = React.useState('');
    const [errortext, setErrorText] = React.useState('');
    const [text, setText] = React.useState('');


    return (
        <View>
            <TopOffset />
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Headline style={{ textAlign: 'center', }}>Smart Lock </Headline>
                    <Headline style={{ textAlign: 'center', }}>Введите имя замка </Headline>
                    <TextInput
                        mode="outlined"
                        value={lockName}
                        onChangeText={setLockName}
                    />
                    <Button onPress={rename}>Переименовать</Button>
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
