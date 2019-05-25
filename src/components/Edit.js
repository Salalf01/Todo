import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: '',
            todo: '',
            date: ''
        };
    }

    componentDidMount() {
        const ref = firebase.firestore().collection('todo').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                const Todo = doc.data();
                this.setState({
                    key: doc.id,
                    todo: Todo.todo,
                    date: Todo.date
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({ Todo: state });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { todo, date} = this.state;

        const updateRef = firebase.firestore().collection('todo').doc(this.state.key);
        updateRef.set({
            todo,
            date
        }).then((docRef) => {
            this.setState({
                key: '',
                todo: '',
                date: ''
            });
            this.props.history.push("/show/" + this.props.match.params.id)
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            EDIT Todo
            </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Coment List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="title">Title:</label>
                                <input type="text" class="form-control" name="title" value={this.state.todo} onChange={this.onChange} placeholder="Todo" />
                            </div>
                            <div class="form-group">
                                <label for="description">Description:</label>
                                <input type="text" class="form-control" name="description" value={this.state.date} onChange={this.onChange} placeholder="Date" />
                            </div>
                            <div class="form-group">
                                <label for="author">Author:</label>
                                <input type="text" class="form-control" name="author"  onChange={this.onChange} placeholder="Time" />
                            </div>
                            <button type="submit" class="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;
