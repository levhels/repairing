import React from 'react';
import './App.css';

import Header from './components/Header';
import Main from './components/Main';
import Container from 'react-bootstrap/Container';

const logo = "Делаю-ремонт.рф";

class App extends React.Component {

  constructor(props){
    super(props);
    
    console.log("service", props);        
}


  render () {
    return (
      <div className="App">
        <Container>
          <Header text={logo}/>
          <Main service={this.props.service} />
        </Container>       
        
      </div>
    );
  }
  
}

export default App;
