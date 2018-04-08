import {
    Button,
    FlatList,
    Image,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import React from 'react';

class MatchesScreen extends React.Component {
    renderMatch(){
    }
    render() {
        let matches = [];
        let chats = [];
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <FlatList
                    style={{flex: 1}}
                    data={matches}
                    renderItem={({item}) => this.renderMatch(item)}
                    keyExtractor={(item, index) => index}
                    horizontal={true}
                />
                <FlatList
                    style={{flex: 4}}
                    data={chats}
                    renderItem={({item}) => this.renderMatch(item)}
                    keyExtractor={(item, index) => index}
                />
            </View>
        )
    }
}

export default MatchesScreen;
