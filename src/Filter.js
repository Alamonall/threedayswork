import React, {useEffect, useState} from 'react';
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
        "flex-flow": "column wrap"
    },
    buttons: {
        alignItems: 'right'
    },
}));

export default function MyExpansionPanel(props) {
    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [website, setWebsite] = useState("");

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
                        <TextField className={classes.input} id="standard-basic" label="username"
                                   value={username}
                                   onChange={((e)=>{setUsername(e.target.value)})}
                        />
                        <TextField className={classes.input} id="standard-basic" label="website"
                                   value={website}
                                   onChange={((e)=>{setWebsite(e.target.value)})}
                                   />

                        <Button  className={classes.buttons}
                                 onClick={()=>{props.updateDate(username, website)}}
                                 variant="contained"
                                 color="primary"
                                 >
                            Apply
                        </Button>
                        <Button className={classes.buttons}
                                onClick={()=>{props.updateDate('', '')}}
                                variant="contained"
                                color="secondary"
                        >
                            Close
                        </Button>
                    </form>

                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}
