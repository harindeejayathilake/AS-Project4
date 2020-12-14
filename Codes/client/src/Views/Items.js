import React, { Component } from 'react';
import Navbar from '../Components/HomeNavbar'
import { Container, Button, Row, Input, InputGroup, Card, CardText, CardBody, CardImg, CardTitle, CardSubtitle, Spinner} from 'reactstrap';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import AddItem from '../Components/AddItem';
import Footer from '../Components/Footer';
import { getItems, getSellers } from '../actions/authActions'


class Items extends Component {
    _isMounted = false;
    state ={
        items: [],
        loading: true,
        show: false,
        seller_loading: false,
        sellers: [],
        search : []
    }

    componentDidMount=()=>{
        this._isMounted = true;
        if(this.props.items.length>0){
            this.setState({items: this.props.items, loading: false})
        }else{
            this.props.getItems().then(res=>{
                if(this._isMounted){
                    this.setState({items: this.props.items, loading: false})
                }
            })
        }
        
    }
    componentWillUnmount() {this._isMounted = false}

    toggle=()=>{
        this.setState({show: !this.state.show})
    }

    AddItem=()=>{
        this.setState({seller_loading: true})
        this.props.getSellers().then(res=>{
            this.setState({sellers: res, seller_loading: false});
            this.toggle();
        })
    }

    Searching =(e)=>{
        let results = [];
        if(e.target.value.length>0){
            results = this.state.items.filter((item)=> item.name.toLowerCase().indexOf(e.target.value.toLowerCase()) === 0)
        }
        this.setState({search: results});
    }


    render() {
       
        return (

            <div>
                <Navbar/>
                <Container style={{marginTop: '50px', marginBottom: '100px'}} >
                    <h2 style={{marginBottom: '50px', textAlign: 'center'}}>Items</h2>

                    <div style={{display: 'flex', justifyContent:'center', alignItems:'center', marginBottom: '40px', flexWrap:"wrap" }}>
                        <Button color='warning' block style={{width: '300px', marginBottom: '10px'}} onClick={this.AddItem} > {this.state.seller_loading? <Spinner size='sm' /> : 'Add New Item'} </Button>
                        <InputGroup style={{width: '400px', marginLeft: '20px', marginBottom: '10px'}} >
                            <Input placeholder='search item' onChange={this.Searching} />
                        </InputGroup>
                    </div>

                    <Row style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}} >
                        {this.state.items.length>0 && this.state.search.length === 0 ? 
                        
                            this.state.items.map((items, index)=>(
                                <Link to={`/item-info?id=${items._id}`} key={index} style={{color: 'black', textDecoration: 'none'}}>
                                    <Card  style={{marginLeft: '20px', marginBottom: '30px', cursor: 'pointer', width:'200px' }}>
                                        <CardImg top style={{height: '180px', width: 'auto', padding: '20px 20px 0 20px'}} src={items.picture} alt='product image'/>
                                        <CardBody>
                                            <CardTitle>{items.name}</CardTitle>
                                            <CardSubtitle>RS: {items.price}</CardSubtitle>
                                            <CardText style={{fontSize: '14px', color: '#848080'}} >{items.short_desc}</CardText>
                                        </CardBody>
                                    </Card>
                                </Link>
                            ))
                        
                        
                        : this.state.search.length >0?

                            this.state.search.map((items, index)=>(
                                <Link to={`/item-info?id=${items._id}`} key={index} style={{color: 'black', textDecoration: 'none'}}>
                                    <Card  style={{marginLeft: '20px', marginBottom: '30px', cursor: 'pointer', width:'200px' }}>
                                        <CardImg top style={{height: '180px', width: 'auto', padding: '20px 20px 0 20px'}} src={items.picture} alt='product image'/>
                                        <CardBody>
                                            <CardTitle>{items.name}</CardTitle>
                                            <CardSubtitle>RS: {items.price}</CardSubtitle>
                                            <CardText style={{fontSize: '14px', color: '#848080'}} >{items.short_desc}</CardText>
                                        </CardBody>
                                    </Card>
                                </Link>
                            ))


                        :
                           <Card  style={{cursor: 'pointer', margin: 'auto' }}>
                                <CardBody>
                                    <CardTitle>No items found !</CardTitle>
                                </CardBody>
                            </Card>

                        }
                    </Row>

                </Container>
                
                <AddItem show={this.state.show} toggle={this.toggle} sellers={this.state.sellers} />
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    items: state.items.items,
  });
  
  

export default withRouter(connect(mapStateToProps, {getItems, getSellers})(Items));