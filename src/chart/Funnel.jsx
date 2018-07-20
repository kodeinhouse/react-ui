import React, { Component } from 'react';

export class Funnel extends Component {

    constructor(props) {
        super(props);
    }

    renderItem(item, index) {
        const itemStyle = {
            alignItems: 'center',
            background: '#74b9ff',
            borderBottom: '1px solid #dfe6e9',
            clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)',
            color: '#FFF',
            display: 'flex',
            height: '70px',
            justifyContent: 'center',
            margin: '0',
            width: '100%'
        };

        const itemsWidth = ['100%', '80%', '64%', '51%', '41%', '33%'];
        let style;

        if (index <= 5) {
            style = {
                background: item.background,
                width: itemsWidth[index]
            };
        } else {
            style = {
                background: item.background,
                width: '26.5%',
                clipPath: 'none'
            };
        }

        return (
            <div
                key={`item-${index}`}
                style={{...itemStyle, ...style}}
                >
                {item.text}
            </div>
        );
    }

    render() {
        const style = Object.assign({
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '10px'
        }, this.props.style);

        return (
            <div style={style}>
                {
                    this.props.data.map((item, index) => {
                        return (
                            this.renderItem(item, index)
                        );
                    })
                }
            </div>
        );
    }
}
