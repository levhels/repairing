import React from 'react';
import * as Icon from 'react-bootstrap-icons';

class Table extends React.Component {

    remove = (id) => {
        console.log("event", id.target.name)
        this.props.removeWorkItem(id);
    }

    render() {
        
        let list = this.props.list;
        const items = list.map((item, index) => {
            if (item.workname) {
                ///console.log("tttt",item._id)
                return <tr key={index}>
                <td>{index +1}</td>
                <td>{item.workname}</td>
                <td>{item.unit}</td>
                <td>{item.price} р.</td>
                <td><button onClick={(item._id) = this.remove}><Icon.Trash name={item._id} /></button></td>
                <td><Icon.PencilSquare onClick={this.editListItem} /></td>
           </tr>}
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