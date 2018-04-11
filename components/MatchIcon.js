import {Image, Text, TouchableHighlight, View} from 'react-native';
import React from 'React';

class MatchIcon extends React.Component {
    render() {
        const photo = this.props.photo && this.props.photo.data;
        return (
            <TouchableHighlight
                onPress={this.props.gotoChat}
                key={this.props.chat._id}
            >
                <View>
                    <Text>
                        {this.props.match ? this.props.match.firstName : ''}
                    </Text>
                    <Image
                        style={{height: 100, width: 100}}
                        source={{uri: photo }}
                    />
                </View>
            </TouchableHighlight>
        );
    }
}

export default MatchIcon;
