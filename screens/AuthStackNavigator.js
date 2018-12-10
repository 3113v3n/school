import { createStackNavigator} from 'react-navigation';
import UserScreen from '../screens/UserScreen';
import Dropdown from '../components/Dropdown';
import UserBottomTab from '../navigation/UserBottomTab';
import GtaskerBottomTab from '../navigation/GtaskerBottomTab';
import {userStack} from '../navigation/MainTabNavigator';
import {TaskerStack} from '../navigation/MainTabNavigator';


export const UserPage = createStackNavigator({
userscreen:UserBottomTab,
components:userStack

},{headerMode:'none'})

export const TaskerPage = createStackNavigator({
    //gtasker:Dropdown,
taskerscreen: GtaskerBottomTab,
components:TaskerStack
},{headerMode:'none'})
export default AuthStackNavigator = createStackNavigator({
    userLogin:UserScreen,
     gtasker: Dropdown,
    UserScreen: UserPage,
   GtaskerScreen: TaskerPage,

},{headerMode:'none'})