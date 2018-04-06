import { connect } from 'react-redux';
import EventFilter from './EventFilter';
import { setEventFilter } from '../actions';

//const mapStateToProps = state => ({
//    eventFilter: state.filter
//});
const mapStateToProps = (state) => {
    return {
        eventFilter: state.visibilityFilter
    }
}

//const mapDispatchToProps = dispatch => ({
//    setEventFilter: filter => dispatch(setEventFilter(filter))
//});
const mapDispatchToProps = (dispatch) => {
    console.log('map dispatch to props');
    return {
        setEventFilter: (filter) => {
            console.log('in dispatch');
            console.log(filter);
            return dispatch(setEventFilter(filter));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventFilter);
