import React from 'react';
import {StyleSheet, View, BackHandler} from 'react-native';
import {Title, Button, IconButton, Text} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EmailInput, PasswordInput} from '../../../Components/Inputs';
import {validateEmail} from '../../../Utility/Validations';
import {storageKeys} from '../../../Utility/enums';
import {LoadingPanel} from '../../../Components/Dialogs';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serverError: null,
            password: '',
            email: '',
            errorEmail: '',
            errorPassword: '',
            showLoading: false,
        };
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => this.backBtnPressed(),
        );

        AsyncStorage.getItem(storageKeys.credentials, (e, email) => {
            if (e) {
                console.log(e);
            } else {
                this.setState({email});
            }
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    onTextChange(field, value) {
        const state = {};
        state[field] = value;
        this.setState(state);
    }

    backToLastPage(fieldToBlank) {
        const state = {};
        state[fieldToBlank] = '';

        this.setState(state);
    }

    backBtnPressed() {
        this.props.navigation.goBack();
    }

    verifyInputs() {
        const {email, password} = this.state;
        let isValid = true;
        const state = {
            errorEmail: '',
            errorPassword: '',
        };
        if (!validateEmail(email)) {
            state.errorEmail = 'Invalid email';
            isValid = false;
        }
        if (!password) {
            state.errorPassword = 'Invalid password';
            isValid = false;
        }
        if (isValid) {
            this.performSignIn();
        } else {
            this.setState(state);
        }
    }

    performSignIn() {}

    renderInputs() {
        const {email, password, errorEmail, errorPassword} = this.state;
        return (
            <View style={styles.inputSection}>
                <EmailInput
                    label="Email Address"
                    value={email}
                    onChangeText={value => this.onTextChange('email', value)}
                    errorMessage={errorEmail}
                />
                <PasswordInput
                    label="Password"
                    value={password}
                    onChangeText={value => this.onTextChange('password', value)}
                    errorMessage={errorPassword}
                />
                <Button
                    mode="contained"
                    style={styles.okBtn}
                    onPress={() => this.verifyInputs()}>
                    Submit
                </Button>
            </View>
        );
    }

    renderHeaderSection() {
        return (
            <View style={styles.titleSection}>
                <IconButton
                    icon="arrow-left"
                    color="red"
                    onPress={() => this.backBtnPressed()}
                    style={styles.backButton}
                />
                <View style={styles.titleTextContainer}>
                    <Title>Login</Title>
                </View>
            </View>
        );
    }

    render() {
        const {serverError, showLoading} = this.state;
        return (
            <>
                {this.renderHeaderSection()}
                {serverError && (
                    <View style={styles.serverErrorContainer}>
                        <Text>{serverError}</Text>
                    </View>
                )}
                {this.renderInputs()}
                <LoadingPanel isLoading={showLoading} />
            </>
        );
    }
}

const styles = StyleSheet.create({
    titleTextContainer: {
        alignItems: 'center',
        marginBottom: 8,
        flex: 1,
    },
    okBtn: {
        marginTop: 20,
        alignSelf: 'center',
    },
    inputSection: {
        flex: 2.5,
    },
    titleSection: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    backButton: {
        alignSelf: 'flex-end',
    },
    settingsButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    serverErrorContainer: {
        // alignItems: 'center'
    },
});

export {Login};
