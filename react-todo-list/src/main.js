// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';


// class ToDoComponent extends Component {

//   constructor(props, context) {
//     super(props, context);

//     this.state = {
//      todos : ["washing","reading","cooking","eating"]
//     };
//   };


//     render() {
      
//         return( 
//             <div>
//                <h1>My Details</h1> 
//                <h2>{this.state.msg}</h2> 
//                <h3>{this.props.det.name}</h3>
//                <h3>{this.props.det.age}</h3>
//                <h3>{this.props.det.dob}</h3>
//                </div>

//         )
//     }
// }

// var Details = { name:'Sam', age:22, dob:'5/5/97' }

// ReactDOM.render(<ToDoComponent msg="Hey There!!!" det={Details} />, document.querySelector('#toDoWrapper'));

// import React, { Component } from 'react';
// import ReactDOM from 'react-dom';


// class ToDoComponent extends Component {

//   constructor(props, context) {
//     super(props, context);

//     this.state = {
//      todos : ["washing","readinggg","cooking","eating","shopping"],
//      age: 22
//     };
//   };



//     render() {
      
//       	setTimeout(function(){
//       		this.setState({
//       			todos : ["washing done","reading done","cooking done","eating done","shopping done"],
//      			age: "Died"
//       		})
//       	}.bind(this),3000);

//       	var todos = this.state.todos;
//   	todos = todos.map(function(item,index){
//   		return(
//   			<li>{item}</li>
//   			);
//   		 });

//         return( 
//             <div>
//                <p>The busiest people have the most leisure...</p> 
//                <p>{this.state.age}</p>
//                <ul>{todos}</ul>
//                </div>
               
//         )
//     }
// }


// ReactDOM.render(<ToDoComponent/>, document.querySelector('#toDoWrapper')); 

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ToDoItem from './todoItem';
import AddItem from './addItem';
import {Router, Route, browserHistory, Link} from 'react-router';
import About from './about';
import css from './css/index.css';

class App extends Component{

   render() {
   
        return( 
            <Router history={browserHistory}>
            <Route path={'/'} component={ToDoComponent} ></Route>
			<Route path={'/about'} component={About} ></Route> 
            </Router>   
        )
    }

}

class ToDoComponent extends Component {

  constructor(props, context) {
    super(props, context);

	    this.state = {
	     todos : ["Dummy Task 1","Dummy Task 2","Dummy Task 3"]
	    };
  };



    render() {
      
 {/* setTimeout(function(){
      	 	this.setState({
      	 		todos : ["washing done","reading done","cooking done","eating done","shopping done"],
     		 	age: "Died"
      	 	})
      	  }.bind(this),3000); */}

      	var todos = this.state.todos;
  	todos = todos.map(function(item,index){
  		return(
  			<ToDoItem item={item} key={index} onDelete={this.onDelete.bind(this)} />
  			);
  		 }.bind(this));

		if (todos.length == 0) 
		    {	
		        alert("You don't have any todos left");
		    }

        return( 
            <div id="toDoList">
			   <Link to={'/about'}>About</Link>
               <h3><p onClick={this.clicked}>To-Do List</p></h3>
               <ul>{todos}</ul>
               <AddItem onAdd={this.onAdd.bind(this)} />
               </div>
               
        )
    }

    clicked() {

    	alert("Hey, this is a to-do list!");
    }

    onDelete(item) {
    	
    	var updatedTodos = this.state.todos;
    	updatedTodos = updatedTodos.filter(function(val,index){
    		return item !== val;
    	}.bind(this)); 

    	
  	 	this.setState({
  	 		todos : updatedTodos
  	 	});
      	  
    }

    onAdd(item) {

    	var updatedTodos = this.state.todos;
    	updatedTodos.push(item);
    	this.setState({
    		todos : updatedTodos
    	});
    }
    
}


ReactDOM.render(<App/>, document.querySelector('#toDoWrapper'));
