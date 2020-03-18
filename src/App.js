import React, {useEffect, useState} from 'react';
import MyExpansionPanel from './Filter'
import MyTable from "./Table";
import {makeStyles} from "@material-ui/core/styles";
import TodoList from "./TodoList";

const useStyles = makeStyles( {
    hrBoxes: {
        display: "flex",
       "flex-flow": "column wrap"
    },

    hrBox: {
        flex: "200px",
        padding: "10px",
        margin: "10px"
    },

    h1: {
        "text-align": "center",
        color: "white",
        "line-height": "100px",
        margin: "0"
    },
    p: {
        padding: "10px",
        margin: "10px"
    }
});

export default function App() {
    const classes = useStyles();
    const [isLoading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    //Промежуточный обработчик для лоадера
    const loadIsnt = (func, data) =>{
        setLoading(false);
        func(data);
    };

    //получение списка пользователей
    useEffect(()=>{
        setLoading(true);
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => {
                setTimeout(loadIsnt(setUsers, data), 3000);
            });
    },[]);

    //филтрация списка пользователей на основе фильтра
    const updateData = (username, website) => {
        setLoading(true);
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => {
                setTimeout(filterUsers(data, username, website), 3000);
            });
    };

    const filterUsers = (users, username, website) => {
        const filteredUsers = users.filter(user => user.username.toLowerCase().includes((username ? username.toLowerCase() : user.username.toLowerCase()))
            && user.website.toLowerCase().includes((website ? website.toLowerCase() : user.website.toLowerCase())));
        loadIsnt(setUsers, filteredUsers);
    };

    const [open, setOpen] = useState(false);
    const [tasks, setTasks] = useState([]);

    //получение задач пользователя для модального окна
    const handleClickOpen = (userid) => {
        setLoading(true);
        fetch("https://jsonplaceholder.typicode.com/todos?userId=" + userid)
            .then(response => response.json())
            .then(data => {
                //setTimeout(loadIsnt(setTasks,data),3000);
                setTimeout(loadIsnt(setTasks,data),3000);
            });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTasks([]);
    };

  return (
    <div className="App">
        <div className={classes.hrBoxes}>
            <MyExpansionPanel className={classes.hrBox}
                              updateData={updateData}
                              Load={isLoading}
            />
            <MyTable className={classes.hrBox}
                     users={users} /*возможно не стоит передавать весь объект, а только необходимые компоненты name, username, website, mail*/
                     handleClickOpen={handleClickOpen}
                     Load={isLoading}
            />
            <TodoList open={open}
                      handleClose={handleClose}
                      Load={isLoading}
                      tasks={tasks}
            />
        </div>
    </div>
  );
}
