import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Data from './data.js';
import Detail from './Detail';
import {Link, Route, Switch} from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import React , { useContext, useState } from 'react';
import {axios} from 'axios';
import Cart from './Cart';
import { useHistory } from 'react-router-dom';


let 재고context = React.createContext();


function App() {

  let [shoes, shoes변경] = useState(Data);
  let [재고, 재고변경] = useState([10,11,12]);
  
  return (
   
    <div className="App">
      <Navbar bg="light" expand="lg">
      <Container>
      <Navbar.Brand href="/">Auto-Shop</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        {/* <Nav.Link href="/">Home</Nav.Link> */}
        <Nav.Link href="/detail/0">Detail</Nav.Link>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      </Navbar.Collapse>
      </Container>
      </Navbar>
      
     
      <Switch>
      <Route exact path="/"> 
          {/* jumbotron */}	
        <div classname="background">
        <div class="bg-light p-5 rounded-lg m-3">	
          <h1 class="display-4">20% Season sale</h1>	
         
        </div>
        </div>

        <div className="container">
        
        <재고context.Provider  value={재고}>
            <div className="row">
              { 
                shoes.map((a,i)=>{
                  return <Card shoes={shoes[i]} i={i} />
                })
              }
            </div>
        </재고context.Provider>

            <button className="btn btn-primary" onClick={()=>{
              axios.get('https://shop.tridive.io/data2.json')
              .then((result)=>{ 
                console.log(result.data);
                shoes변경( [...shoes, ...result.data ] );

              })
              .catch(()=>{
                console.log('fail')
              })
            }}>더보기</button>


        </div>
      </Route>

      <Route path="/detail/:id">
        <Detail shoes={shoes} 재고={재고} 재고변경={재고변경}/>
        
      </Route>

      <Route path="/cart">
        <Cart></Cart>
      </Route>
      
      </Switch>
      
    </div>
   
  );
}

function Card(props){
  let 재고 = useContext(재고context);
  let history = useHistory();
  
  return (
    <div className="col-md-4" onClick={()=>{ history.push('/detail/'+props.shoes.id) } } >
      
      <img src={ 'https://img.tridive.io/shop/' + (props.i) + '.png' } width="100%"/>
     
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content } & { props.shoes.price }</p>
      
      <p>{재고}</p>
    </div>
  )
}

export default App;
