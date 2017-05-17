import React, { Component } from 'react';
import { Container } from '../box/Container';

export class TabPanel extends Container
{
    constructor(props)
    {
        super(props);

        this.state = {
            selected: 0
        };
    }
    renderHeader()
    {
        var headers = [];

        function createTabStrip(item, index)
        {
            var active = this.state.selected == index;

            if(item.props && item.props.title && item.props.displayTitle)
                item.props.displayTitle = false;

            return (<li key={index} className={active ? "active": null}><a href="#" onClick={this.handleOnClick.bind(this, index)}>{item.props.title}</a></li>);
        }

        return (<ul className="tab-stripe">{this.props.children.map(createTabStrip.bind(this))}</ul>);
    }
    renderActiveTab()
    {
        return this.props.children[this.state.selected];
    }
    handleOnClick(index, event)
    {
        event.preventDefault();

        this.setState({selected: index});
    }
    render()
    {
        let classes = ['tab-panel', this.props.theme];

        return (
            <div className={classes.join(' ')}>
                {this.renderHeader()}
                {this.renderActiveTab()}
            </div>
        );
    }
}

TabPanel.defaultProps = {
    theme: 'neutral'
};
