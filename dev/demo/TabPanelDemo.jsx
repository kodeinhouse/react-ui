import React, { Component } from 'react';
import { TabPanel, TabItem, Container } from 'container';
import { Form } from 'form';

export class TabPanelDemo extends Component
{
    constructor(props)
    {
        super(props);
    }

    renderVehicleDetail(){
        let colorStyle = {padding: '6px 12px', display: 'inline-block', border: '1px solid lightgray', verticalAlign: 'middle'};
        let columnStyle = {border: '1px solid #e6e6e6', padding: '0px 20px'};

        return (
            <Container region="center" layout="border" orientation="vertical">
                <Container layout="flex">
                    <Container style={{border: '1px solid #F1F1F1', position: 'relative', height: '150px'}}>
                        <span style={{background: 'url(https://imgd.aeplcdn.com/0x0/cw/static/icons/arrow-fff-10x18.png) no-repeat #0000004A', padding: '14px 12px', backgroundPosition: '5px center', position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 0}}></span>
                        <img src="https://imgd.aeplcdn.com/310x174/ec/21/CB/18902/img/ol/Aston-Martin-Vanquish-Interior-52584.jpg?v=201711021421&q=85" width="240px" height="150px"/>
                        <span style={{background: 'url(https://imgd.aeplcdn.com/0x0/cw/static/icons/arrow-fff-10x18.png)  no-repeat #0000004A', padding: '14px 12px', backgroundPosition: '-16px center', position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: 0}}></span>
                        <span style={{position: 'absolute', backgroundColor: '#000000b3', color: 'white', top: 5, right: 5, fontSize: '11px', padding: '2px 5px', borderRadius: '8px'}}>3/30</span>
                    </Container>
                    <Container padding="5px">
                        <Container layout="flex">
                            <Form.FieldGroup>
                                <Form.DisplayField>2011 Audi Q5 Prestige</Form.DisplayField>
                                <Form.DisplayField>V6 3.2L</Form.DisplayField>
                                <Form.DisplayField>1FTRF12W48KE17263</Form.DisplayField>
                            </Form.FieldGroup>
                            <table border="0" style={{marginLeft: '40px'}}>
                                <tbody>
                                <tr>
                                    <td rowSpan="3">
                                        <img src="https://cdn4.iconfinder.com/data/icons/car-service-bolt-line-vol-2-2/128/service-61-32.png" />
                                    </td>
                                    <td rowSpan="2" align="center">
                                        <span style={{fontSize: '34px', fontWeight: 'bold'}}>34</span>
                                    </td>
                                    <td colSpan="2" align="center">
                                        <span style={{color: 'gray'}}>MPG</span>
                                    </td>
                                    <td rowSpan="3" align="center" style={{paddingLeft: '40px'}}>
                                        <img src="https://cdn4.iconfinder.com/data/icons/car-silhouettes/1000/SUV-128.png" width="100px" style={{margin: '-12px 0px'}}/>
                                        <div>SUV</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">30</td>
                                    <td align="center">38</td>
                                </tr>
                                <tr style={{fontWeight: 'bold', textTransform: 'uppercase', fontSize: '11px', color: 'gray'}}>
                                    <td>Combined</td>
                                    <td>CITY</td>
                                    <td>HWY</td>
                                </tr>
                                </tbody>
                            </table>
                        </Container>
                        <Form.FieldGroup className="inline" style={{marginBottom: '0px'}}>
                            <Form.DisplayField label="Exterior" labelWidth="60px"><span style={Object.assign({background: 'gray'}, colorStyle)}></span> Gray</Form.DisplayField>
                            <Form.DisplayField label="Interior" labelWidth="60px"><span style={Object.assign({background: '#561f23'}, colorStyle)}></span> Burgundy</Form.DisplayField>
                        </Form.FieldGroup>
                        <Container>
                            <table style={{borderCollapse: 'collapse'}}>
                                <tbody>
                                    <tr>
                                        <td style={columnStyle}>
                                            <Form.DisplayField>
                                                <img src="https://cdn0.iconfinder.com/data/icons/thin-transportation-1/24/thin-0485_gauge_dashboard_speedometer_odometer_speed-20.png" style={{verticalAlign: 'middle'}}/>
                                                <span style={{verticalAlign: 'middle', fontWeight: 'bold'}}> 33,923</span>
                                            </Form.DisplayField>
                                        </td>
                                        <td style={columnStyle}>
                                            <Form.DisplayField>
                                                <img src="https://cdn4.iconfinder.com/data/icons/car-service-bolt-line-vol-1-1/128/service-69-20.png" style={{verticalAlign: 'middle'}}/>
                                                <span style={{verticalAlign: 'middle', fontWeight: 'bold'}}> Standard</span>
                                            </Form.DisplayField>
                                        </td>
                                        <td style={columnStyle}>
                                            <Form.DisplayField>
                                                <img src="https://cdn4.iconfinder.com/data/icons/car-service-bolt-line-vol-1-1/128/service-62-20.png" style={{verticalAlign: 'middle'}}/>
                                                <span style={{verticalAlign: 'middle', fontWeight: 'bold'}}> Gasoline</span>
                                            </Form.DisplayField>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <Container style={{display: 'none'}}>
                                <div style={{fontSize: '11px', display: 'inline-block'}}><span style={{padding: '4px', border: '1px solid grey', display: 'inline-block'}}></span> TMU</div>
                                <div style={{fontSize: '11px', display: 'inline-block'}}><span style={{padding: '4px', border: '1px solid grey', display: 'inline-block'}}></span> Exempt</div>
                            </Container>
                        </Container>
                    </Container>
                </Container>
                <TabPanel region="center" theme="material" stripeAlign="left" layout="border">
                    <TabItem title="Pricing" padding="10px" region="center">
                        <Container columns="equal">
                            <Form.FieldGroup labelAlign="right" labelWidth="140px">
                                <Form.DisplayField label="Purchased From">A&J AUTO SERVICES LLC</Form.DisplayField>
                                <Form.DisplayField label="Purchasing Agent">Amir Azarpad</Form.DisplayField>
                                <Form.DisplayField label="Purchased Date">03/02/2018</Form.DisplayField>
                            </Form.FieldGroup>
                            <Form.FieldGroup labelAlign="right" labelWidth="140px">
                                <Form.DisplayField label="Purchased Price">$0.00</Form.DisplayField>
                                <Form.DisplayField label="Repairs">$0.00</Form.DisplayField>
                                <Form.DisplayField label="Cost">$0.00</Form.DisplayField>
                            </Form.FieldGroup>
                        </Container>
                        <hr style={{borderTop: 'lightgray'}}/>
                        <Container columns="equal">
                            <Form.FieldGroup labelAlign="right" labelWidth="140px">
                                <Form.DisplayField label="Slashed Price">$0.00</Form.DisplayField>
                                <Form.DisplayField label="Sticker Price">$0.00</Form.DisplayField>
                                <Form.DisplayField label="NADA Trade">$0.00</Form.DisplayField>
                            </Form.FieldGroup>
                            <Form.FieldGroup labelAlign="right" labelWidth="140px">
                                <Form.DisplayField label="Internet Price">$0.00</Form.DisplayField>
                                <Form.DisplayField label="Minimum Price">$0.00</Form.DisplayField>
                                <Form.DisplayField label="NADA Retail">$0.00</Form.DisplayField>
                            </Form.FieldGroup>
                        </Container>

                    </TabItem>
                    <TabItem title="Equipment"></TabItem>
                    <TabItem title="Valuation"></TabItem>
                    <TabItem title="Recovery Device"></TabItem>
                </TabPanel>
            </Container>
        );
    }

    render()
    {
        return (
            <TabPanel region="center" layout="border" theme="material" stripeAlign="left">
                <TabItem title="Vehicle Details" layout="border" region="center">{this.renderVehicleDetail()}</TabItem>
                <TabItem title="Repairs & Expenses">Tab 2</TabItem>
                <TabItem title="Floorplan">Tab 2</TabItem>
                <TabItem title="Vehicle Options">Tab 2</TabItem>
                <TabItem title="Notes">Tab 2</TabItem>
                <TabItem title="Recon">Tab 2</TabItem>
                <TabItem title="Advertising">Tab 2</TabItem>
                <TabItem title="Photos">Tab 2</TabItem>
            </TabPanel>
        );
    }
}
