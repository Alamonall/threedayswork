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
    const [tasks,setTasks] = useState([]);
    useEffect(()=>{
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => {
                setTasks(data);
            });

    },[]);

    function handleFilterClick(evt){
        alert(evt.target.value)
    }

  return (
    <div className="App">
      <header className={classes.header}>
          <h1>Header</h1>
      </header>
        <div className={classes.hrBoxes}>
            <MyExpansionPanel className={classes.hrBox} onFilterClick={handleFilterClick}/>
            <MyTable className={classes.hrBox} tasks={tasks} /*возможно не стоит передавать весь tasks, а только необходимые компоненты name, username, website, mail*//>
        </div>
    </div>
  );
}
