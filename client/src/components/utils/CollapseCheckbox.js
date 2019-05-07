import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

//arrow up:
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
//arrow down:
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

//from https://material-ui.com/demos/lists/
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
// end from
import Collapse from '@material-ui/core/Collapse';

class CollapseCheckbox extends React.Component {

    //decide when the component is expanded(open) an when it is collapsed
    //checked is an array of checked boxes
    state = {
        open: false,
        checked: [],
    };

    componentDidMount() {
        if (this.props.initState) {
            this.setState({
                open: this.props.initState,
            });
        }
    }

    handleClick = () => {
        this.setState({
            open: !this.state.open,
        })
    };

    handleAngle = () => (
        <FontAwesomeIcon
            icon={this.state.open ? faAngleUp : faAngleDown}
            className="icon"
        />

    );

    handleToggle = (value_id) => () => {
        const checked = this.state.checked;
        const currentIndex = checked.indexOf(value_id);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value_id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({
            checked: newChecked,
        }, ()=>{this.props.handleFilters(newChecked)})
    };

    renderList = () => (
        //grab the list of products from the redux store and create text and checkbox
        this.props.list ?
            this.props.list.map((value) => (
                <ListItem
                    key={value._id}
                    style={{padding: "10px 0"}}
                >
                    <ListItemText
                        primary={value.name}
                    />
                    <ListItemSecondaryAction>
                        <Checkbox
                            color="primary"
                            onChange={this.handleToggle(value._id)}
                            checked={this.state.checked.indexOf(value._id) !== -1}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            ))
            : null
    );


    render() {
        return (
            <div className="collapse_items_wrapper">
                <List style={{borderBottom: '1px solid #dbdbdb'}}>
                    <ListItem
                        onClick={this.handleClick}
                        style={{padding: '1px 23px 10px 0'}}
                    >
                        <ListItemText
                            primary={this.props.title} /*the title*/
                            className="collapse_title"
                        />
                        {this.handleAngle()}
                    </ListItem>
                    <Collapse
                        in={this.state.open}/*the state of collapse:yes or no*/
                        timeout="auto"
                        unmountOnExit
                    >
                        <List
                            component="div"
                            disablePadding
                        >
                            {this.renderList()}
                        </List>
                    </Collapse>

                </List>

            </div>
        );
    }
}


export default CollapseCheckbox;