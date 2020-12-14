import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, InputGroup, InputGroupAddon, Input, Button  } from 'reactstrap';

const Search = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
      <div style={{ padding: '30px', marginTop: '40px', marginBottom: '20px'}} >
        <Container style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}} >
            <Dropdown isOpen={dropdownOpen} toggle={toggle}  style={{marginRight: '50px'}} >
                <DropdownToggle caret className='drop-categories' >Categories</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>Foo Action</DropdownItem>
                    <DropdownItem>Bar Action</DropdownItem>
                    <DropdownItem>Quo Action</DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <InputGroup style={{maxWidth: '800px', boxShadow:'0 .125rem .25rem rgba(0,0,0,.075)'}} >
                <Input placeholder="Search your wish..." />
                <InputGroupAddon addonType="prepend"><Button className="theme" style={{width: '200px'}} >Search</Button></InputGroupAddon>
            </InputGroup>
        </Container>
    </div>
    
  );
}

export default Search;