import React from 'react';
import './clock.css';


//This is a clock hook, to represent a clock couting down
function Clock(props) {
    return(
        <div className={props.class}>
            <p>{props.nameTimer}</p>
            <span>{props.timer}</span>
        </div>
    );
}

export default Clock;
