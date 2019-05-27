import React from 'react';
import css from './css/addItem.css';

class AddItem extends React.Component{

	render() {
            	
        return( 
          <form id="addtodo" onSubmit={this.handleSubmit.bind(this)}>
          	<input type="text" placeholder="Add todo" required ref="newItem" />
          	<button id="submit" type="submit">Add</button>
          </form> 
        )
    }

    handleSubmit(e) {
    	e.preventDefault();
      this.props.onAdd(this.refs.newItem.value); 
      this.refs.newItem.value = '';

    }
}

export default AddItem;