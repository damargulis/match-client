import { Switch, Text, View } from 'react-native';
import { EventFilters } from '../actions';
import React from 'react';

class EventFilter extends React.Component {
    render() {
        const value = this.props.eventFilter === EventFilters.SHOW_ALL;
        const toggleFilter = value
            ? EventFilters.SHOW_ATTENDING : EventFilters.SHOW_ALL;
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    height: 30,
                }}
            >
                <Text>My Events</Text>
                <Switch
                    value={value}
                    onValueChange={
                        () => this.props.setEventFilter(toggleFilter)
                    }
                />
                <Text>All Events</Text>
            </View>
        );
    }
}

export default EventFilter;
