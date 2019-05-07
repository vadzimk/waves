import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'

class CollapseRadio extends React.Component {

    state = {
        open: false,
        value: '0'
    };

    componentDidMount() {
        if (this.props.initState) {
            this.setState({
                open: this.props.initState
            })
        }
    }

    handleClick = () => {
        this.setState({
            open: !this.state.open
        })
    };

    handleAngle = () => (
        <FontAwesomeIcon
            icon={this.state.open ? faAngleUp : faAngleDown}
            className="icon"
        />

    );

    handleChange = (event) => {
        //receives an event that contains an id of the element

        this.props.handleFilters(event.target.value);
        this.setState({value: event.target.value});

    };

    renderList = () => (
        this.props.list ?
            this.props.list.map(value => (
                <FormControlLabel
                    key={value._id}
                    value={`${value._id}`}
                    label={value.name}
                    control={<Radio/>}/>
            ))
            : null
    );

    render() {
        return (
            <div>
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
                            <RadioGroup
                                aria-label="prices"
                                name="prices"
                                value={this.state.value}
                                onChange={this.handleChange}
                            >
                                {this.renderList()}

                            </RadioGroup>

                        </List>
                    </Collapse>

                </List>
            </div>
        );
    }
}

export default CollapseRadio;