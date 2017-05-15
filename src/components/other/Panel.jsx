import React, { Component } from 'react';
import { Container } from '../box/Container';

export class Panel extends Container
{
    constructor(props)
    {
        super(props);

        this.headerCls = 'panel-header';
        this.bodyCls = 'panel-body';
    }
    getHeaderClasses()
    {
        let headerCls = [this.headerCls];

        if(this.props.headerCls != null)
            headerCls.push(this.props.headerCls);

        return headerCls;
    }
    getBodyClasses()
    {
        let bodyCls = [this.bodyCls];

        if(this.props.bodyCls != null)
            bodyCls.push(this.props.bodyCls);

        return bodyCls;
    }
    render()
    {
        let headerCls = this.getHeaderClasses().join(' ');
        let bodyCls = this.getBodyClasses().join(' ');

        let header = (this.props.title && this.props.displayTitle != false ? <div className={headerCls}>{this.props.title}</div> : null);
        let body = <div className={bodyCls}>{this.props.children}</div>;
        let footer = (this.props.footer ? this.props.footer : null);

        let style = this.props.style || {};

        // TODO: Add a conditional validation to allow setting the width as a string or a number
        // Numbers will be treated as pixel
        if(parseFloat(this.props.width) > 0)
            style.width =this.props.width + 'px';

        return (
            <div id={this.props.id} className={this.className} onClick={this.props.onClick} style={style}>
                {header}
                {body}
                {footer}
            </div>
        );
    }
}

Panel.defaultProps = {
    type: 'panel',
};
