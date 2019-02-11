import { connect } from 'react-redux';
import { toggleTask } from '../actions';
import TaskItemComponent from '../TaskITemComponent';


const TaskItemContainer = connect()(TaskItemComponent);
export default TaskItemContainer;
