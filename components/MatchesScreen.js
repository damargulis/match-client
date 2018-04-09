import {
    FlatList,
    View,
} from 'react-native';
import MatchIconContainer from './MatchIconContainer';
import React from 'react';

class MatchesScreen extends React.Component {
    renderMatch(match){
        return (
            <MatchIconContainer match={match} />
        );
    }

    render() {
        const { matches, chats } = this.props;
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
        );
    }
}

export default MatchesScreen;
