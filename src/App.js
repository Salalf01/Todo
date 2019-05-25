import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import moment from 'moment';


class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('todo');
    this.unsubscribe = null;
    this.state = {
      Todos: [],
      // isSignedIn: false
    }
  }
  //     uiConfig = {
  //       signInFlow: "popup",
  //       signInOptions: [
  //         firebase.auth.GoogleAuthProvider.PROVIDER_ID
  //       ],
  //       callbacks: {
  //         signInSuccess: () => false
  //       }
  //     }

  // componentDidMount = () => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     this.setState({ isSignedIn: !!user })
    
  //   })
  // }
  


  onCollectionUpdate = (querySnapshot) => {
    const Todos = [];
    querySnapshot.forEach((doc) => {
      const { todo, date } = doc.data();
      Todos.push({
        key: doc.id,
        doc, // DocumentSnapshot
        todo,
        date
      });
    });
    this.setState({
      Todos
    });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
        // <div>
        // {this.state.isSignedIn ? (
        //   <div>
        //     <nav className="navbar navbar-light bg-light">
        //         <img alt="profile"
        //           src={firebase.auth().currentUser.photoURL} className="d-inline-block align-top profile">
        //       </img>
        //         Welcome {firebase.auth().currentUser.displayName}
                
              
        //     </nav>
        //     <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            
      
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    Lista de Tareas
            </h3>
                </div>
                <div className="panel-body">
                  <h4><Link to="/create">Agregar Tarea</Link></h4>
                  {this.state.Todos.map(Todo =>
                    <div className="card text-white bg-dark mb-3 cards" >
                      <div className="card-header">Tarea</div>
                      <div className="card-body">
                        <h5 className="card-title title"><Link to={`/show/${Todo.key}`}>{Todo.todo}</Link></h5>
                        <p className="card-text">{moment(new Date(Todo.date)).fromNow()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            // </div>
       
          
        // ) : (
        //     <StyledFirebaseAuth
        //       uiConfig={this.uiConfig}
        //       firebaseAuth={firebase.auth()}
        //     />
        //   )
        // }
        // </div>
      
      
    );
  }
}

export default App;
