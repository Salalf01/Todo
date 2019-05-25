import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';


class Create extends Component {

    constructor() {
        super();
        this.ref = firebase.firestore().collection('todo');
        this.state = {
            todo: '',
            date: '',
            
        };
    }
    onChange = (e) => {
        const state = this.state;
        state[e.target.todo] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { todo, date} = this.state;

        this.ref.add({
            todo,
            date
        }).then((docRef) => {
            this.setState({
                todo: '',
                date: ''
            });
            this.props.history.push("/")
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        const { todo } = this.state;
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            Agregar TODO
            </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to="/" class="btn btn-primary">Agregar Tarea</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label for="title">Tarea:</label>
                                <input type="text" class="form-control" name="title" value={todo} onChange={event => this.setState({todo : event.target.value})} placeholder="Title" />
                            </div>
                            <div class="form-group">
                                <label for="description">Fecha:</label>
                                <input
                                    className="form-control"
                                    type="datetime-local"
                                    onChange={event => this.setState({ date: event.target.value })}
                                />
                           
                            </div>
                            
                            <button type="submit" class="btn btn-success">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Create;
