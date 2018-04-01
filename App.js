import { Router, Scene } from 'react-native-router-flux';
import LoginScreen from './components/LoginScreen';
import React from 'react';
import Root from './components/Root';

class MainPage extends React.Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="loginScreen"
                        component={LoginScreen}
                        animation='fade'
                        hideNavBar={true}
                        initiail={true}
                    />
                    <Scene key="appScreen"
                        component={Root}
                        animation='fade'
                        hideNavBar={true}
                    />
                </Scene>
            </Router>
        );
    }
}

export default MainPage;
