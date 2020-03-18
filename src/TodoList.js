import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },

    progressBar: {
        width: '100%',
        position: "relative"
    }
});

export default function TodoList(props) {
    debugger;
    const classes = useStyles();
    //const [tasks, setTasks] = useState(props.tasks);

    const tasks = props.tasks;

    const dataSearch = (e) =>{
        const value = e.target.value.toLowerCase();
        const newTask = tasks.filter(task=> {
            return task.title.toLowerCase().includes(value);
        });
       // setTasks(newTask);
    };

    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
        >
            <DialogTitle>Задачи</DialogTitle>
            <DialogContent>
                <TableContainer component={Paper}>
                    <div>
                        <Button>{'Всего - ' + (!!tasks ? tasks.length : 0)}</Button>
                        <Button>{'В работе - ' + (!!tasks ? tasks.filter(task => task.completed).length : 0)}</Button>
                        <Button>{'Завершено - ' + (!!tasks ? tasks.filter(task => !task.completed).length : 0)} </Button>
                    </div>
                    <form >
                        <input
                                type="text"
                                className="form-control"
                                placeholder="Search task by description..."
                                onChange={dataSearch}/>
                    </form>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Название</TableCell>
                                <TableCell align="right">Статус</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(!props.Load && tasks.length > 0) ? tasks.map(task => (
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
                                )) : <LinearProgress className={classes.progressBar}/> //Сделать нормальое отображение загрузки
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
