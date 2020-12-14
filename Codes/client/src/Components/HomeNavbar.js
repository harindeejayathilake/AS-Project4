import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { logout, getAdmins } from '../actions/authActions'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  Collapse,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Spinner
} from 'reactstrap';

import Login from './Login';
import Register from './Register';

import Logo from '../assests/logoface.png';



class HomeNavbar extends Component {

  state={
    isOpen: false,
    showLogin: false,
    admins: [],
    showReg: false
  }

  componentDidMount=()=>{
    if(this.props.isAuthenticated && this.props.isAdmin){
      this.props.getAdmins().then(res=>{
        this.setState({admins: res})
      })
    }
  }

  toggleLogin=()=>{
    this.setState({showLogin: !this.state.showLogin})
  }
  toggleReg=()=>{
    this.setState({showReg: !this.state.showReg})

  }

  loggingOut=()=>{
    this.props.logout();
    this.props.history.push('/');
  }


  render() {
    return (
      <div>
      <Navbar expand="md" color="info" >
          <Container>
          <NavbarBrand href="/" style={{color: 'white'}}> <img src={Logo} style={{height: '30px', marginRight: '16px'}} alt="logo facade" /> e Cart</NavbarBrand>
          
          {this.props.isAuthenticated && this.props.isAdmin?
            <Collapse isOpen={this.isOpen} navbar>
              <Nav className="mr-auto" navbar >
                <NavItem >
                  <NavLink tag={Link} to={'/dashboard/orders'} style={{color: 'white'}} >Orders</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to={'/dashboard/items'} style={{color: 'white'}}>Items</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar >
                  <DropdownToggle nav caret style={{color: 'white'}}>
                    Buckets
                  </DropdownToggle>
                  <DropdownMenu right>
                    {this.state.admins.length>0?
                      this.state.admins.map((admin, index)=>(
                        <DropdownItem key={index} tag={Link} to={`/dashboard/bucket?admin=${admin._id}`} >{admin.name}</DropdownItem>
                      ))
                    :<DropdownItem ><Spinner size='sm' /></DropdownItem>}

                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink tag={Link} to={'/dashboard/sellers-info'} style={{color: 'white'}}>Sellers</NavLink>
                </NavItem>
              </Nav>
                
              <NavLink style={{cursor:'pointer'}} onClick={this.loggingOut} >Logout</NavLink>
            </Collapse>
            
          :this.props.isAuthenticated?
            <Nav>
              <NavLink className="nav-button" href='/profile'>Profile</NavLink>
              <NavLink className="nav-button" href="/cart">Cart</NavLink>
              <NavLink  className="nav-button" href="/bills">Bills & Orders</NavLink>
              <NavLink  className="nav-button" onClick={this.loggingOut} >Logout</NavLink>
            </Nav>
          
          :
            <Nav>
              <NavLink className="nav-button" onClick={this.toggleReg}>Register</NavLink>
              <NavLink  className="nav-button" onClick={this.toggleLogin} >Login</NavLink>
              <NavLink  className="nav-button" >Contact us</NavLink>
            </Nav>
          }
          
        </Container>
      </Navbar>

      <Login isOpen={this.state.showLogin} toggle={this.toggleLogin} />
      <Register isOpen={this.state.showReg} toggle={this.toggleReg} />
    </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.isAdmin,
});


export default withRouter(connect(mapStateToProps, {logout, getAdmins})(HomeNavbar));