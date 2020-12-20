import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Caption, Headline, Paragraph, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';
import DataFetcher from '../data/DataFetcher';
const mapStateToProps = (state: any) => {
    const { creds } = state
    return { creds };
};
export default connect(mapStateToProps)(ConfirmCodeScreen);
function ConfirmCodeScreen(props:any) {
    function openScreen(screenName: string) {
        props.navigation.navigate(screenName);
    }
    let PIN:any;
    const data = props.route.params.userData;
     function sendCode() {
        PIN = '0000'
        DataFetcher.openLock(props.creds, data).then(json => {
            console.log(json);
            if (json.status == 'OK') {
                PIN = json.data.lock_PIN
            }
            else 
            PIN = '0000'
            return PIN

        });
        return PIN
    }
    function deny(){
        DataFetcher.cancelLockOpen(props.creds, data).then(json => {
            console.log(json);
            
        });
        openScreen('LockList');

    }

    return (
        <View style={styles.outerContainer}>
            <TopOffset />
            <View style={styles.container}>
                <Headline style={{ textAlign: 'center', }}>Smart Lock</Headline>
                <View style={styles.centeredContainer}>
                    <Paragraph style={{ textAlign: 'center', }}>
                        Замок "Название замка" готов к открытию.{'\n'}Для открытия введите код:
                    </Paragraph>
                    <Text style={styles.codeText}> {sendCode()}</Text>
                    <Button onPress={deny} >Отменить вход</Button>
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
