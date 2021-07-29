import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Title, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './Login';
import {accountPages} from '../../Utility/enums';
import {storageKeys} from '../../Utility/enums';
import {LoaderAndMessageDialog} from '../../Components/Dialogs';

class AccountControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            message: '',
        };
    }

    componentDidMount() {
        AsyncStorage.getItem(storageKeys.credentials, (e, credentials) => {
            if (e) {
                this.setState({
                    isLoading: false,
                    message: e.message,
                });
            }
            try {
                // try logging in with credentials
                this.setState({
                    isLoading: false,
                });
            } catch (error) {
                this.setState({
                    isLoading: false,
                    message: error,
                });
            }
        });
    }

    hideMessage() {
        this.setState({
            message: '',
        });
    }

    loginClicked = () => {
        const {navigation} = this.props;
        navigation.navigate(accountPages.LOGIN);
    };

    registerClicked = () => {
        const {navigation} = this.props;
        navigation.navigate(accountPages.REGISTER);
    };

    render() {
        const {isLoading, message} = this.state;
        return (
            <>
                <View style={styles.titleTextContainer}>
                    <Title>Welcome to Escrew</Title>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        style={styles.button}
                        onPress={() => this.loginClicked()}>
                        Log In
                    </Button>
                    <Button
                        mode="contained"
                        style={styles.button}
                        onPress={() => this.registerClicked()}>
                        Register
                    </Button>
                </View>
                <LoaderAndMessageDialog
                    isLoading={isLoading}
                    message={message}
                />
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    titleTextContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
    },
    buttonContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 2,
    },
    button: {
        marginVertical: 10,
    },
    settingsButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
});

export {AccountControl, Login};
