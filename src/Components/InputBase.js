import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Text, IconButton} from 'react-native-paper';
import PropTypes from 'prop-types';

class InputBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            useBottomStyle: false,
        };
    }

    onFocus() {
        this.setState({
            useBottomStyle: true,
        });
    }

    onBlur() {
        this.setState({
            useBottomStyle: false,
        });
    }

    render() {
        const {
            containerStyle,
            inputStyle,
            label,
            value,
            onChangeText,
            secureTextEntry,
            errorMessage,
            keyboardType,
            key,
            multiline,
            numberOfLines,
            disabled,
            left,
            right,
            onIconPressed,
            showRightIcon,
            rightIcon,
            error,
            editable,
        } = this.props;
        const hasError = error || errorMessage;
        return (
            <View style={[styles.container, containerStyle]} key={key}>
                <View style={[styles.flexRow]}>
                    <TextInput
                        underlineColor="transparent"
                        label={label}
                        secureTextEntry={secureTextEntry}
                        style={[styles.textInput, inputStyle]}
                        value={value}
                        onChangeText={onChangeText}
                        keyboardType={keyboardType}
                        error={hasError}
                        multiline={multiline}
                        numberOfLines={numberOfLines}
                        disabled={disabled}
                        editable={editable}
                        left={left}
                        right={right}
                        onFocus={() => this.onFocus()}
                        onBlur={() => this.onBlur()}
                    />
                    {showRightIcon ? (
                        <View style={styles.iconContainer}>
                            <IconButton
                                icon={rightIcon}
                                onPress={onIconPressed}
                            />
                        </View>
                    ) : null}
                </View>
                {errorMessage ? (
                    <View style={styles.errorContainer}>
                        <Text>{errorMessage}</Text>
                    </View>
                ) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    flexRow: {
        flexDirection: 'row',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
    },
    errorContainer: {
        flex: 1,
        alignSelf: 'flex-start',
    },
});

InputBase.defaultProps = {
    showRightIcon: false,
    value: '',
    secureTextEntry: false,
    multiline: false,
    numberOfLines: 4,
    disabled: false,
    keyboardType: 'default',
    rightIcon: 'arrow-right',
    error: false,
    editable: true,
};

InputBase.propTypes = {
    label: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    containerStyle: PropTypes.object,
    inputStyle: PropTypes.object,
    errorMessage: PropTypes.string,
    keyboardType: PropTypes.string,
    key: PropTypes.any,
    multiline: PropTypes.bool,
    numberOfLines: PropTypes.number,
    disabled: PropTypes.bool,
    left: PropTypes.any,
    right: PropTypes.any,
    onIconPressed: PropTypes.func,
    showRightIcon: PropTypes.bool,
    rightIcon: PropTypes.string,
    error: PropTypes.bool,
    editable: PropTypes.bool,
};

export {InputBase};
