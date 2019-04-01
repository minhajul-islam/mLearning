import Autocomplete from '../src/Autocomplete';
import React, {Component} from 'react';
import ContactView from '../src/ContactView';
import contacts from '../src/contact';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';


class ContactSearch extends Component {


    constructor(props) {
        super(props);
        this.state = {
            contacts: [{
                "name": "minhaj",
                "number": "01515-272948",
                "thumbnail": ""
            },
                {
                    "name": "korim",
                    "number": "01768-386145",
                    "thumbnail": ""
                },
                {
                    "name": "rohime",
                    "number": "+880 1841-016216",
                    "thumbnail": ""
                }
                ,
                {
                    "name": "korim",
                    "number": "01768-386145",
                    "thumbnail": ""
                },
                {
                    "name": "rohime",
                    "number": "+880 1841-016216",
                    "thumbnail": ""
                }
                ,
                {
                    "name": "korim",
                    "number": "01768-386145",
                    "thumbnail": ""
                },
                {
                    "name": "rohime",
                    "number": "+880 1841-016216",
                    "thumbnail": ""
                }
                ,
                {
                    "name": "korim",
                    "number": "01768-386145",
                    "thumbnail": ""
                },
                {
                    "name": "rohime",
                    "number": "+880 1841-016216",
                    "thumbnail": ""
                }
                ,
                {
                    "name": "korim",
                    "number": "01768-386145",
                    "thumbnail": ""
                },
                {
                    "name": "rohime",
                    "number": "+880 1841-016216",
                    "thumbnail": ""
                }
                ,
                {
                    "name": "korim",
                    "number": "01768-386145",
                    "thumbnail": ""
                },
                {
                    "name": "rohime",
                    "number": "+880 1841-016216",
                    "thumbnail": ""
                }
                ,
                {
                    "name": "korim",
                    "number": "01768-386145",
                    "thumbnail": ""
                },
                {
                    "name": "rohime",
                    "number": "+880 1841-016216",
                    "thumbnail": ""
                }
                ,
                {
                    "name": "korim",
                    "number": "01768-386145",
                    "thumbnail": ""
                },
                {
                    "name": "rohime",
                    "number": "+880 1841-016216",
                    "thumbnail": ""
                }
                ,
                {
                    "name": "korim",
                    "number": "01768-386145",
                    "thumbnail": ""
                },
                {
                    "name": "rohime",
                    "number": "+880 1841-016216",
                    "thumbnail": ""
                }
                ,
                {
                    "name": "korim",
                    "number": "01768-386145",
                    "thumbnail": ""
                },
                {
                    "name": "rohime",
                    "number": "+880 1841-016216",
                    "thumbnail": ""
                }
                ,
                {
                    "name": "korim",
                    "number": "01768-386145",
                    "thumbnail": ""
                },
                {
                    "name": "rohime",
                    "number": "+880 1841-016216",
                    "thumbnail": ""
                }
                ,
                {
                    "name": "korim",
                    "number": "01768-386145",
                    "thumbnail": ""
                },
                {
                    "name": "rohime",
                    "number": "+880 1841-016216",
                    "thumbnail": ""
                }
                ,
                {
                    "name": "korim",
                    "number": "01768-386145",
                    "thumbnail": ""
                },
                {
                    "name": "rohime",
                    "number": "+880 1841-016216",
                    "thumbnail": ""
                }
                ,
                {
                    "name": "korim",
                    "number": "01768-386145",
                    "thumbnail": ""
                },
                {
                    "name": "rohime",
                    "number": "+880 1841-016216",
                    "thumbnail": ""
                }
                ,
                {
                    "name": "korim",
                    "number": "01768-386145",
                    "thumbnail": ""
                },
                {
                    "name": "rohime",
                    "number": "+880 1841-016216",
                    "thumbnail": ""
                }
                ,
                {
                    "name": "korim",
                    "number": "01768-386145",
                    "thumbnail": ""
                },
                {
                    "name": "rohime",
                    "number": "+880 1841-016216",
                    "thumbnail": ""
                }
                ],
            query: ''
        };
    }

    componentDidMount() {
       // get contact
    }

    findContact(query) {
        if (query === '') {
            return [];
        }

        const {contacts} = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return contacts.filter(contact => contact.name.search(regex) >= 0);
    }

    getContact(item) {
        this.setState({query: item})
    }

    render() {
        const {query} = this.state;
        const contacts = this.findContact(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

        return (
            <View style={styles.container}>
                <Autocomplete
                    autoCapitalize="none"
                    autoCorrect={false}
                    listStyle={{height:200}}
                    containerStyle={styles.autocompleteContainer}
                    data={contacts.length === 1 && comp(query, contacts[0].name) ? [] : contacts}
                    defaultValue={query}
                    onChangeText={text => this.setState({query: text})}
                    placeholder="Enter Star Wars film title"
                    renderItem={({name}) => (
                        <ContactView title={'Minhajul isalm'}
                                     number={'01162616216'}
                                     thumbnail={''}
                                     onClickItem={() => this.getContact(name)}/>
                    )}
                />
                <View style={styles.descriptionContainer}>
                    <Image
                        source={{uri: "https://www.livedigi.com/uploaded/untitled%20folder/Topup%20Online.png"}}
                        style={{width: 200, height: 300}}
                    />


                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        paddingTop: 25
    },
    autocompleteContainer: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    },
    itemText: {
        fontSize: 15,
        margin: 2
    },
    descriptionContainer: {
        // `backgroundColor` needs to be set otherwise the
        // autocomplete input will disappear on text input.
        backgroundColor: '#F5FCFF',
        marginTop: 25
    },
    infoText: {
        textAlign: 'center'
    },
    titleText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    directorText: {
        color: 'grey',
        fontSize: 12,
        marginBottom: 10,
        textAlign: 'center'
    },
    openingText: {
        textAlign: 'center'
    }

});

export default ContactSearch;