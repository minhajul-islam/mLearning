import React, {Component} from 'react'
import PropsTypes from 'prop-types'
import {TouchableHighlight, Text, View, Dimensions, StyleSheet, Platform} from 'react-native'


export default class TempComponent extends Component {
    constructor(props) {
        super(props);
    }

    static defaultProps = {
        fontSize: 16,
        backgroundColor: 'white',
        text: 'TempComponent',
        textColor: 'black',
        disabled:true

    };

    static propTypes = {
        fontSize: PropsTypes.number,
        height: PropsTypes.number,
        width: PropsTypes.oneOfType([PropsTypes.string, PropsTypes.number]),
        borderRadius: PropsTypes.number,
        backgroundColor: PropsTypes.string,
        text: PropsTypes.string,
        textColor: PropsTypes.string,
        disabled: PropsTypes.boolean,
        onClick: PropsTypes.func
    };

    render() {
        return (
            <TouchableHighlight disabled={this.props.disable} style={styles.container} underlayColor='transparent' onPress={this.props.onClick}>
                <View style={styles.column_container}>
                    <Text style={styles.center_text}>{this.props.text}</Text>
                </View>
            </TouchableHighlight>
        )
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
