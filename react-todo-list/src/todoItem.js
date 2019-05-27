import React from 'react';
import css from './css/todoItem.css';

class ToDoItem extends React.Component {

	  render() {
            	
        return( 
            <li>
            	<div className="todoItem">
            		<span className="itemName">{this.props.item}</span>
            		<i className="itemDel fa fa-trash-alt" onClick={this.handleDel.bind(this)}>  </i>
            	</div>
            </li>
        )
    }

    handleDel() {

    	this.props.onDelete(this.props.item); 
    }

}

export default ToDoItem;