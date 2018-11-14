

import { connect } from 'react-redux';
import TaskListComponent from '../TaskLIstComponent';

const mapStateToProps = (state) => {
    //alert(`state send to task list = ${JSON.stringify(state)}`);
    return {
        tasks: !state.tasksReducers ? [] : state.tasksReducers//states in your reducers
    }
};

const TaskListContainer = connect(mapStateToProps)(TaskListComponent);
export default TaskListContainer;