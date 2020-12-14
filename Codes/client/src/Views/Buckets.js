import React, { Component } from 'react';
import Navbar from '../Components/HomeNavbar';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getBucket } from '../actions/authActions'
import { Container, Row, Col, Label, Card, CardTitle, CardText, CardBody, Spinner } from 'reactstrap';
import Footer from '../Components/Footer';


const qs = require('query-string');


class Buckets extends Component {
   
    _isMounted = false;

    state={
        loading: true,
        pending: [],
        processing: [],
        delivered: []
    }

    componentDidMount=()=>{
        this._isMounted = true;
        const parsed = qs.parse(window.location.search);
        this.props.getBucket(parsed.admin).then(res=>{

            let pending = [];
            let processing = [];
            let delivered = [];

            for(let i=0; i<res.bills.length; i++){
                if(res.bills[i].accepted === false){
                    pending.push(res.bills[i]);
                }else if( res.bills[i].accepted === true && res.bills[i].delivered === false){
                    
                    processing.push(res.bills[i]);
                }else if(res.bills[i].delivered === true){
                    delivered.push(res.bills[i])
                }
            }

            if(this._isMounted){
                this.setState({pending, processing, delivered, loading: false});
            }

        })
    }

    componentWillUnmount() {this._isMounted = false}
   


    render() {

        return (
            <div>
                <Navbar/>
                <Container style={{marginTop: '50px'}} >
                    <div style={{display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginBottom: '0px' }}>
                        <h2 style={{marginBottom: '50px'}}>Your Orders {this.state.loading?<Spinner size="lg" style={{marginBottom: '10px'}} /> : null } </h2>
                    </div>

                    
                        <Row>
                            <Col lg={4} >
                                <Label>Pending List</Label>
                                <div style={{marginTop: '20px'}}>
                                    {this.state.pending.length>0?
                                        this.state.pending.map((bill, index)=>(
                                            <Card style={{background: '#ffbebe', marginBottom: '10px'}} key={index} >
                                                <Link to={`/order-info?id=${bill._id}`} style={{color: 'black', textDecoration: 'none'}} >
                                                    <CardBody  >
                                                        <CardTitle style={{marginBottom: '0px'}}> <strong>{bill._id}</strong></CardTitle>
                                                        <CardText style={{marginBottom: '0', fontSize: '13px'}}>Amount: Rs. {bill.total} </CardText>
                                                        <CardText style={{marginBottom: '2px', fontSize: '12px'}}>Date: {bill.date} </CardText>
                                                        <CardText style={{marginBottom: '2px', fontSize: '12px'}}>No of Items: {bill.items.length} </CardText>
                                                    </CardBody>
                                                </Link>
                                            </Card>

                                        ))
                                    :
                                        <Card style={{background: '#ffef00'}}>
                                            <CardBody  >
                                                <CardText>No any orders found !</CardText>
                                            </CardBody>
                                        </Card>}
                                </div>
                            </Col>

                            <Col lg={4}>
                                <Label>Processing List</Label>
                                <div style={{marginTop: '20px'}}>
                                    {this.state.processing.length>0?
                                        this.state.processing.map((bill, index)=>(
                                            <Card style={{background: '#ffe396', marginBottom: '10px'}} key={index} >
                                               <Link to={`/order-info?id=${bill._id}`} style={{color: 'black', textDecoration: 'none'}} >
                                                    <CardBody  >
                                                        <CardTitle style={{marginBottom: '0px'}}> <strong>{bill._id}</strong></CardTitle>
                                                        <CardText style={{marginBottom: '0', fontSize: '13px'}}>Amount: Rs. {bill.total} </CardText>
                                                        <CardText style={{marginBottom: '2px', fontSize: '12px'}}>Date: {bill.date} </CardText>
                                                        <CardText style={{marginBottom: '2px', fontSize: '12px'}}>No of Items: {bill.items.length} </CardText>
                                                    </CardBody>
                                                </Link>
                                            </Card>

                                        ))
                                    :
                                        <Card style={{background: '#ffe396'}}>
                                            <CardBody  >
                                                <CardText>All the orders are deliverd !</CardText>
                                            </CardBody>
                                        </Card>}
                                </div>
                            </Col>

                            <Col lg={4} >
                                <Label>Delivered List</Label>
                                <div style={{marginTop: '20px', marginBottom: '50px'}}>
                                    {this.state.delivered.length>0?
                                        this.state.delivered.map((bill, index)=>(
                                            <Card style={{background: '#20c997'}} key={index} >
                                               <Link to={`/order-info?id=${bill._id}`} style={{color: 'black', textDecoration: 'none'}} >
                                                    <CardBody  >
                                                        <CardTitle style={{marginBottom: '0px'}}> <strong>{bill._id}</strong></CardTitle>
                                                        <CardText style={{marginBottom: '0', fontSize: '13px'}}>Amount: Rs. {bill.total} </CardText>
                                                        <CardText style={{marginBottom: '2px', fontSize: '12px'}}>Date: {bill.date} </CardText>
                                                        <CardText style={{marginBottom: '2px', fontSize: '12px'}}>No of Items: {bill.items.length} </CardText>
                                                    </CardBody>
                                                </Link>
                                            </Card>

                                        ))
                                    :
                                        <Card style={{background: '#20c997'}}>
                                            <CardBody  >
                                                <CardText>Delivered orders list have been deleted !</CardText>
                                            </CardBody>
                                        </Card>}
                                </div>
                            
                            </Col>
                        </Row>

                </Container>
                <Footer/>
                
            </div>
        )
    }
}

export default withRouter(connect(null, {getBucket})(Buckets));