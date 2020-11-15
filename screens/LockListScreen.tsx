import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, DataTable, Headline, Text, TextInput } from 'react-native-paper';

import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';

export default function LockListScreen() {
    const [locks, setLocks] = React.useState<any>([]);

    const renderLocks = () => {
        const toRender = [];
        let i = 0;
        for (const lock of locks) {
            i += 1;
            toRender.push(
                <DataTable.Row key={i}>
                    <DataTable.Cell>
                        {lock}
                    </DataTable.Cell>
                </DataTable.Row>);
        }
        return toRender;
    }

    return (
        <View>
            <TopOffset />
            <View style={styles.container}>
                <Headline style={{ textAlign: 'center', }}>Smart Lock</Headline>
                <ScrollView>
                    <View style={{ paddingBottom: '50%', marginBottom: '100%' }}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title>
                                    <Text style={{ fontSize: 14, color: '#777' }}>Доступные замки</Text>
                                </DataTable.Title>
                            </DataTable.Header>
                            {renderLocks()}
                        </DataTable>
                        <Button onPress={() => setLocks([...locks, 'test'])}>Добавить замок (тест)</Button>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        //height: '100%',
    },

    locksTableContainer: {

    },
});
