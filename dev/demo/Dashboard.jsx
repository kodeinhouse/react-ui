import React from 'react';
import { Container } from 'components';

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    static get defaultProps() {

        /*<Container className="dashed" style={{width: '200px', maxWidth: '200px'}} layout="flex" orientation="vertical">
            <Widget background="limegreen" flex="1"/>
            <Widget background="coral" flex="1"/>
        </Container>
        <Container className="dashed" region="center" layout="flex" orientation="vertical">
            <Widget background="tomato"/>
            <Container flex="1" layout="flex">
                <Widget background="blueviolet" flex="1"/>
                <Widget background="cornflowerblue" flex="1"/>
            </Container>
        </Container>*/

        return {
            childs: [{
                key: 'container-1',
                type: 'container',
                className: 'dashed',
                style: {width: '200px', maxWidth: '200px'},
                layout: 'flex',
                orientation: 'vertical',
                childs: [{
                    key: 'widget-1',
                    type: 'widget',
                    background: 'limegreen',
                    flex: '1'
                },{
                    key: 'widget-2',
                    type: 'widget',
                    background: 'coral',
                    flex: "1"
                }]
            },{
                key: 'container-2',
                type: 'container',
                className: 'dashed',
                region: 'center',
                layout: 'flex',
                orientation: 'vertical',
                childs: [{
                    key: 'widget-3',
                    type: 'widget',
                    background: 'tomato'
                },{
                    key: 'container-3',
                    type: 'container',
                    className: 'dashed',
                    layout: 'flex',
                    flex: '1',
                    childs: [{
                        key: 'widget-4',
                        type: 'widget',
                        background: 'blueviolet',
                        flex: '1'
                    },{
                        key: 'widget-5',
                        type: 'widget',
                        background: 'cornflowerblue',
                        flex: '1'
                    }]
                }]
            }]
        };
    }

    createChild(element) {
        let { type, childs, ...rest } = element;

        if(type == 'container')
            type = Container;
        else
            if(type == 'widget')
                type = Widget;

        const children = Array.isArray(childs) ? childs.map(c => this.createChild(c)) : null;

        return React.createElement(type, rest, children);
    }

    getLayout() {
        if(this.state.layout == null) {
            return (
                <Container style={{margin: 'auto'}}>
                    <button onClick={c => this.setState({layout: 'layout1'})}>Choose Layout 1</button>
                    <button onClick={c => this.setState({layout: 'layout2'})}>Choose Layout 2</button>
                </Container>
            );
        }
        else {
            const { childs } = this.props;

            const children = childs.map(c => this.createChild(c));

            return (
                <React.Fragment>
                    {children}
                </React.Fragment>
            );
        }
    }

    render() {
        return (
            <Container className="dashboard-layout" region="center" layout="border" style={{background: '#ececec'}}>
                {this.getLayout()}
            </Container>
        );
    }
}

class Widget extends React.Component {
    render() {
        const { background, ...rest } = this.props;

        return (
            <Container style={{background: background, textAlign: 'center'}} {...rest} draggable>Widget</Container>
        );
    }
}
