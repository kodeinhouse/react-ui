import React, { Component } from 'react';
import { Panel } from './Panel';
import ReactDOM from 'react-dom';

export class DialogPanel extends Panel
{
    constructor(props)
    {
        super(props);

        this.headerCls = 'dialog-header';
        this.bodyCls   = 'dialog-body vbox center';
    }

    componentDidMount()
    {
        /*let element = ReactDOM.findDOMNode(this);

        if(this.props.position != 'relative')
        {
            let clientRect = element.getBoundingClientRect();

            // We want the dialog to stay still while switching between options that could make it large
            element.style.marginTop = clientRect.top + 'px';
        }*/
    }
}

DialogPanel.defaultProps = {
    type: 'dialog',
    width: 660
};
