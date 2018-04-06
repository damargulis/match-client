import React from 'react';
import { Button } from 'react-native';

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
