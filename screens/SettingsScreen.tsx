import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Headline, Text, TextInput } from 'react-native-paper';

import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';

export default function SettingsScreen(props: any) {
    function openScreen(screenName: string) {
        return () => {
            props.navigation.navigate(screenName);
        };
    }

    function change() {
        //TODO
    }

    return (
        <View>
            <TopOffset />
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Headline style={{ textAlign: 'center', }}>Мои настройки</Headline>
                    <Button onPress={openScreen('ResetPassword')}>Сбросить пароль</Button>
                    <Button onPress={openScreen('PinSetup')}>Настройка доступа</Button>
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
