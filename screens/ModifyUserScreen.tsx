import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Headline, Text, TextInput } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';


export default function ModifyUser(props: any) {
    function openScreen(screenName: string) {
        return () => {
            props.navigation.navigate(screenName);
        };
    }
    function change() {
        
    }


    return (
        <View>
            <TopOffset />
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Headline style={{ textAlign: 'center', }}>Smart Lock</Headline>
                    <Button onPress=  {openScreen('ResetPasswordScreen')}> Сбросить пароль </Button>
                    <Button onPress={change}>Настройка доступа</Button>
                 
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
