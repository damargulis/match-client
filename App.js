import React from 'react';
import LoginScreen from './components/LoginScreen';
import Root from './components/Root';
import { Router, Scene, Actions } from 'react-native-router-flux';

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
                
        )
    }
}

export default MainPage;
