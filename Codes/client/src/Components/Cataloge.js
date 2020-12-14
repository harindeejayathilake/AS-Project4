import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { getItems } from '../actions/authActions';

class Cataloge extends Component {

    _isMounted = false;

    state={
        loading: true,
        products : ['1', '2', '3','1', '2', '3','1', '2', '3'],
    }

    componentDidMount=()=>{
        this._isMounted = true;
        this.props.getItems().then(res=>{
            if(this._isMounted){
                this.setState({loading: false});
            }
        });
    }

    componentWillUnmount() {this._isMounted = false}


    render() {
        return (
            <main className="container">
            <section style={{background: 'white',  padding: '30px', boxShadow: '0 0 15px rgba(0,0,0,.1)'}}>
                <div className="container">
                    <div className="content">
                        <div className="row">

                            <div className="col-md-3">
                                <div className="d-none d-md-block">
                                    <div className="filters">
                                        <div className="filter-item">
                                            <h6>Categories</h6>
                                            <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-1"/><label className="form-check-label" htmlFor="formCheck-1">Phones</label></div>
                                            <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-2"/><label className="form-check-label" htmlFor="formCheck-2">Laptops</label></div>
                                            <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-3"/><label className="form-check-label" htmlFor="formCheck-3">PC</label></div>
                                            <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-4"/><label className="form-check-label" htmlFor="formCheck-4">Tablets</label></div>
                                        </div>
                                        <div className="filter-item">
                                            <h6>Brands</h6>
                                            <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-5"/><label className="form-check-label" htmlFor="formCheck-5">Samsung</label></div>
                                            <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-6"/><label className="form-check-label" htmlFor="formCheck-6">Apple</label></div>
                                            <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-7"/><label className="form-check-label" htmlFor="formCheck-7">HTC</label></div>
                                        </div>
                                        <div className="filter-item">
                                            <h6>OS</h6>
                                            <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-8"/><label className="form-check-label" htmlFor="formCheck-8">Android</label></div>
                                            <div className="form-check"><input className="form-check-input" type="checkbox" id="formCheck-9"/><label className="form-check-label" htmlFor="formCheck-9">iOS</label></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col-md-9" style={{padding: '0'}}>

                                <div className="row no-gutters" >

                                    {!this.state.loading?
                                        this.props.items.map((item, index)=>(
                                            <div key={index} className="col-12 col-md-6 col-lg-3" style={{border: '1px #e8e6e6 solid', padding: '20px'}} >
                                                <Link to={`/showroom?item=${item._id}`} style={{color: 'black', textDecoration: 'none'}} >
                                                <div className="clean-product-item">
                                                    <div className="image"><img src={item.picture} alt={index} style={{height: 'auto', width: '100%'}}/></div>
                                                    <div className="product-name" style={{marginTop: '20px'}}>{item.name}</div>
                                                    <p style={{margin: '0px', fontSize: '12px', color: 'grey'}}>{item.short_desc}</p>
                                                    <div className="about">
                                                        <div className="price">
                                                            <h5 style={{marginTop: '10px'}} >{`Rs: ${item.price}`}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                </Link>
                                            </div>
                                        ))
                                    
                                    :
                                        this.state.products.map((item, index)=>(
                                            <div key={index} className="col-12 col-md-6 col-lg-4" style={{border: '1px #e8e6e6 solid', padding: '20px'}} >
                                                <Link to="/item" style={{color: 'black', textDecoration: 'none'}} >
                                                <div className="clean-product-item">
                                                    <div className="image"><Spinner size='lg' /></div>
                                                    <div className="product-name" style={{marginTop: '20px'}}>loading..</div>
                                                    <p style={{margin: '0px', fontSize: '12px', color: 'grey'}}>loading..</p>
                                                    <div className="about">
                                                        <div className="price">
                                                            <h5 style={{marginTop: '10px'}} >{`Rs: loading..`}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                </Link>
                                            </div>
                                        ))}

                                    
                                       
                                </div>


                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>
        </main>
        )
    }
}

const mapStateToProps = state => ({
    items: state.items.items,
  });
  

export default withRouter(connect(mapStateToProps, {getItems})(Cataloge));
