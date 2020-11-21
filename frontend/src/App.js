import React from 'react';
import './App.css';

import Header from './components/Header';
import Main from './components/Main';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
const logo = "Делаю-ремонт.рф";

class App extends React.Component {

  constructor(props){
    super(props);
    
    console.log("service", props);        
}

//LOGIN API
  
login = (user) => {
  let loginObject = {
    method:"POST",
    mode:"cors",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(user)
    }
  fetch("/login",loginObject).then((response) => {
    if(response.ok) {
      response.json().then((data)=> {
        this.setState({
          token:data.token,
          isLogged:true
        })
        this.getList(data.token);
      }).catch((error) => {
        console.log(error)
      })
    } else {
      alert("Wrong credentials");
    }
  }).catch((error) => {
    console.log(error)
  })
}
register = (user) => {
  let registerObject = {
    method:"POST",
    mode:"cors",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(user)
    }
  fetch("/register",registerObject).then((response) => {
    if(response.ok) {
      alert("Register successful!");
    } else {
      alert("Username already in use");
    }
  }).catch((error) => {
    console.log(error)
  })
}	

logout = () => {
  let logoutObject = {
    method:"POST",
    mode:"cors",
    credentials:"include",
    headers:{"Content-Type":"application/json"}
    }	
  fetch("/logout", logoutObject).then((response) => {
    if(response.ok) {
      this.setState({
        token:"",
        isLogged:false
      })
    } else {
      console.log("Server responded with status:"+response.status)
    }
  }).catch((error) => {
    console.log(error);
  })
}


  render () {
    return (
      <div className="App">
        <Container>
          <Header text={logo}/>
          <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
          <Main service={this.props.service} />
        </Container>       
        
      </div>
    );
  }
  
}

export default App;
