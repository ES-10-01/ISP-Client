import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Headline, Text, TextInput } from 'react-native-paper';

import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';

export default function renameLock() {
    function change() {
        //TODO
    }


    let curName: string = "bob";
    const [lockName, setLockName] = React.useState('');


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
                    <Button onPress={change}>Переименовать</Button>
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
