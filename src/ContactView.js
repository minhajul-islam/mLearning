import React from "react";
import { Button, Dimensions, Image, View, Text, TouchableOpacity } from "react-native";


const ContactView = props => {
    screenWidth = Dimensions.get('window').width;
    //console.log(props.title);
    return (


        <TouchableOpacity onPress={props.onClickItem} >
            <View style={[{  flexDirection: 'row' ,marginLeft:6, justifyContent: 'center', marginRight:6,marginTop:10}]}>

                
                    <Image
                       source={((props.thumbnail.includes("photo") && !props.thumbnail.includes("_photo"))||  props.thumbnail==='')? require('../assets/image/image_profile.png') : { uri: props.thumbnail }}
                        style={{
                            height: 40,
                            width: 40,
                            borderRadius: 20,
                            borderWidth: 1.7,
                            borderColor: '#C4C9DF',
                        
                        }}
                    />
                                 

                <View style={{ flex: 1, flexDirection: 'column',justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14, paddingLeft: 16,fontWeight: 'bold',opacity:.6}}>{props.title}</Text>
                    <Text style={{ fontSize: 14, paddingLeft: 16, marginTop: 2 }}>{props.number}</Text>
                </View>

            </View>

        </TouchableOpacity>



    );

};

export default ContactView;