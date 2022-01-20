import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Home />
            </React.Fragment>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));