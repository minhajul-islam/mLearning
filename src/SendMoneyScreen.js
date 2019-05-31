import {Component} from "react";
import {
    StatusBar,
    View,
    AsyncStorage,
    Platform,
    PermissionsAndroid,
    Keyboard,
    FlatList,
    Dimensions,
    Alert,
    Object
} from "react-native";
import styles from '../styles/SendMoney';
import {withNavigationFocus} from "react-navigation";
import React from "react";
import Color from "../../assets/color/Color";
import EditTextNext from "../../components/EditTextNext";
import Contacts from 'react-native-contacts';
import ContactView from '../../components/ContactView';
import DotLoader from "../../components/DotLoader";
import TempComponent from "./TempComponent";

class SendMoneyScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            mobile: '',
            amount: '',
            checked: false,
            isLoading: true,
            userInfo: '',
            simType: 'prepaid',
            validNumber: false,
            validAmount: false,
            amountError: '',
            numberError: '',
            status: '',
            isClick: false,
            showDialog: false,
            operator: 1,
            isActive: false,
            backButton: true,
            banner: [],
            contactName: '',
            allContacts: [],
            rootContacts: [],
            contacts: [],
            query: '',
            showUpdateIos: false,
            btnSelected: 0,
            avater: '',
            contactItem: JSON.parse('{ "name" : "" , "number" : "" , "thumbnail" : "" ,"favorite" : false}'),
            myContact: JSON.parse('{ "name" : "" , "number" : "" , "thumbnail" : "" ,"favorite" : false}'),
            favContacts: [],
            myContacts: [],
            title: 'Send Gift',

        }

    }

    static navigationOptions = ({navigation}) => ({

        title: "Choose Contact",
        headerStyle: {
            backgroundColor: Color.appbar,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
        },
        headerTitleStyle: {
            flex: 1,
            textAlign: 'center',
            marginRight: Platform.OS === 'ios' ? 0 : 56
        },

        headerTintColor: Color.white,
        noShadow: true,
        hasTabs: true
    });


    async componentDidMount() {
        this._storeContacts();
        const favContacts = await AsyncStorage.getItem('favContacts');
        const mobile = await AsyncStorage.getItem('mobile');
        let favContacObj = JSON.parse(favContacts);
        if (!favContacObj) {
            favContacObj = []
        }
        this.setState({
            favContacts: favContacObj,
        });
        if (mobile != null && mobile !== ""){
            this.setState({
                mobile: mobile,
            });
            this.onNumberChange(mobile)
        }



    }

    async _storeContacts() {
        const myContact = await AsyncStorage.getItem('myContact');
        let myContacObj = JSON.parse(myContact);
        if (!myContacObj) {
            myContacObj = []
        }
        console.log(myContacObj);
        this.setState({
            myContacts: this.state.myContacts.concat(myContacObj)
        });

        if (Platform.OS === 'ios') {
            Contacts.getAll((err, contacts) => {
                if (err) {
                    throw err;
                }

                this.setState({
                    contacts: contacts
                });
                try {
                    this._processedContacts();

                } catch (e) {

                }

            })


        } else {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS);

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

            }

            Contacts.checkPermission((err, permission) => {
                if (err) throw err;

                // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
                if (permission === 'undefined') {
                    Contacts.requestPermission((err, permission) => {
                        // ...
                    })
                }
                if (permission === 'authorized') {
                    Contacts.getAll((err, contacts) => {
                        if (err) {
                            // console.log("M=err");
                            throw err;
                        }
                        this.setState({
                            contacts: contacts
                        });
                        try {
                            this._processedContacts();
                        } catch (e) {
                            console.log(e);
                            this.setState({
                                isLoading: false

                            });
                        }
                    })

                }
                if (permission === 'denied') {
                    console.log("permission--denied");
                }
            })


        }


    }

    _processedName(givenName,middleName,familyName){
       // return name.replace(/(?:\r\n|\r|\n)/g, "")
        let finalName="";
        if(givenName!==null && givenName!==undefined && givenName!=='' )
            finalName=finalName+givenName.replace(/\n/g, " ").replace(/[^a-zA-Z0-9]/g, ' ');
        if(middleName!==null && middleName!==undefined && middleName!=='' )
            finalName=finalName+" "+middleName.replace(/\n/g, " ").replace(/[^a-zA-Z0-9]/g, ' ');
        if(familyName!==null && familyName!==undefined && familyName!=='' )
            finalName=finalName+" "+familyName.replace(/\n/g, " ").replace(/[^a-zA-Z0-9]/g, ' ');
        return finalName.trim();
    }
    _processedContacts() {
        let jsonString = '[';
        const contacts = this.state.contacts;


        for (let i = 0; i < contacts.length; i++) {
                const cItem = contacts[i].phoneNumbers;
                let max = cItem.length;
                let current = '';
                for (let j = 0; j < max; j++) {
                    const number = cItem[j];
                    let jsonItem = '';
                    if (number.number.length > 10 && current !== number.number) {
                        current = number.number;
                        if (contacts[i].hasThumbnail && (contacts[i].thumbnailPath !== undefined || contacts[i].thumbnailPath != null))
                            jsonItem = '{ "name" : "' + this._processedName(contacts[i].givenName, contacts[i].middleName, contacts[i].familyName) + '" , "number" : "' +  number.number + '" , "thumbnail" : "' + contacts[i].thumbnailPath + '" }';
                        else
                            jsonItem = '{ "name" : "' + this._processedName(contacts[i].givenName, contacts[i].middleName, contacts[i].familyName) + '" , "number" : "' + number.number + '" , "thumbnail" : "" }';
                        if (jsonString==="[" || (i === 0 && j === 0))
                            jsonString = jsonString + ' ' + jsonItem;
                        else
                            jsonString = jsonString + ', ' + jsonItem;
                    }
                }


        }
        jsonString = jsonString + ' ]';
         console.log(jsonString);

         let sortedList=JSON.parse(jsonString).sort(this.GetSortOrder("name"));
        this.setState({
            //allContacts:Array.prototype.push.apply(this.state.favContacts,JSON.parse(jsonString)) ,
            allContacts: [...this.state.myContacts, ...this.state.favContacts, ...sortedList],
            rootContacts: JSON.parse(jsonString),
            isLoading: false

        });


    }

    GetSortOrder(prop) {
        return function(a, b) {
            if (a[prop] > b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        }
    }


    onNumberChange = (number) => {
        this.setState({
            mobile: number
        });
        if (number.length === 0) {
            this.setState({contactName: ''});
        }
        if (number.length >= 3) {

        }
        if (number.length < 11) {
            this.setState({
                avater: '',
                isActive: false
            })
        }
        if (number.length === 11) {
            const contactLenght = number.replace(/[^0-9]/g, '').length;
            if (contactLenght === 11)
                this.setState({
                    validNumber: true, numberError: '', isActive: true,
                    contactItem: JSON.parse('{ "name" : "Unknown" , "number" : "' + number + '" , "thumbnail" : "","favorite" : false }')
                });
            if (this.state.validAmount) {
                this.setState({checked: true})
            } else {
                this.setState({checked: false})
            }
        } else if (number.length > 11) {
            this.setState({
                validNumber: false,
                checked: false,
                numberError: 'Please input a valid number',
                isActive: false,
                avater: ''
            });
        } else {
            this.setState({
                validNumber: false,
                checked: false,
                isActive: false
            });
        }
    };

    onAmountChange = (amount) => {
        this.setState({
            amount: amount.replace(/[^0-9]/g, ''),
        });
        if (amount.length === 0) {
            this.setState({amount: ''});
        }
        if (amount.length >= 3) {

        }

    };


    onClickRight = (number, screenName) => {

        if (number.length >= 11) {
            Keyboard.dismiss();
            if (screenName === 'MainScreen') {
                this.props.navigation.state.params.onGoBack(this.state.contactItem, '');
                this.props.navigation.goBack(null);
            }
            else
                this.props.navigation.navigate('TRANSFER_AMOUNT', {contactItem: this.state.contactItem});

        }


    };


    findContact(query) {
        if (this.state.isActive) {
            return [];
        }

        const {allContacts} = this.state;

        if (query === '') {
            return allContacts;
        }

        const regex = new RegExp(`${query.trim()}`, 'i');
        return allContacts.filter((item) => {
            return (item.number.search(regex) >= 0 || item.name.search(regex) >= 0)
        });

    }

    _onContactSelect(item, screenName) {
        finalMobile = "";
        mobile = JSON.stringify(item.number).replace(/[^0-9\.]+/g, "")
        if (mobile.length >= 11) {
            finalMobile = mobile.substring(mobile.length - 11, mobile.length);
        } else {
            finalMobile = "";
        }
        this.setState({
            mobile: finalMobile,
            isActive: true,
            avater: item.thumbnail,
            contactItem: JSON.parse('{ "name" : "' + item.name + '" , "number" : "' + finalMobile + '" , "thumbnail" : "' + item.thumbnail + '" }')
        });
        if (screenName === 'MainScreen') {
            this.props.navigation.state.params.onGoBack(JSON.parse('{ "name" : "' + item.name + '" , "number" : "' + finalMobile + '" , "thumbnail" : "' + item.thumbnail + '" }'), '');
            this.props.navigation.goBack(null);
        }
        else
            this.props.navigation.navigate('TRANSFER_AMOUNT', {contactItem: JSON.parse('{ "name" : "' + item.name + '" , "number" : "' + finalMobile + '" , "thumbnail" : "' + item.thumbnail + '" }')});

        console.log(item);
    }


    async onFavouriteItem(item) {
        const favContacts = await AsyncStorage.getItem('favContacts');
        let favContacObj = JSON.parse(favContacts);
        if (!favContacObj) {
            favContacObj = []
        }

        if (item.favorite === undefined) {
            if (!SendMoneyScreen.containsObject(item, favContacObj)) {
                let obj = Object.assign({}, item);
                obj.favorite = true;
                this.onSaveFavouriteItem(favContacObj.concat(obj));
                this.flatListRef.scrollToOffset({animated: true, offset: 0});
            } else {
                Alert.alert("your contact already on favorite");
            }

        } else {
            let filteredItems = this.removeItem(favContacObj, this.getPostionItem(item, favContacObj));
            this.onSaveFavouriteItem(filteredItems)

        }
    }

    static containsObject(obj, list) {
        let i;
        for (i = 0; i < list.length; i++) {
            if (list[i].number === obj.number) {
                return true;
            }
        }

        return false;
    }

    getPostionItem(obj, list) {
        let i;
        for (i = 0; i < list.length; i++) {
            if (list[i].number === obj.number) {
                return i + 1;
            }
        }

        return 0;

    }

    removeItem = (items, i) =>
        items.slice(0, i - 1).concat(items.slice(i, items.length));


    async onSaveFavouriteItem(favContacts) {
        await AsyncStorage.setItem('favContacts', JSON.stringify(favContacts))
            .then(() => {
                this.setState({
                    allContacts: [...this.state.myContacts, ...favContacts, ...this.state.rootContacts]
                });

            })
            .catch(() => {
            })

    }


    render() {
        let Profile_Image = '';
        const allContacts = this.findContact(this.state.mobile);
        const height = Dimensions.get('window').height;
        const {navigation} = this.props;
        const screenName = navigation.getParam('screen');

        return (
            <View style={{flex: 1, backgroundColor: '#F5F6F6'}}>
                <StatusBar backgroundColor={Color.statusBar}/>
                <DotLoader isVisibleLoader={this.state.isLoading}/>
                <View style={{
                    flex: 1,
                    backgroundColor: Color.toolbar,
                    // marginLeft: 10,
                    // marginRight: 10,
                    // marginTop: 10,
                    borderRadius: 8,
                    borderWidth: 1.7,
                    borderColor: '#F5F6F6'
                }}>
                    <View style={styles.container}>


                        <EditTextNext
                            placeholder='Enter name or number'
                            avater={this.state.avater}
                            lineWidth={.40}
                            value={this.state.mobile}
                            isActive={this.state.isActive}
                            keyboardType={Platform.OS === 'ios' ? 'name-phone-pad' : 'default'}
                            returnKeyType="next"
                            onChangeText={(mobile) => {
                                this.onNumberChange(mobile)
                            }}
                            operatorId={this.state.operator}
                            onClickRight={() => {
                                this.onClickRight(this.state.mobile, screenName);

                            }}
                            onClickLeft={() => {
                                Keyboard.dismiss();

                            }}
                        />


                        <FlatList
                            ref={(ref) => {
                                this.flatListRef = ref;
                            }}
                            keyboardShouldPersistTaps="always"
                            style={{borderColor: '#F5F6F6'}}
                            data={allContacts}
                            renderItem={({item}) => <ContactView title={item.name}
                                                                 number={JSON.stringify(item.number).replace(/[^0-9\.]+/g, "")}
                                                                 thumbnail={item.thumbnail}
                                                                 isFavorite={item.favorite}
                                                                 myContact={item.myContact}
                                                                 onClickItem={() => this._onContactSelect(item, screenName)}
                                                                 onFavouriteItem={() => this.onFavouriteItem(item)}/>
                            }
                            keyExtractor={(item, index) => index.toString()}
                            legacyImplementation={true}
                            maxToRenderPerBatch={50}
                            updateCellsBatchingPeriod={10}
                        />

                        <TempComponent
                            text={"dfmfdm"}
                        />
                    </View>


                </View>


            </View>
        );
    }
}

export default withNavigationFocus(SendMoneyScreen);
//export default SendMoneyScreen;
