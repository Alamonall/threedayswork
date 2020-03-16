import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Button, ButtonGroup, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,Typography} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    inputs: {
        display: "flex",
        "flex-flow": "row wrap"
    },
    input: {
        flex: "200px",
        padding: "10px",
        margin: "10px"

    },
    buttons: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'right'
    },
}));




export default function MyExpansionPanel(props) {
    const classes = useStyles();

    return (
        <ExpansionPanel /*disabled*/>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
            >
                <Typography className={classes.heading}>Disabled Expansion Panel</Typography>
            </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        <form noValidate autoComplete="off" className={classes.inputs}>
                            <TextField className={classes.input} id="standard-basic" label="username"/>
                            <TextField className={classes.input} id="standard-basic" label="website"/>
                        </form>
                        <div className={classes.buttons}>
                            <ButtonGroup color="primary" aria-label="outlined primary button group">
                                <Button onClick={props.onFilterClick} value={props.title} >Apply</Button>
                                <Button>Close</Button>
                            </ButtonGroup>
                        </div>
                    </Typography>
                </ExpansionPanelDetails>

        </ExpansionPanel>
    );
}
