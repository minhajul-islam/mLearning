import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import PinView from "react-native-pin-view";


export default class App extends Component<Props> {
        //##############################
      //Mounting methods
    // ##############################
    constructor(props) {
        super(props);
        console.log("constructor");
        this.state={
            msg:'hello'
        }

    }
    componentWillMount(){
        console.log("componentWillMount");
    }

    render() {
        console.log("render");
        return (
            <View>

                <Text>state</Text>
                <PinView
                    onComplete={(val, clear)=>{alert(val)}}
                    pinLength={5}
                />
            </View>
        );
    }


    componentDidMount(){
        console.log("componentDidMount");
    }

        //##############################
      // Updating methods
    // ##############################
    componentWillReceiveProps(){
        console.log("componentWillReceiveProps: U-0");
    }
    shouldComponentUpdate(){
        console.log("shouldComponentUpdate: U-1");
        return true;
    }
    componentWillUpdate(){
        console.log("componentWillUpdate: U-2");
    }
    componentDidUpdate(){
        console.log("componentDidUpdate U-3");
    }

        //##############################
      // Unmounting and erroor
    // ##############################

    componentWillUnmount(){
        console.log("componentWillUnmount");
    }

    componentDidCatch(){
        console.log("componentDidCatch");
    }


}

