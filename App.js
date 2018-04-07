import { applyMiddleware, createStore } from 'redux';
import { Router, Scene, Stack } from 'react-native-router-flux';
import {createLogger} from 'redux-logger';
import EventDetailScreenContainer from
    './components/EventDetailsScreenContainer';
import EventScreenNew from './components/EventScreenNew';
import LoginScreenContainer from './components/LoginScreenContainer';
import { Provider } from 'react-redux';
import React from 'react';
//import Root from './components/Root';

import rootReducer from './reducers';

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
                            initiail={true}
                        />
                        <Stack>
                            <Scene key="appScreen"
                                component={EventScreenNew}
                                animation='fade'
                                hideNavBar={true}
                            />
                            <Scene key="eventDetailScreen"
                                component={EventDetailScreenContainer}
                                animation='fade'
                            />
                        </Stack>
                    </Scene>
                </Router>
            </Provider>
        );
    }
}

export default MainPage;
