import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Text
} from 'react-native';


class TempActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "TempActivity",
        };
    }

    componentDidMount() {

    }

    render() {
        const {name} = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.center_text}>{name}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
        margin: 16,
    },
    column_container: {
        justifyContent: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    row_container: {
        flexDirection:'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        alignSelf: 'center',
    },
    center_text:{
        fontSize: 16,
        color: 'black',
        textAlignVertical: 'center',
    }

});

export default TempActivity;