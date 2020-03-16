import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function MyTable(props) {
    const classes = useStyles();
    const tasks = props.tasks;

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Username</TableCell>
                        <TableCell align="right">@mail</TableCell>
                        <TableCell align="right">website</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map(task => (
                        <TableRow key={task.name}>
                            <TableCell component="th" scope="row">
                                {task.name}
                            </TableCell>
                            <TableCell align="right">{task.username}</TableCell>
                            <TableCell align="right">{task.email}</TableCell>
                            <TableCell align="right">{task.website}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
