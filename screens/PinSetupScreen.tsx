import * as React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Button, Colors, Headline, IconButton, Modal, Portal, Text, TextInput, Title } from 'react-native-paper';
import { connect } from 'react-redux';

import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';
import DataStorage from '../data/DataStorage';

function PinSetupScreen(props: any) {
    const [pin, setPin] = React.useState('');

    const printPin = () => {
        let nums = pin.split('');
        while (nums.length < 4)
            nums.push('_');
        return nums.join(' ');
    }

    const NumBtn = (props: any) => {
        const numPress = () => {
            if (pin.length < 4)
                setPin(pin + props.num);
        }
        return (<Button onPress={numPress} labelStyle={styles.numBtnStyle}>{props.num}</Button>);
    };

    const delChar = () => {
        if (pin.length > 0)
            setPin(pin.substr(0, pin.length - 1));
    }

    const delAll = () => {
        setPin('');
    }

    const savePin = () => {
        if (pin.length < 4) {
            Alert.alert('Ошибка', 'Нужно указать pin-код из 4 цифр');
            return;
        }
        DataStorage.setUserUid(props.creds.userUid, pin);
        DataStorage.setUserPassword(props.creds.password, pin);
        props.navigation.goBack();
    }

    const dontUsePin = () => {
        DataStorage.deleteUserCreds();
        props.navigation.goBack();
    }

    return (
        <View>
            <TopOffset />
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Headline style={{ textAlign: 'center', }}>Пин-код для входа</Headline>
                    <Headline style={{ textAlign: 'center', }}>{printPin()}</Headline>
                    <View style={styles.rowStyle}>
                        <NumBtn num={'1'} />
                        <NumBtn num={'2'} />
                        <NumBtn num={'3'} />
                    </View>
                    <View style={styles.rowStyle}>
                        <NumBtn num={'4'} />
                        <NumBtn num={'5'} />
                        <NumBtn num={'6'} />
                    </View>
                    <View style={styles.rowStyle}>
                        <NumBtn num={'7'} />
                        <NumBtn num={'8'} />
                        <NumBtn num={'9'} />
                    </View>
                    <View style={styles.rowStyle}>
                        <IconButton
                            onPress={delChar}
                            icon="chevron-left"
                            color={Colors.purple500}
                            size={20}
                            style={{ width: 50, }}
                        />
                        <NumBtn num={'0'} />
                        <IconButton
                            onPress={delAll}
                            icon="delete"
                            color={Colors.purple500}
                            size={20}
                            style={{ width: 50, }}
                        />
                    </View>
                </View>
                <Button onPress={savePin}>Сохранить</Button>
                <Button onPress={dontUsePin}>Не использовать PIN</Button>
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
    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    numBtnStyle: {
        fontSize: 20,
    },

    modalContainerStyle: {
        backgroundColor: 'white',
        padding: 20,
    },
});

const mapStateToProps = (state: any) => {
    const { creds } = state
    return { creds };
};

export default connect(mapStateToProps)(PinSetupScreen);
