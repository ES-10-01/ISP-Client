import * as React from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';
import { Button, DataTable, Headline, Text, TextInput } from 'react-native-paper';
import DataFetcher from '../data/DataFetcher';
import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';
import { connect } from 'react-redux';
import { RefreshControl } from 'react-native';

const mapStateToProps = (state: any) => {
    const { creds } = state
    return { creds };
};

export default connect(mapStateToProps)(UserListScreen);

function UserListScreen(props: any) {
    function openScreen(screenName: string) {
        props.navigation.navigate(screenName);
    }

    const [users, setUsers] = React.useState<any>([]);

    const onRefresh = () => {
        DataFetcher.adminGetAllUsers(props.creds).then(json => {
            console.log(json);
            if (json.status == 'OK') {
                setUsers([...json.data]);
            }
            else { 
                Alert.alert('Ошибка', json.message);
            }
        });
    };

    React.useEffect(onRefresh, []);

    const editUser = () => {
        openScreen('ModifyUser');
    }

    const deleteUser = (id: any) => {
        return () => {
            DataFetcher.adminDeleteUser(props.creds, id).then(json => {
                console.log(json);
                if (json.status !== 'OK') {
                    Alert.alert('Ошибка', json.message);
                }
                onRefresh();
            });
        }
    }

    const renderUsers = () => {
        const toRender = [];
        let i = 0;
        for (const user of users) {
            i += 1;
            toRender.push(
                <DataTable.Row key={i}>
                    <DataTable.Cell>
                        {user['name']} {user['surname']}
                    </DataTable.Cell>
                    <DataTable.Cell>
                        <Button icon='account-edit' onPress={editUser}> </Button>
                        <Button icon='delete' onPress={deleteUser(user['uid'])}> </Button>
                    </DataTable.Cell>
                </DataTable.Row>);
        }
        return toRender;
    }

    const addUser = () => {
        // setUsers([...users, { 'name': 'Виталий' }]);
        openScreen('AddUser');
    }

    const refreshControl = (<RefreshControl refreshing={false} onRefresh={onRefresh} />);

    return (
        <View>
            <TopOffset />
            <View style={styles.container}>
                <Headline style={{ textAlign: 'center', }}>Управление пользователями</Headline>
                <ScrollView refreshControl={refreshControl}>
                    <View style={{ paddingBottom: '50%', marginBottom: '100%' }}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>
                                    <Text style={{ fontSize: 14, color: '#777' }}>Пользователь</Text>
                                </DataTable.Title>
                                <DataTable.Title>
                                    <Text style={{ fontSize: 14, color: '#777' }}>Действия</Text>
                                </DataTable.Title>
                            </DataTable.Header>
                            {renderUsers()}
                        </DataTable>
                        <Button onPress={addUser}>Добавить пользователя</Button>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
});

