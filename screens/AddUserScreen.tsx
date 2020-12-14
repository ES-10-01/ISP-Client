import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Headline, Text, TextInput } from 'react-native-paper';
import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';
import { connect } from 'react-redux';
import { boundSetAuth } from '../data/Actions';
import DataFetcher from '../data/DataFetcher';
import { createUserCreds } from '../data/UserCreds';

export default function AddUser() {
    function addUser() {
        if (name == null || surname ==  null) {
            setError('Укажите имя и фамилию');
            return;
        }
        if (privilege != "admin" && privilege != "user") {
            setError('Укажите привелегию');
            return;
        }
        // DataFetcher.adminAddUser(UserCreds(),name,surname,privilege);
        
               
       
    }


    const [privilege, setPrivelege] = React.useState('');
    const [name, setName] = React.useState('');
    const [surname, setSurName] = React.useState('');
    const [error, setError] = React.useState('');

    return (
        <View>
            <TopOffset />
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Headline style={{ textAlign: 'center', }}>Smart Lock</Headline>
                    <Headline style={{ textAlign: 'center', }}>Добавление пользователя</Headline>
                    <TextInput
                      
                        mode="outlined"
                        label="Имя "
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                      
                      mode="outlined"
                      label="Фамилия"
                      value={surname}
                      onChangeText={setSurName}
                  />
                    <TextInput
                      
                        mode="outlined"
                        label="Привелегия"
                        value={privilege}
                        onChangeText={setPrivelege}
                    />
                   
                    <Button onPress={addUser}>Добавить пользователя</Button>
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
