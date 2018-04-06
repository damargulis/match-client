import { Router, Scene } from 'react-native-router-flux';
import { createStore } from 'redux';
import EventScreenNew from './components/EventScreenNew';
import LoginScreen from './components/LoginScreen';
import { Provider } from 'react-redux';
import React from 'react';
//import Root from './components/Root';

import rootReducer from './reducers';

const store = createStore(rootReducer);

class MainPage extends React.Component {
    render() {
        return (
            <Provider store={store} >
                <Router>
                    <Scene key="root">
                        <Scene key="loginScreen"
                            component={LoginScreen}
                            animation='fade'
                            hideNavBar={true}
                            initiail={true}
                        />
                        <Scene key="appScreen"
                            component={EventScreenNew}
                            animation='fade'
                            hideNavBar={true}
                        />
                    </Scene>
                </Router>
            </Provider>
        );
    }
}

export default MainPage;
