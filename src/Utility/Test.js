import React from 'react';
import {StyleSheet, View} from 'react-native';
import {DropDownList} from '../Components/DropDownList';

class Test extends React.Component {
    state = {
        gender: '',
    };

    onChange = gender => this.setState({gender});

    choiceList = () => [
        {
            label: 'Male',
            value: 'male',
        },
        {
            label: 'FeMale',
            value: 'female',
        },
        {
            label: 'Other',
            value: 'other',
        },
    ];

    render() {
        const {gender} = this.state;
        return (
            <View style={styles.container}>
                <DropDownList
                    label="Theme"
                    value={gender}
                    choiceList={['Male', 'Female', 'Other']}
                    onChange={this.onChange}
                    containerStyle={styles.dropDownContainer}
                    // errorMessage="hello"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
    },
    innerContainer: {
        flex: 1,
        // justifyContent: 'flex-end',
        // alignItems: 'flex-end',
    },
    dropDownContainer: {
        flex: 1,
        // backgroundColor: 'red',
    },
});

export default Test;
