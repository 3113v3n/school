
import AddComponent from '../AddComponent';
import { addNewTask } from '../../store/actions';
import { connect } from 'react-redux';
const mapStateToProps = state => {//convert component state =>props && connect to container
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {// map dispatch to props
    return {
        onClickAdd: (param) => {                        
            dispatch(addNewTask(param));
        }
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(AddComponent);