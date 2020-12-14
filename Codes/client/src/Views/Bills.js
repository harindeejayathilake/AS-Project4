import React, { Component } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getBills } from '../actions/userActions';

import Navbar from '../Components/HomeNavbar';
import Footer from '../Components/Footer';
import { Card, CardHeader, CardSubtitle, Container, Button, Progress, Spinner } from 'reactstrap';



class Bills extends Component {

    _isMounted = false;

    state={
        bills: [],
        status: [],
        max:[],
        value:[],
        loading: false
    }

    componentDidMount=()=>{
        this._isMounted = true;
        this.props.getBills().then(res=>{
            if(this._isMounted){
                let bills = res.bills;
                let status = [];
                let max = [];
                let value = [];

                for(let i=0; i<bills.length; i++){

                    max.push( bills[i].items.length + 2 );

                     //checking status and process
                     if(bills[i].accepted === true && bills[i].delivered === true){
                        status.push('Order has been sent');
                        value.push(max[i]);
                    }else if(bills[i].accepted === true && bills[i].delivered === false){
                        
                        let process = 1;

                        for(let j=0; j<bills[i].items.length; j++ ){
                            if(bills[i].items[i].ready){
                                process += 1;
                            }
                        }

                        if(process === (max[i]-1)){
                            status.push('Order is ready to move..');
                        }else{
                            status.push('Order is placed and processing..');
                        }

                        value.push(process)

                    }else{
                        status.push('Pending...');
                        value.push(0);
                    }

                }

                this.setState({bills: bills, status, max, value});
            }
        })
    }

    componentWillUnmount() {this._isMounted = false}


    render() {
        return (
            <div>
                <Navbar/>

                <Container style={{ marginTop: '80px'}} >

                    <h4 style={{textAlign: 'center', marginBottom: '30px'}} >Bills and Orders</h4>

                    {this.state.loading?
                        <section style={{display: 'flex', justifyContent: 'center'}} ><Spinner/></section>
                    :
                        <section style={{maxWidth:'600px', margin:'auto'}} >

                            {this.state.bills.length>0?

                                this.state.bills.map((bill, index)=>(
                                    <Card key={index} style={{marginBottom: '20px'}} >
                                        <CardHeader style={{padding: '20px', background: 'white', borderTop: '4px solid #298dff'}}>
                                           
                                            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px', flexWrap: 'wrap'}} >
                                                <CardSubtitle><strong>Order ID:</strong> {bill._id}</CardSubtitle>
                                                {this.state.max[index] === this.state.value[index]?<Button size="sm"  color='danger' style={{padding: '2px 8px', borderRadius: '50%'}} >X</Button>: null }
                                            </div>

                                            <CardSubtitle style={{fontSize: '14px', marginBottom: '5px'}} >{`Date: ${bill.date}`}</CardSubtitle>
                                            <CardSubtitle style={{fontSize: '14px', marginBottom: '5px'}} >{`Amount: Rs. ${bill.total}`}</CardSubtitle>
                                            <CardSubtitle style={{fontSize: '14px', marginBottom: '5px'}} >Status: <strong>{this.state.status[index]}</strong></CardSubtitle>
                                            <Progress animated min={0} max={this.state.max[index]} value={this.state.value[index]} color='success' />
                                        </CardHeader>
                                    </Card>
                                ))
                                
                            
                        
                            :
                                <Card style={{marginBottom: '20px'}} >
                                    <CardHeader style={{padding: '20px', background: 'white'}}>
                                        <CardSubtitle style={{ marginBottom: '5px', textAlign: 'center'}}><strong>You have no bills !</strong></CardSubtitle>
                                    </CardHeader>
                                </Card>}

                            
                        </section>
                
                    }

                    

                </Container>
                
                <Footer/>
            </div>
        )
    }
}

export default withRouter(connect(null, {getBills})(Bills));
