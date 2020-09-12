import React from 'react';
import * as Icon from 'react-bootstrap-icons';

class Table extends React.Component {

    remove = (id) => {
        //event.preventDefault()
        console.log("event", id)
        this.props.removeWorkItem(id);
        this.props.getWorks();
    }

    edit = (item) => {
        //event.preventDefault()
        console.log("item", item)
        //this.props.removeWorkItem(id);
        //this.props.getWorks();
    }

    render() {
        
        let list = this.props.list;
        const items = list.map((item, index) => {
            
                ///console.log("tttt",item._id)
                return <tr key={index}>
                <td>{index +1}</td>
                <td>{item.workname}</td>
                <td>{item.unit}</td>
                <td>{item.price} р.</td>
                <td><Icon.Trash type='button' onClick={() => this.remove(item._id)} /></td>
                <td><Icon.PencilSquare type='button' onClick={() => this.props.changeForm(item)} /></td>
           </tr>
            }
        )
        
        //console.log("tablelist",this.props.list)
         return <table>
             <tbody>
                 <tr>
             <th>№ </th>
             <th>Вид работ</th>
             <th>Ед. изм.</th>
             <th>Цена за ед.</th>
             <th>Удалить</th>
             <th>Редактировать</th>

         </tr>
         
         {items}
         </tbody>
        
     </table>
    }
}

export default Table;