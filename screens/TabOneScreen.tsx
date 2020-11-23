import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import { Text, View } from '../components/Themed';

export default function TabOneScreen(props: any) {
    function openScreen(screenName: string) {
        return () => {
            props.navigation.navigate(screenName);
        };
    }

    return (
        <View style={styles.container}>
            <Text>Тут ссылки экраны для теста.</Text>
            <Text>{'\n'}Добавление экрана:</Text>
            <Text>- компонент в /screens</Text>
            <Text>- регистрация в navigation/index.tsx</Text>
            <Text>- добавляем  тут кнопку</Text>
            <Button onPress={openScreen('FirstLogin')}>First Login Screen</Button>
            <Button onPress={openScreen('PinLogin')}>PIN Login Screen</Button>
            <Button onPress={openScreen('LockList')}>Lock List Screen</Button>
            <Button onPress={openScreen('ConfirmCode')}>Confirm Code Screen</Button>
            <Button onPress={openScreen('UserList')}>User List Screen</Button>
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
