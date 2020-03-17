import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    progressBar: {
        width: '100%',
        position: "absolute"
    }
});

export default function MyTable(props) {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table" >
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Username</TableCell>
                        <TableCell align="right">@mail</TableCell>
                        <TableCell align="right">website</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {!props.Load ? props.users.map(user => (
                        <TableRow key={user.id}>
                            <TableCell component="th" scope="row">
                                <Button onClick={() => {props.handleClickOpen(user.id)}} >
                                    {user.name}
                                </Button>
                            </TableCell>
                            <TableCell align="right">{user.username}</TableCell>
                            <TableCell align="right">{user.email}</TableCell>
                            <TableCell align="right">{user.website}</TableCell>
                        </TableRow>
                    )) : <LinearProgress className={classes.progressBar}/>}}

                </TableBody>
            </Table>
        </TableContainer>
    );
}
