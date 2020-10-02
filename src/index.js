import React from 'react';
import ReactDOM from 'react-dom';
import PomodoroClock from './components/pomodoro/pomodoro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faRetweet } from '@fortawesome/free-solid-svg-icons';
import './index.css';

class PomodoroBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionLength: 25,
            breakLength: 5,
            isBreak: false,
            timer: 1500,
            intervalID: ""
        };
    }

    //This function is to decrement the sessionLength 
    decrementSessionLength = () => {
        if (this.state.sessionLength > 1 && !this.state.intervalID && !this.state.isBreak) {
            this.setState({ 
                sessionLength: this.state.sessionLength - 1, 
                timer: (this.state.sessionLength * 60) - 60
            });
        }

        if (this.state.sessionLength > 1 && !this.state.intervalID && this.state.isBreak) {
            this.setState({ 
                sessionLength: this.state.sessionLength - 1
            });
        }
    }

    //This function is to increment the sessionLength
    incrementSessionLength = () => {
        if (this.state.sessionLength < 60 && !this.state.intervalID && !this.state.isBreak) {
            this.setState({ 
                sessionLength: this.state.sessionLength + 1,
                timer: (this.state.sessionLength * 60) + 60
            });
        }

        if (this.state.sessionLength < 60 && !this.state.intervalID && this.state.isBreak) {
            this.setState({ 
                sessionLength: this.state.sessionLength + 1
            });
        }
    }

    //This function is to decrement the breakLength 
    decrementBreakLength = () => {
        if (this.state.breakLength > 1 && !this.state.intervalID && this.state.isBreak) {
            this.setState({ 
                breakLength: this.state.breakLength - 1,
                timer: (this.state.breakLength * 60) - 60
            });
        }

        if (this.state.breakLength > 1 && !this.state.intervalID && !this.state.isBreak) {
            this.setState({ 
                breakLength: this.state.breakLength - 1
            });
        }
    }

    //This function is to increment the breakLength
    incrementBreakLength = () => {
        if (this.state.breakLength < 60 && !this.state.intervalID && this.state.isBreak) {
            this.setState({ 
                breakLength: this.state.breakLength + 1,
                timer: (this.state.breakLength * 60) + 60
            });
        }

        if (this.state.breakLength < 60 && !this.state.intervalID && !this.state.isBreak) {
            this.setState({ 
                breakLength: this.state.breakLength + 1
            });
        }
    }

    //This is the interval for the session decrement
    intervalTimer = () => {
        if (!this.state.intervalID) {
            this.setState({
                intervalID: setInterval(() => {
                    this.setState({
                        timer: this.state.timer - 1
                    });
                }, 1000)
            });
        }else {
            this.setState({
                intervalID: clearInterval(this.state.intervalID)
            });
        }
    }

    // Clockify function
    clokify() {
        let minutes = Math.floor(this.state.timer / 60);
        let seconds = this.state.timer - minutes * 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return minutes + ':' + seconds;
    }

    //This function is to show the minutes and seconds
    swapAndClokify = () => {
        if (this.state.timer) {
            return this.clokify();
        }else if (this.state.timer === 0 && !this.state.isBreak) {
            this.setState({
                isBreak: true,
                timer: this.state.breakLength * 60
            });
            return this.clokify();
        }else if (this.state.timer === 0 && this.state.isBreak) {
            this.setState({
                isBreak: false,
                timer: this.state.sessionLength * 60
            });
            return this.clokify();
        }
    }

    //This is the reset function, to reset all the values in the state
    reset = () => {
        this.setState({
            sessionLength: 25,
            breakLength: 5,
            isSession: true,
            timer: 1500,
            intervalID: clearInterval(this.state.intervalID)
        });
    }

    render() {
        return(
            <div id="main-container">
                <div id="pomodoroclock-container">
                    <PomodoroClock 
                        breakLength={this.state.breakLength}
                        sessionLength={this.state.sessionLength}
                        breakIncrement={this.incrementBreakLength}
                        breakDecrement={this.decrementBreakLength}
                        sessionIncrement={this.incrementSessionLength}
                        sessionDecrement={this.decrementSessionLength}
                        timer={this.swapAndClokify()}
                        classClock={this.state.timer < 60 ? "dead" : "alive"}
                        nameTimer={!this.state.isBreak ? "Session" : "Break"}
                    />
                </div>
                <div id="buttons">
                    <span className="span-main" onClick={this.intervalTimer}>
                        <FontAwesomeIcon icon={faPlay} />
                        <FontAwesomeIcon icon={faStop} />
                    </span>
                    <span className="span-main" onClick={this.reset}>
                        <FontAwesomeIcon icon={faRetweet} />
                    </span>
                </div>
                <div id="designed">
                    <p>Designed and Coded by</p>
                    <p>@Guillermo Rivas</p>
                </div>
            </div>
        );
    }

}

// --------------------------------------------
//This is the load for the ReactDOM

ReactDOM.render(
    //Main application
    <PomodoroBoard />,
    document.getElementById('root')
);