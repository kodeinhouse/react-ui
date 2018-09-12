import React, { Component } from 'react';
import { Container } from '../box/Container';

export class Toolbar extends Container
{
    constructor(props)
    {
        super(props);
        this.state = this.empty();
    }

    empty()
    {
        let state = {checked: this.props.checked || false};

        return state;
    }

    checked()
    {
        this.setState({checked: true});
    }

    unChecked()
    {
        this.setState({checked: false});
    }

    setChecked(value)
    {
        this.setState({checked: value});
    }

    getChecked()
    {
        return this.state.checked;
    }

    getItem(item, index)
    {
        let classes = [];
        let style = {};

        if(item.cls)
            classes.push(item.cls);

        if(item.visible === false)
            style.display = 'none';

        if(item.type == 'check')
            return(<span key={'span-'+index}><input key={'input-'+index} checked={this.state.checked} type="checkbox" className={classes.join(' ')} onClick={item.handler ? item.handler.bind(this): null}/>{item.text}</span>);

        return (<a key={index} href="javascript:void(0);" onClick={item.handler ? item.handler.bind(this): null} className={classes.join(' ')} style={style}>{item.text}</a>);
    }
    getButtons(items)
    {
        return items.map(this.getItem.bind(this));
    }
    getGroup(item, index)
    {
        return <div key={index} className={item.className} style={item.style}>{this.getButtons(item.items)}</div>;
    }
    render()
    {
        if(this.props.children)
            return super.render();
        else {
            let self = this;
            let items = this.props.items.map(function(item, index){
                if(item.type == 'group')
                    return self.getGroup(item, index);
                else
                    return self.getItem(item, index);
            });

            return (<div className={this.className}>{items}</div>);
        }
    }
}

Toolbar.defaultProps = {
    type: 'toolbar'
};
