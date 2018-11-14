import { createStackNavigator} from 'react-navigation';
import UserScreen from '../screens/UserScreen';
import Dropdown from '../components/Dropdown';

export default AuthStackNavigator = createStackNavigator({
    home: UserScreen,
    gtasker: Dropdown,
})