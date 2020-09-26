import React,{useState} from 'react'
import {Navbar,Nav,Button} from 'react-bootstrap'
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { IconButton } from '@material-ui/core';

function MainNav(props) {
//   const [path, setPath] = useState();
//   React.useEffect(() => {
//     setPath(window.location.pathname);
//   },[window.location.pathname]);
  return (
    <React.Fragment>
      <Navbar sticky="top" variant="dark" bg="dark" expand="lg" >
        <Navbar.Brand href="/" >Indian Army</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
            <Nav className="ml-auto mr-auto">
              <Nav.Link  href="/maps">
                <div >Maps</div>
              </Nav.Link>
              
            </Nav>
            {/* <Nav className="ml-auto" style={{display:'contents'}}>
              
              {
                localStorage.getItem('Status') == 'LoggedIn'?
                <IconButton 
                  href={(localStorage.getItem('Designation')==='Teacher')?
                  "/teacher":"/student"}
                >
                  <AccountCircleOutlinedIcon style={{color:'white'}}/>
                </IconButton>:
                <Nav.Link href="/login" className="BottomButton" >
                  <Button  variant="primary">Log in</Button>{' '}
                </Nav.Link>
              }
            </Nav> */}
        </Navbar.Collapse>
      </Navbar>
    </React.Fragment>
  )
}

export default MainNav