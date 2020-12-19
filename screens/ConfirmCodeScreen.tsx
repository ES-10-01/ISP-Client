import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Caption, Headline, Paragraph, Text } from 'react-native-paper';

import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';

export default function ConfirmCodeScreen(props:any) {
    const user = props.route.params.userData;
    return (
        <View style={styles.outerContainer}>
            <TopOffset />
            <View style={styles.container}>
                <Headline style={{ textAlign: 'center', }}>Smart Lock</Headline>
                <View style={styles.centeredContainer}>
                    <Paragraph style={{ textAlign: 'center', }}>
                        Замок "Название замка" готов к открытию.{'\n'}Для открытия введите код:
                    </Paragraph>
                    <Text style={styles.codeText}>5 3 6 8</Text>
                    <Button>Отменить вход</Button>
                </View>
                <View style={styles.bottomNote}>
                    <Caption style={{ textAlign: 'center' }}>Код активен в течение 30 секунд.</Caption>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        height: '100%',
    },
    container: {
        marginTop: 10,
        height: '100%',
        flex: 1,
        flexDirection: 'column',
    },
    bottomNote: {
        width: '100%',
        alignContent: 'center',
        height: 100,
        bottom: 0,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    codeText: {
        fontSize: 36,
        textAlign: 'center',
    },
});
