import React from 'react';
import MyForm from './MyForm';

class Main extends React.Component {

    render() {
            return <> <h1>Создание сметы</h1>     
            <p>Здесь вы можете создать свою собственную смету ремонта квартиры. </p>
            <p>Выберите вид работ для добавления в смету  из списка или добавьте свой вид работ.</p>
            <MyForm service={this.props.service} />
         </>
        }
       
}

export default Main;
