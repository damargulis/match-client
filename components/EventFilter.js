import React from 'react';
import { EventFilters } from '../actions';
import { Switch, Text, View } from 'react-native';

class EventFilter extends React.Component {
    render() {
        const value = this.props.eventFilter === EventFilters.SHOW_ALL;
        const toggleFilter = value ? EventFilters.SHOW_ATTENDING : EventFilters.SHOW_ALL;
        console.log(this.props);
        console.log(toggleFilter);
        return (
            <View>
                <Text>My Events</Text>
                <Switch
                    value={value}
                    onValueChange={() => this.props.setEventFilter(toggleFilter)}
                />
                <Text>All Events</Text>
            </View>
        )
    }
}

export default EventFilter;
