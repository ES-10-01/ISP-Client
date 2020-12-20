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

 function LockForUserSettingsAdminScreen( props:any ) {
    const [locks, setLocks] = React.useState<any>([]);
    const [uLocks, setULocks] = React.useState<any>([]);
    const user = props.route.params.userData;
    let status;
  
    React.useEffect(() => {
            DataFetcher.adminGetAllLocks(props.creds).then(json => {
            console.log(json);
            if (json.status == 'OK') {
                 setLocks([...json.data]);
                 
        }
        else{() => setLocks([...locks, 'ОШИБКА']); }
        });

        DataFetcher.adminGetUserLocks(props.creds,user['uid']).then(json => {
            console.log(json);
            if (json.status == 'OK') {
            
                 setULocks([...json.data]);
                 console.log('запрос');
                 
                 
        }
        else{() => setULocks([...uLocks, 'ОШИБКА']); }
        });
         },[status]);
         function change() {
        }

        function setButton(lock: any){
            lock.message= 'add'
            for (const uLock of uLocks) {
                if (lock.uid == uLock.uid) { 
                lock.message = 'delete'
                return 'Отозвать' } }
            
                return 'Предоставить'
        }

        function action(lock:any){
            return ()=>{
                
                if (lock.message == 'delete'){
                    console.log('Отзываем доступ ')
                    console.log(lock.uid,user['uid'])
                    DataFetcher.adminRemoveLockAccess(props.creds,lock.uid,user['uid']).then(json => {
                    console.log(json);   
                    lock.message == 'add'  
                        
                    DataFetcher.adminGetAllLocks(props.creds).then(json => {
                        console.log(json);
                        if (json.status == 'OK') {
                             setLocks([...json.data]);
                             
                    }
                    else{() => setLocks([...locks, 'ОШИБКА']); }
                    });
            
                    DataFetcher.adminGetUserLocks(props.creds,user['uid']).then(json => {
                        console.log(json);
                        if (json.status == 'OK') {
                        
                             setULocks([...json.data]);
                             console.log('запрос');
                             
                             
                    }
                    else{() => setULocks([...uLocks, 'ОШИБКА']); }
                    });                  
                    });}
                else{
                    console.log('Открываем доступ')
                    console.log(lock.uid,user['uid'])
                    DataFetcher.adminAddLockAccess(props.creds,lock.uid,user['uid']).then(json => {
                     console.log(json);
                     DataFetcher.adminGetAllLocks(props.creds).then(json => {
                        console.log(json);
                        if (json.status == 'OK') {
                             setLocks([...json.data]);
                             
                    }
                    else{() => setLocks([...locks, 'ОШИБКА']); }
                    });
            
                    DataFetcher.adminGetUserLocks(props.creds,user['uid']).then(json => {
                        console.log(json);
                        if (json.status == 'OK') {
                        
                             setULocks([...json.data]);
                             console.log('запрос');
                             
                             
                    }
                    else{() => setULocks([...uLocks, 'ОШИБКА']); }
                    });
                     lock.message = 'delete'
            });}
            
        }
        }


    const renderLocks = () => {
        const toRender = [];
        let i = 0;
        for (const lock of locks) {
            i += 1;
            toRender.push(
                <DataTable.Row key={i}>
                    <DataTable.Cell>
                        {lock.name}
                    </DataTable.Cell>
                    <DataTable.Cell>
                    <Button onPress={action(lock)} >{setButton(lock)}</Button>
                    </DataTable.Cell>
                </DataTable.Row>);
        }
        return toRender;
    }

    return (
        <View style={{ paddingBottom: '50%', marginBottom: '100%' }}>
            <TopOffset />
            <View style={styles.container}>
            <Headline style={{ textAlign: 'center', }}>Настройки для пользователя:</Headline>
                <Headline style={{ textAlign: 'center', }}>{user['name']}</Headline>
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
