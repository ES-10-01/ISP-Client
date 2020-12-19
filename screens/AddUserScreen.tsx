import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Headline, Text, TextInput } from 'react-native-paper';
import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';
import { connect } from 'react-redux';
import { boundSetAuth } from '../data/Actions';
import DataFetcher from '../data/DataFetcher';
import { createUserCreds } from '../data/UserCreds';

const mapStateToProps = (state: any) => {
    const { creds } = state
    return { creds };
};

export default connect(mapStateToProps)(AddUser);

function AddUser({ creds }: { creds: any }) {
    function addUser() {
        if (name == null || surname == null) {
            setText('Укажите имя и фамилию');
            return;
        }
        if (privilege != "admin" && privilege != "user") {
            setText('Укажите привелегию');
            return;
        }

        DataFetcher.adminAddUser(creds, name, surname, privilege).then(json => {
            console.log(json);
            if (json.status == 'OK') {

                setText('Логин: ' + json.data.uid + ' Пароль: ' + json.data.password)
            }
            else {
                setText('Пользователь не добавлен');
            }
        });
    }


    const [privilege, setPrivelege] = React.useState('');
    const [name, setName] = React.useState('');
    const [surname, setSurName] = React.useState('');
    const [text, setText] = React.useState('');

    return (
        <View>
            <TopOffset />
            <View style={styles.container}>
                <View style={styles.formContainer}>
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
                    <Text style={styles.text}>{text}</Text>
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
});

