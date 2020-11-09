import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { Text, View } from '../components/Themed';

export default function TabOneScreen(props: any) {
    function openFirstLoginScreen() {
        props.navigation.navigate('FirstLogin');
    }

    return (
        <View style={styles.container}>
            <Text>Тут ссылки экраны для теста.</Text>
            <Text>{'\n'}Добавление экрана:</Text>
            <Text>- компонент в /screens</Text>
            <Text>- регистрация в navigation/index.tsx</Text>
            <Text>- добавляем тут кнопку</Text>
            <Button onPress={openFirstLoginScreen}>First Login Screen</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
