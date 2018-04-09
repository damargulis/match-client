import {Text, TouchableHighlight, View} from 'react-native';
import React from 'React';

class MatchIcon extends React.Component {
    render() {
        return (
            <TouchableHighlight
                onPress={() => ({})}
                key={this.props.match._id}
            >
                <View>
                    <Text>{'Thisis a match'}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

export default MatchIcon;
