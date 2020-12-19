import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, DataTable, Headline, Text, TextInput } from 'react-native-paper';
import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';
import { connect } from 'react-redux';
import DataFetcher from '../data/DataFetcher';
import { CheckBox } from "react-native";

import { createUserCreds } from '../data/UserCreds';

import { Alert } from 'react-native';

const mapStateToProps = (state: any) => {
    const { creds } = state
    return { creds };
};

export default connect(mapStateToProps)(LockListScreen);

function LockListScreen(props:any) {

    function openScreen(screenName: string) {
        props.navigation.navigate(screenName);
    }

    const [locks, setLocks] = React.useState<any>([]);
    React.useEffect(() => {
        DataFetcher.getAllLocks(props.creds).then(json => {
            console.log(json);
            if (json.status == 'OK') {
                setLocks([...json.data]);
            }
            else { 
                Alert.alert('Ошибка', json.message);
            }
        });
    }, []);

    const open = (uid: any) => {
        return () => {
            props.navigation.navigate('ConfirmCode', {
                userData: uid
            });
        };
    }
        

    const renderLocks = () => {
        const toRender = [];
        let i = 0;
        for (const lock of locks) {
            i += 1;
       
            toRender.push(
                <DataTable.Row key={i}>
                    <DataTable.Cell>
                        {lock.lock_name}
                    </DataTable.Cell>
                    <DataTable.Cell>
                    <Button onPress={open(lock.lock_uid)}>Открыть</Button>
                    </DataTable.Cell>
                </DataTable.Row>);
        }
        return toRender;
    }

    return (
        <View>
            <TopOffset />
            <View style={styles.container}>
                <ScrollView>
                    <View style={{ paddingBottom: '50%', marginBottom: '100%' }}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>
                                    <Text style={{ fontSize: 14, color: '#777' }}>Замок</Text>
                                </DataTable.Title>
                                <DataTable.Title>
                                    <Text style={{ fontSize: 14, color: '#777' }}></Text>
                                </DataTable.Title>
                            </DataTable.Header>
                            {renderLocks()}
                        </DataTable>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
    },
    checkbox: {

    }
});
