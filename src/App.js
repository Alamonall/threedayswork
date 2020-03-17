import React, {useEffect, useState} from 'react';
import './App.css';
import MyExpansionPanel from './Filter'
import MyTable from "./Table";
import {makeStyles} from "@material-ui/core/styles";

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

    header: {
        "background-color": "aquamarine",
        height: "100px"
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
    const [username, setUsername] = useState();
    const [website, setWebsite] = useState();

    const updateDate = (username, website) => {
        setUsername(username);
        setWebsite(website);
        fetch("https://jsonplaceholder.typicode.com/users" + (username ? "?username="+username : '') + (website ? "&website="+website : ''))
            .then(response => response.json())
            .then(data => {
                setTimeout(setTasks, 5000, data);
            });
    };

    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => {
                setTimeout(setTasks, 5000, data);
            });

    },[]);

    const [tasks,setTasks] = useState([]);

  return (
    <div className="App">
      <header className={classes.header}>
          <h1>Header</h1>
      </header>
        <div className={classes.hrBoxes}>
            <MyExpansionPanel className={classes.hrBox} updateDate={updateDate} />
            <MyTable className={classes.hrBox} tasks={tasks} /*возможно не стоит передавать весь tasks, а только необходимые компоненты name, username, website, mail*//>
        </div>
    </div>
  );
}
