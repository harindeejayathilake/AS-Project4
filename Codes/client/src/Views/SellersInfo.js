import React, { Component } from 'react';
import Navbar from '../Components/HomeNavbar'
import { Container, Col, Row, Spinner, Button, InputGroup, Input, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { getSellers, getSellerItems, deleteSeller } from '../actions/authActions';
import UpdateSeller from '../Components/UpdateSeller';
import AddSeller from '../Components/AddSeller';
import Footer from '../Components/Footer';



class SellersInfo extends Component {
    _isMounted = false;
    state ={
        sellers: [],
        search:[],
        seller: null,
        deleting: false,
        seller_items: null,
        update_show: false,
        add_show: false,
        loading: true
    }

    componentDidMount=()=>{
        this._isMounted = true;
        this.props.getSellers().then(res=>{
            if(this._isMounted){
                if(res.length>0){
                    this.setState({sellers:res, seller : res[0], loading: false});
                    this.getSellerItems(res[0]._id);
                }
            }
        })
    }
    componentWillUnmount() {this._isMounted = false}

    deleteSeller =()=>{
        this.setState({deleting: true})
        this.props.deleteSeller(this.state.seller._id).then(res=>{
            if(res.success){
                this.setState({deleting: false});
                window.location.reload();
            }
        })
    }

    selectSeller=(id)=>{
        let seller = this.state.sellers.filter((seller)=> seller._id === id );
        this.setState({seller: seller[0]}) ;
        this.getSellerItems(id);       
    }

    getSellerItems=(id)=>{
        this.setState({seller_items: null})
        this.props.getSellerItems(id).then(res=>{
            this.setState({seller_items: res})
        })
    }

    searchSeller=(e)=>{
        let results = [];
        if(e.target.value.length>0){
            results = this.state.sellers.filter((seller)=> seller.name.toLowerCase().indexOf(e.target.value.toLowerCase()) === 0)
        }
        
        if(results.length>0){
            this.setState({search: results, seller: results[0]});
            this.getSellerItems(results[0]._id);
        }else{
            this.setState({search: [], seller: this.state.sellers[0]});
            this.getSellerItems(this.state.sellers[0]._id);
        }
        
    }

    update_toggle=()=>{this.setState({update_show: !this.state.update_show})}
    add_toggle=()=>{this.setState({add_show: !this.state.add_show})}


    render() {
        return (
            <div>
                <Navbar/>
                <Container style={{marginTop: '50px', marginBottom: '100px'}} >
                    <h2 style={{marginBottom: '50px', textAlign: 'center'}}>Sellers</h2>

                    <div style={{display: 'flex', justifyContent:'center', alignItems:'center', marginBottom: '40px', flexWrap:"wrap" }}>
                        <Button color='warning' block style={{width: '300px', marginBottom: '10px'}} onClick={this.add_toggle} >Add New Seller</Button>
                        <InputGroup style={{width: '400px', marginLeft: '20px', marginBottom: '10px'}} >
                            <Input placeholder='search seller' onChange={this.searchSeller} />
                        </InputGroup>
                    </div>

                    {this.state.sellers.length>0 && this.state.search.length === 0 ? 

                        <Row style={{boxShadow: '0 0 15px rgba(0,0,0,.1)'}}>
                            <Col lg={8} style={{padding: '30px', background: 'white'}}>
                                <ListGroup>
                                    {this.state.sellers.map((seller, index)=>(
                                        <ListGroupItem key={index} >
                                            <ListGroupItemHeading style={{cursor: 'pointer', marginBottom: '0'}} onClick={()=>this.selectSeller(seller._id)} >{seller.name}</ListGroupItemHeading>
                                        </ListGroupItem>
                                    ))}
                                    
                                </ListGroup>

                                
                            </Col>
                            <Col lg={4} style={{padding: '30px', background: '#dceaf8'}} >

                                <h4>Seller</h4>

                                <p style={{marginBottom: '0'}}><strong>Name : </strong>{this.state.seller.name}</p>
                                <p style={{marginBottom: '0'}}><strong>Tp : </strong>{this.state.seller.tp}</p>
                                <p style={{marginBottom: '0'}}><strong>Address : </strong>{this.state.seller.address}</p>
                                <p style={{marginBottom: '0'}}><strong>Account no : </strong>{this.state.seller.account_no}</p>
                                <p style={{marginBottom: '0'}}><strong>Account details : </strong>{this.state.seller.account_details}</p>
                                <Button color="danger" block style={{marginTop: '30px'}} onClick={this.deleteSeller} > {this.state.deleting? <Spinner size='sm' /> : 'Delete Seller' }</Button>
                                <Button color="warning" block onClick={this.update_toggle} > Update Seller</Button>
                                {this.state.seller_items!==null?  <p style={{marginBottom: '0px', marginTop: '16px', fontSize: '12px'}} ><strong>Note :</strong>{` If you delete this seller,the following ${this.state.seller_items.length} items will be deleted as well.`}</p>:null}
                               

                                <hr/>
                                <h4>Items</h4>
                                {this.state.seller_items!==null?
                                    this.state.seller_items.map((item, index)=>(
                                        <ListGroup key={index} >
                                            <ListGroupItem style={{padding: '6px 20px'}} >
                                                <Link to={`/item-info?id=${item._id}`} ><ListGroupItemText style={{marginBottom: '0', color: 'black'}} >{item.name}</ListGroupItemText></Link> 
                                            </ListGroupItem>
                                        </ListGroup>
                                    ))

                                :<Spinner size='lg'/>}
                            </Col>
                            <UpdateSeller show={this.state.update_show} toggle={this.update_toggle} seller={this.state.seller} />
                        </Row>
                        
                    :this.state.search.length>0?
                        <Row style={{boxShadow: '0 0 15px rgba(0,0,0,.1)'}}>
                        <Col lg={8} style={{padding: '30px', background: 'white'}}>
                            <ListGroup>
                                {this.state.search.map((seller, index)=>(
                                    <ListGroupItem key={index} >
                                        <ListGroupItemHeading style={{cursor: 'pointer', marginBottom: '0'}} onClick={()=>this.selectSeller(seller._id)} >{seller.name}</ListGroupItemHeading>
                                    </ListGroupItem>
                                ))}
                                
                            </ListGroup>

                            
                        </Col>
                        <Col lg={4} style={{padding: '30px', background: '#dceaf8'}} >

                            <h4>Seller</h4>

                            <p style={{marginBottom: '0'}}><strong>Name : </strong>{this.state.seller.name}</p>
                            <p style={{marginBottom: '0'}}><strong>Tp : </strong>{this.state.seller.tp}</p>
                            <p style={{marginBottom: '0'}}><strong>Address : </strong>{this.state.seller.address}</p>
                            <p style={{marginBottom: '0'}}><strong>Account no : </strong>{this.state.seller.account_no}</p>
                            <p style={{marginBottom: '0'}}><strong>Account details : </strong>{this.state.seller.account_details}</p>
                            <Button color="danger" block style={{marginTop: '30px'}} onClick={this.deleteSeller} > {this.state.deleting? <Spinner size='sm' /> : 'Delete Seller' }</Button>
                            <Button color="warning" block onClick={this.toggle} > Update Seller</Button>
                            {this.state.seller_items!==null?  <p style={{marginBottom: '0px', marginTop: '16px', fontSize: '12px'}} ><strong>Note :</strong>{` If you delete this seller,the following ${this.state.seller_items.length} items will be deleted as well.`}</p>:null}
                        

                            <hr/>
                            <h4>Items</h4>
                            {this.state.seller_items!==null?
                                this.state.seller_items.map((item, index)=>(
                                    <ListGroup key={index} >
                                        <ListGroupItem style={{padding: '6px 20px'}} >
                                            <Link to={`/item-info?id=${item._id}`} ><ListGroupItemText style={{marginBottom: '0', color: 'black'}} >{item.name}</ListGroupItemText></Link> 
                                        </ListGroupItem>
                                    </ListGroup>
                                ))

                            :<Spinner size='lg'/>}
                        </Col>
                        <UpdateSeller show={this.state.update_show} toggle={this.update_toggle} seller={this.state.seller} />
                    </Row>
                
                    
                    
                    
                    :<div style={{left: '50%', position: 'absolute'}} ><Spinner size="lg" /></div> }
                </Container>

                <AddSeller show={this.state.add_show} toggle={this.add_toggle} seller={this.state.seller} />
               
                
                <Footer/>
            </div>
        )
    }
}

export default withRouter(connect(null, {getSellers, getSellerItems, deleteSeller})(SellersInfo));