import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, DataTable, Headline, Text, TextInput } from 'react-native-paper';
import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';
import { connect } from 'react-redux';
import DataFetcher from '../data/DataFetcher';
import { CheckBox } from "react-native";

import { createUserCreds } from '../data/UserCreds';

const mapStateToProps = (state: any) => {
    const { creds} = state
    return { creds };
};

export default connect(mapStateToProps)(LockForUserSettingsAdminScreen);

 function LockForUserSettingsAdminScreen({ creds }:  { creds:any }) {
    const [locks, setLocks] = React.useState<any>([]);
    React.useEffect(() => {
            DataFetcher.getAllLocks(creds).then(json => {
            console.log(json);
            if (json.status == 'OK') {
             
                 setLocks([...json.data]);
        }
        else{() => setLocks([...locks, 'ОШИБКА']); }
        });
        
         },[]);
         function change() {
        
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
                        <CheckBox
                             value={true}
                            onValueChange={change}
                            style={styles.checkbox}
                        />
                    </DataTable.Cell>
                </DataTable.Row>);
        }
        return toRender;
    }

    return (
        <View style={{ paddingBottom: '50%', marginBottom: '100%' }}>
            <TopOffset />
            <View style={styles.container}>
                <Headline style={{ textAlign: 'center', }}>Smart Lock</Headline>
                <ScrollView>
                    <View style={{ paddingBottom: '50%', marginBottom: '100%' }}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>
                                    <Text style={{ fontSize: 14, color: '#777' }}>Все замки</Text>
                                    </DataTable.Title>
                                    <DataTable.Title>
                                <Text style={{ fontSize: 14, color: '#777' }}>Доступ</Text>
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
        marginTop: 5,
    },
    checkbox: {
      
      }
});
