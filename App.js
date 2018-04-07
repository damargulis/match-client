import { applyMiddleware, createStore } from 'redux';
import { Router, Scene, Stack } from 'react-native-router-flux';
import {createLogger} from 'redux-logger';
import EventDetailScreenContainer from
    './components/EventDetailsScreenContainer';
import EventScreen from './components/EventScreen';
import LoginScreenContainer from './components/LoginScreenContainer';
import MatchesScreenContainer from './components/MatchesScreenContainer';
import ProfileScreenContainer from './components/ProfileScreenContainer';
import { Provider } from 'react-redux';
import React from 'react';
import rootReducer from './reducers';
import SwipeScreenContainer from './components/SwipeScreenContainer';

import thunkMiddleware from 'redux-thunk';

const loggerMiddleware = createLogger();

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
    ),
);

class MainPage extends React.Component {
    render() {
        return (
            <Provider store={store} >
                <Router>
                    <Scene key="root"
                        hideNavBar={true}
                    >
                        <Scene key="loginScreen"
                            component={LoginScreenContainer}
                            animation='fade'
                            initial={true}
                        />
                        <Scene tabs key="appScreen" >
                            <Scene key="profileScreen"
                                component={ProfileScreenContainer}
                                hideNavBar={true}
                            />
                            <Stack key="eventScreen" initial={true}>
                                <Scene
                                    component={EventScreen}
                                    animation='fade'
                                    hideNavBar={true}
                                    initial={true}
                                />
                                <Scene key="eventDetailScreen"
                                    component={EventDetailScreenContainer}
                                    animation='fade'
                                />
                            </Stack>
                            <Scene
                                key="swipeScreen"
                                component={SwipeScreenContainer}
                                hideNavBar={true}
                            />
                            <Scene
                                key="matchesScreen"
                                component={MatchesScreenContainer}
                                hideNavBar={true}
                            />
                        </Scene>
                    </Scene>
                </Router>
            </Provider>
        );
    }
}

export default MainPage;
