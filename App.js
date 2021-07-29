import React from 'react';
import {Provider} from 'react-native-paper';
import {AccountNavigation} from './src/Navigation/AccountNavigation';
import {NavigationContainer} from '@react-navigation/native';

export const App = props => {
    return (
        <NavigationContainer>
            <Provider>
                <AccountNavigation />
            </Provider>
        </NavigationContainer>
    );
};
