import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, DataTable, Headline, Text, TextInput } from 'react-native-paper';

import { View } from '../components/Themed';
import TopOffset from '../components/TopOffset';

export default function AccessSettingsScreen() {
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
                                <DataTable.Title>
                                <Text style={{ fontSize: 14, color: '#777' }}>Доступ</Text>
                                </DataTable.Title>
                            </DataTable.Header>
                            
                        </DataTable>
                        <Button>Сохранить изменения </Button>
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

