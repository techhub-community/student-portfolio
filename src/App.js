
import './App.css';
import './styles/output.css'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Main from './pages/Main';
import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { SetUser, SetWorks } from './redux/actions/_appAction';
import Profile from './pages/Profile';


function App({SetUser,SetWorks}) {

React.useEffect(()=>{
  const getUser = async ()=>{
    try{
      const r = await axios.get('https://student-portfolio-server.herokuapp.com/user',{
        headers:{
          'Authorization':Cookies.get('AUTH_TOKEN')
        }
      })
      return r.data;
    }
    catch(e){
      return e.message;
    }
  }



  const getWork = async ()=>{
    try{
      const r = await axios.get('http://localhost:5000/works')
      return r.data;
    }
    catch(e){
      return e.message;
    }
  }

  const token = Cookies.get('AUTH_TOKEN');

  if(token){
    getUser().then((data)=>{
      const {user} = data;
      console.log(user);
      SetUser(user);
    })
  }


  getWork().then((data)=>{
    console.log(data)
    const {works} = data;

    console.log(works)

    SetWorks(works);
  })
})
return (
  <Router>
<div>


<Switch>
<Route exact path="/">
  <Main/>
  </Route>

 
 

  <Route
         exact
          path="/user/:uid"
          render={(props) => {
            const uid = props.match.params.uid;
            return <Profile uid={uid && uid} />;
          }}
         
        />

     
        
        

 
 
</Switch>
</div>
</Router>
);
}

const mapDispatchToprops = (dispatch)=>({
  SetUser:(user)=>dispatch(SetUser(user)),
  SetWorks:(works)=>dispatch(SetWorks(works))
})
export default connect(null,mapDispatchToprops)(App);
