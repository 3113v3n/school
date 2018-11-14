import {AppRegistry} from 'react-native';
import React from 'react';

import {Provider} from 'react-redux';
import {createStore} from 'redux';

import rootReducer from './store/reducers';
import TaskManagerComponent from './components/tasks/taskManagerComponent';



let store = createStore(rootReducer);

const App =() => (//wrap JSX code <provider receives store property stored in store const
    <Provider store={store}>
        <TaskManagerComponent/>
    </Provider>
);

AppRegistry.registerComponent('gawatask', ()=> App );
