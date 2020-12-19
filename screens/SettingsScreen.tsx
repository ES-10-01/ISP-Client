import * as React from 'react';
import { DevSettings, StyleSheet } from 'react-native';
import { Button, Headline, Text, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';

import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';
import { boundSetAuth, boundSetNoAuth } from '../data/Actions';
import DataStorage from '../data/DataStorage';

function SettingsScreen(props: any) {
    function openScreen(screenName: string) {
        return () => {
            props.navigation.navigate(screenName);
        };
    }

    function exit() {
        DataStorage.deleteUserCreds();
        props.setNoAuth();
    }

    return (
        <View>
            <TopOffset />
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Headline style={{ textAlign: 'center', }}>Мои настройки</Headline>
                    <Button onPress={openScreen('ResetPassword')}>Сбросить пароль</Button>
                    <Button onPress={openScreen('PinSetup')}>Настройка доступа</Button>
                    <Button onPress={exit}>Выход из аккаунта</Button>
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

const mapDispatchToProps = (dispatch: any, props: any) => {
    return {
        setNoAuth: () => boundSetNoAuth(dispatch)
    }
};

export default connect(null, mapDispatchToProps)(SettingsScreen);