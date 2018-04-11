import { applyMiddleware, createStore } from 'redux';
import { Router, Scene, Stack } from 'react-native-router-flux';
import ChatScreenContainer from './components/ChatScreenContainer';
import CreateAccountScreenContainer from
    './components/CreateAccountScreenContainer';
import {createLogger} from 'redux-logger';
import EditInfoScreenContainer from './components/EditInfoScreenContainer';
import EditPhotosScreenContainer from './components/EditPhotosScreenContainer';
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
import UserDetailScreenContainer from './components/UserDetailScreenContainer';

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
                        <Stack key="loginScreenStack" >
                            <Scene key="loginScreen"
                                component={LoginScreenContainer}
                                initial={true}
                                hideNavBar={true}
                            />
                            <Scene key="createAccountScreen"
                                component={CreateAccountScreenContainer}
                            />
                        </Stack>
                        <Scene tabs key="appScreen" >
                            <Stack key="profileScreen" title="Profile">
                                <Scene
                                    component={ProfileScreenContainer}
                                    hideNavBar={true}
                                    initiial={true}
                                />
                                <Scene
                                    key="editInfoScreen"
                                    title="Edit Info"
                                    component={EditInfoScreenContainer}
                                />
                                <Scene
                                    key="editPhotosScreen"
                                    title="Edit Photos"
                                    component={EditPhotosScreenContainer}
                                />
                            </Stack>

                            <Stack
                                key="eventScreen"
                                initial={true}
                                title="Events"
                            >
                                <Scene
                                    component={EventScreen}
                                    hideNavBar={true}
                                    initial={true}
                                />
                                <Scene key="eventDetailScreen"
                                    component={EventDetailScreenContainer}
                                />
                            </Stack>
                            <Stack
                                key="swipeScreen"
                                title="Swipe"
                            >
                                <Scene
                                    component={SwipeScreenContainer}
                                    hideNavBar={true}
                                    initial={true}
                                />
                                <Scene key="userDetailScreen"
                                    component={UserDetailScreenContainer}
                                />
                            </Stack>
                            <Stack
                                key="matchesScreen"
                                title="Chat"
                            >
                                <Scene
                                    component={MatchesScreenContainer}
                                    hideNavBar={true}
                                    title="Chat"
                                />
                                <Scene key="chatScreen"
                                    component={ChatScreenContainer}
                                />
                                <Scene key="userDetailScreen"
                                    component={UserDetailScreenContainer}
                                />
                            </Stack>
                        </Scene>
                    </Scene>
                </Router>
            </Provider>
        );
    }
}

export default MainPage;
