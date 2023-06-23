import React, { Component } from 'react';

class Alert extends Component {
    render() {
        const { type, text } = this.props;
        let color = null;

        switch (type) {
            case 'info':
                color = 'blue';
                break;
            case 'warning':
                color = 'orange';
                break;
            case 'error':
                color = 'red';
                break;
            default:
                break;
        }

        const style = {
            color: color,
        };

        return (
            <div className="Alert">
                <p style={style}>{text}</p>
            </div>
        );
    }
}

export default Alert;
