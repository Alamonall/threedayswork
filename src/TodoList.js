import React, {useReducer, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from "@material-ui/core/LinearProgress";
import {BottomNavigation, TextField , BottomNavigationAction } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },

    progressBar: {
        width: '100%',
        position: 'absolute'
    },

    dialog: {
        'flex-wrap': 'wrap',
        width: '600px'
    }
}));

export default function TodoList(props) {
    debugger;
    const classes = useStyles();
    const [filters, setFilter] = useState('');

    const dataSearch = (e) =>{
        const value = e.target.value.toLowerCase();
        const newTask = props.tasks.filter(task=> {
            return task.title.toLowerCase().includes(value);
        });
        setFilter(newTask);
    };

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="simple-dialog-title"
            className={classes.dialog}
        >
            <DialogTitle id="simple-dialog-title">Задачи</DialogTitle>
            <DialogContent>
                <div>
                    {filters ?
                        <BottomNavigation>
                            <BottomNavigationAction label={'Всего - ' + filters.length} showLabel={true}/>
                            <BottomNavigationAction label={'В работе - ' + filters.filter(f => f.completed).length}
                                                    showLabel={true}/>
                            <BottomNavigationAction
                                label={'Завершено - ' + filters.filter(f => !f.completed).length} showLabel={true}/>
                        </BottomNavigation>
                        :
                        <BottomNavigation>
                            <BottomNavigationAction label={'Всего - ' + props.tasks.length} showLabel={true}/>
                            <BottomNavigationAction
                                label={'В работе - ' + props.tasks.filter(f => f.completed).length}
                                showLabel={true}/>
                            <BottomNavigationAction
                                label={'Завершено - ' + props.tasks.filter(f => !f.completed).length}
                                showLabel={true}/>
                        </BottomNavigation>
                    }
                </div>
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                        <TextField
                        id="standard-read-only-input"
                        variant="outlined"
                        onChange={dataSearch}
                        />
                    </div>
                </form>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Название</TableCell>
                                <TableCell align="right">Статус</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {!props.Load ?
                                (filters ?
                                    filters.map(filtr => (
                                        <TableRow key={filtr.id}>
                                            <TableCell component="th" scope="row">
                                                {filtr.title}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Checkbox
                                                    checked={filtr.completed}
                                                    /*Не стал делать onChange, так как мы не куда не грузим инфу*/
                                                    value="primary"
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )) :
                                    props.tasks.map(task => (
                                        <TableRow key={task.id}>
                                            <TableCell component="th" scope="row">
                                                {task.title}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Checkbox
                                                    checked={task.completed}
                                                    /*Не стал делать onChange, так как мы не куда не грузим инфу*/
                                                    value="primary"
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )
                                : <LinearProgress className={classes.progressBar}/> //Сделать нормальое отображение загрузки
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    props.handleClose()
                }} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
