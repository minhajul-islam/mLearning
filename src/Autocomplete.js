import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    ListView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    ViewPropTypes as RNViewPropTypes
} from 'react-native';

const ViewPropTypes = RNViewPropTypes || View.propTypes;

class Autocomplete extends Component {
    static propTypes = {
        ...TextInput.propTypes,
        containerStyle: ViewPropTypes.style,
        data: PropTypes.array,
        hideResults: PropTypes.bool,
        inputContainerStyle: ViewPropTypes.style,
        keyboardShouldPersistTaps: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool
        ]),
        listContainerStyle: ViewPropTypes.style,
        listStyle: ViewPropTypes.style,
        onShowResults: PropTypes.func,
        onStartShouldSetResponderCapture: PropTypes.func,
        renderItem: PropTypes.func,
        renderSeparator: PropTypes.func,
        renderTextInput: PropTypes.func,
        rowHasChanged: PropTypes.func
    };

    static defaultProps = {
        data: [],
        defaultValue: '',
        keyboardShouldPersistTaps: 'always',
        onStartShouldSetResponderCapture: () => false,
        renderItem: rowData => <Text>{rowData}</Text>,
        renderSeparator: null,
        renderTextInput: props => <TextInput {...props} />,
        rowHasChanged: (r1, r2) => r1 !== r2
    };

    constructor(props) {
        super(props);

        const ds = new ListView.DataSource({ rowHasChanged: props.rowHasChanged });
        this.state = { dataSource: ds.cloneWithRows(props.data) };
        this.resultList = null;
    }

    componentWillReceiveProps({ data }) {
        const dataSource = this.state.dataSource.cloneWithRows(data);
        this.setState({ dataSource });
    }

    blur() {
        const { textInput } = this;
        textInput && textInput.blur();
    }

    focus() {
        const { textInput } = this;
        textInput && textInput.focus();
    }

    renderResultList() {
        const { dataSource } = this.state;
        const {
            listStyle,
            renderItem,
            renderSeparator,
            keyboardShouldPersistTaps,
            onEndReached,
            onEndReachedThreshold
        } = this.props;

        return (
            <ListView
                ref={(resultList) => { this.resultList = resultList; }}
                dataSource={dataSource}
                keyboardShouldPersistTaps={keyboardShouldPersistTaps}
                renderRow={renderItem}
                renderSeparator={renderSeparator}
                onEndReached={onEndReached}
                onEndReachedThreshold={onEndReachedThreshold}
                style={[styles.list, listStyle]}
            />
        );
    }

    renderTextInput() {
        const { onEndEditing, renderTextInput, style } = this.props;
        const props = {
            style: [styles.input, style],
            ref: ref => (this.textInput = ref),
            onEndEditing: e => onEndEditing && onEndEditing(e),
            ...this.props
        };

        return renderTextInput(props);
    }

    render() {
        const { dataSource } = this.state;
        const {
            containerStyle,
            hideResults,
            inputContainerStyle,
            listContainerStyle,
            onShowResults,
            onStartShouldSetResponderCapture
        } = this.props;
        const showResults = dataSource.getRowCount() > 0;

        // Notify listener if the suggestion will be shown.
        onShowResults && onShowResults(showResults);

        return (
            <View style={[styles.container, containerStyle]}>
                <View style={[styles.inputContainer, inputContainerStyle]}>
                    {this.renderTextInput()}
                </View>
                {!hideResults && (
                    <View
                        style={listContainerStyle}
                        onStartShouldSetResponderCapture={onStartShouldSetResponderCapture}
                    >
                        {showResults && this.renderResultList()}
                    </View>
                )}
            </View>
        );
    }
}

const border = {
    borderColor: '#b9b9b9',
    borderRadius: 1,
    borderWidth: 1
};

const androidStyles = {
    container: {
        flex: 1
    },
    inputContainer: {
        ...border,
        marginBottom: 0
    },
    list: {
        ...border,
        backgroundColor: 'white',
        borderTopWidth: 0,
        margin: 10,
        marginTop: 0
    }
};

const iosStyles = {
    container: {
        zIndex: 1
    },
    inputContainer: {
        ...border
    },
    input: {
        backgroundColor: 'white',
        height: 40,
        paddingLeft: 3
    },
    list: {
        ...border,
        backgroundColor: 'white',
        borderTopWidth: 0,
        left: 0,
        position: 'absolute',
        right: 0
    }
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        height: 40,
        paddingLeft: 3
    },
    ...Platform.select({
        android: { ...androidStyles },
        ios: { ...iosStyles }
    })
});

export default Autocomplete;
