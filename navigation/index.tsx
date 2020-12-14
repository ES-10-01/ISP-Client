import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import ConfirmCodeScreen from '../screens/ConfirmCodeScreen';
import FirstLoginScreen from '../screens/FirstLoginScreen';
import LockListScreen from '../screens/LockListScreen';
import AccessSettingsScreen from '../screens/AccessSettingsScreen'
import AddUserScreen from '../screens/AddUserScreen';
import RenameLockScreen from '../screens/RenameLockScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import PinLoginScreen from '../screens/PinLoginScreen';
import UserListScreen from '../screens/UserListScreen';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import { connect } from 'react-redux';
import BottomTabNavigatorAdmin from './BottomTabNavigatorAdmin';
import { BottomNavigation } from 'react-native-paper';
import ChangePassword from '../screens/ResetPasswordScreen';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
function Navigation({ colorScheme, isAuth, isAdmin }: { colorScheme: ColorSchemeName, isAuth: boolean, isAdmin: boolean }) {
    return (
        <NavigationContainer
            linking={LinkingConfiguration}
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator isAuth={isAuth} isAdmin={isAdmin} />
        </NavigationContainer>
    );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function RootNavigator({ isAuth, isAdmin }:  { isAuth: boolean, isAdmin: boolean }) {
    const rootScreen = 
    (!isAuth) ? FirstLoginScreen :
       (isAdmin) ? BottomTabNavigatorAdmin : BottomTabNavigator;

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={rootScreen} />
            <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
            <Stack.Screen name="FirstLogin" component={FirstLoginScreen} />
            <Stack.Screen name="PinLogin" component={PinLoginScreen} />
            <Stack.Screen name="LockList" component={LockListScreen} />
            <Stack.Screen name="ConfirmCode" component={ConfirmCodeScreen} />
            <Stack.Screen name="UserList" component={UserListScreen} />
            <Stack.Screen name="AddUser" component={AddUserScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="RenameLock" component={RenameLockScreen} />
            <Stack.Screen name="AccesSettings" component={AccessSettingsScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        </Stack.Navigator>
    );
}

const mapStateToProps = (state: any) => {
    const { isAuth, isAdmin } = state
    return { isAuth, isAdmin };
};

export default connect(mapStateToProps)(Navigation);
