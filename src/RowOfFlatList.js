import React from "react";
import {Button, Dimensions, Image, View, Text, TouchableOpacity,StyleSheet} from "react-native";


const RowOfFlatList = props => {
    let screenWidth = Dimensions.get('window').width;
    let styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            marginLeft: 6,
            marginRight: 6,
            marginTop: 10
        },
        column_container: {
            justifyContent: 'center',
            backgroundColor: 'white',
            alignSelf: 'center',
        },
        row_container: {
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: 'white',
            alignSelf: 'center',
        },
        center_text: {
            fontSize: 16,
            color: 'black',
            textAlignVertical: 'center',
        }

    });


    return (
        <TouchableOpacity onPress={props.onClickItem}>
            <View style={styles.container}>
                <View style={styles.column_container}>
                    <Text style={styles.center_text}>{props.title}</Text>
                </View>
            </View>

        </TouchableOpacity>
    );

};

export default RowOfFlatList;

{/*<RowOfFlatList*/}
    {/*onClickItem={() => this.onClick}*/}
    {/*title={"title"}*/}
    {/*number={"number"}*/}
{/*/>*/}