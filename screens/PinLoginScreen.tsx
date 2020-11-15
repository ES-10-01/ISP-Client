import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Colors, Headline, IconButton, Modal, Portal, Text, TextInput, Title } from 'react-native-paper';

import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';

export default function PinLoginScreen() {
    const [pin, setPin] = React.useState('');
    const [isFingerprint, setIsFingerprint] = React.useState(false);

    const enableFingerprint = () => setIsFingerprint(true);
    const disableFingerprint = () => setIsFingerprint(false);

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
        // if (pin.length > 0)
        //     setPin(pin.substr(0, pin.length - 1));
        setPin('');
    }

    return (
        <View>
            <TopOffset />
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Headline style={{ textAlign: 'center', }}>Smart Lock</Headline>
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
                            onPress={enableFingerprint}
                            icon="fingerprint"
                            color={Colors.purple500}
                            size={20}
                            style={{ width: 50, }}
                        />
                        <NumBtn num={'0'} />
                        <IconButton
                            onPress={delChar}
                            icon="close"
                            color={Colors.purple500}
                            size={20}
                            style={{ width: 50, }}
                        />
                        {/* <Button onPress={delChar}>del</Button> */}
                    </View>
                </View>
                <Portal>
                    <Modal visible={isFingerprint} onDismiss={disableFingerprint} contentContainerStyle={styles.modalContainerStyle}>
                        <Title>Вход по отпечатку</Title>
                        <Text>
                            Приложите палец к сканеру отпечатка.{'\n'}
                            Если нет сканера, используйте пин-код.
                        </Text>
                    </Modal>
                </Portal>
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
