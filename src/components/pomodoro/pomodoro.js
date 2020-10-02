import React from 'react';
import Clock from '../clock/clock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './pomodoro.css';


class PomodoroClock extends React.Component {
    //The only thing i want to render here to the clock
    //Is the hours and the minutes
    renderClock = (timer, classClock, nameTimer) => {
        return <Clock timer={timer} class={classClock} nameTimer={nameTimer} />;
    }

    render() {
        return(
            <div id="board-container">
                <div id="title-pomodoro">
                    <h1>Pomodoro Clock</h1>
                </div>
                <div id="break-and-session">
                    <div id="break">
                        <p className="p-break-session">Break Length</p>
                        <div>
                            <FontAwesomeIcon 
                                className="icon" 
                                icon={faArrowDown} 
                                onClick={this.props.breakDecrement} 
                            />
                            <span className="span-break-session">{this.props.breakLength}</span>
                            <FontAwesomeIcon 
                                className="icon" 
                                icon={faArrowUp} 
                                onClick={this.props.breakIncrement} 
                            />
                        </div>
                    </div>
                    <div id="session">
                        <p className="p-break-session">Session Length</p>
                        <div>
                            <FontAwesomeIcon 
                                className="icon" 
                                icon={faArrowDown} 
                                onClick={this.props.sessionDecrement} 
                            />
                            <span className="span-break-session">{this.props.sessionLength}</span>
                            <FontAwesomeIcon 
                                className="icon" 
                                icon={faArrowUp} 
                                onClick={this.props.sessionIncrement} 
                            />
                        </div>
                    </div>
                </div>
                <div id="clock-container">
                    {this.renderClock(this.props.timer, this.props.classClock, this.props.nameTimer)}
                </div>
            </div>
        );
    }
}

//To export the PomodoroClock
export default PomodoroClock;