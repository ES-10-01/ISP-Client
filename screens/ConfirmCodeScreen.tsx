import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Caption, Headline, Paragraph, Text } from 'react-native-paper';
import { connect } from 'react-redux';
import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';
import DataFetcher from '../data/DataFetcher';
import navigation from '../navigation';
const mapStateToProps = (state: any) => {
    const { creds } = state
    return { creds };
};
const mapStateToAdmin = (state: any) => {
    const { isAdmin } = state
    return { isAdmin };
};
export default connect (mapStateToProps)(ConfirmCodeScreen);
function ConfirmCodeScreen(props:any) {
    function openScreen(screenName: string) {
        props.navigation.navigate(screenName);
    }
    const [pin,setPin]=  React.useState<any>('0000');
    const [text, setText] = React.useState('');
    const data = props.route.params.userData;
    let counter: number; 
    counter=0;
     function sendCode() {
        
        DataFetcher.openLock(props.creds, data['lock_uid']).then(json => {
            console.log(json);
            if (json.status == 'OK') {
                setPin(json.data.lock_PIN)
                let timeoutId = setTimeout(function checkStatus() {
                    DataFetcher.getLockStatus(props.creds, data['lock_uid']).then(response => {
                      if (response.status === 'OPENED') {
                        counter++;
                        if (counter===1)
                           { props.navigation.goBack();} 
                      } else {
                        timeoutId = setTimeout(checkStatus, 1000);
                        
                      }
                    });
                  }, 1000);
            }
           
            
            return pin

        });
        return pin
    }

   
    
    


    function deny(){
        DataFetcher.cancelLockOpen(props.creds, data['lock_uid']).then(json => {
            console.log(json);
            
        });
        props.navigation.goBack(); 

    }

    return (
        <View style={styles.outerContainer}>
            <TopOffset />
            <View style={styles.container}>
                <Headline style={{ textAlign: 'center', }}>Smart Lock</Headline>
                <View style={styles.centeredContainer}>
                    <Paragraph style={{ textAlign: 'center', }}>
                        Замок { data['lock_name']} готов к открытию.{'\n'}Для открытия введите код:
                    </Paragraph>
                    <Text style={styles.codeText}> {sendCode()}</Text>
                    <Button onPress={deny} >Отменить вход</Button>
                    <Text > {text}  </Text>
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
