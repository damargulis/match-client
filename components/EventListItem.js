import { Button } from 'react-native';
import React from 'react';

class EventListItem extends React.Component {
    render() {
        return (
            <Button
                title={this.props.name}
                onPress={ () => this.props.onClick() }
            />
        );
    }
}

export default EventListItem;
