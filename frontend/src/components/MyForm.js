import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from './Table';

class MyForm extends React.Component {

    constructor(props){
        super(props);
        //console.log("state", this.state);
        this.state = { 
            form: {
                "workname": "",
                "description": "",
                "category": 0,
                "unit": 0,
                "price": 0
            },            
            list: [], 
            unitList: [],
            categoryList: [],
            showUpdateButton: false
        };               
    }   

    componentDidMount() {
        this.getWorks(); 
        this.getUnits();
        this.getCategories(); 
    }

    getWorks = () => {
        this.props.service.getWorks((data) => {
            //console.log ("componentdata", data, )
            this.setState({list: data})   
        });                    
    }

    getUnits = () => {
        this.props.service.getUnits((data) => {
            //console.log ("componentdata-units", data, )
            this.setState({unitList: data})   
        });                    
    }

    getCategories = () => {
        this.props.service.getCategories((data) => {
            console.log ("componentdata-categories", data, )
            this.setState({categoryList: data})   
        });                    
    }

    changeHandler = (event) => {
        //console.log("changeHandler", event.target.name, event.target.value);
        //console.log("+++",event.target.text)
        var tempForm = this.state.form;
        tempForm[event.target.name] = event.target.value
        this.setState({form:tempForm})
    }

    addListItem = (event) => {
        event.preventDefault();
        //console.log("Строчка отправлена", text);
        /*var tempList = this.state.list;*/
        var form = this.state.form
        /*tempList.push(form);
        this.setState({
            list: tempList, 
            form: {
                "workname": "",
                "description": "",
                "category": 0,
                "unit": 0,
                "price": ""
            }       
        }) */ 
        this.props.service.addWorkItem(form); 
        this.getWorks();
        //console.log("state", this.state);
    }

    updateListItem = (event) => {
        event.preventDefault();
        //console.log("Строчка отправлена", text);
        //var tempList = this.state.list;
        var form = this.state.form
        /*tempList.push(form);
        this.setState({
            list: tempList, 
            form: {
                "workname": "",
                "description": "",
                "category": 0,
                "unit": 0,
                "price": ""
            }       
        }) */
        this.props.service.editWorkItem(form); 
        console.log("запись обновлена");
        this.getWorks();
        console.log("компонент обновлен", this.state);
    }


    changeForm = (item) => {
        console.log("changeForm", item)
        this.setState({
            "form": {
                "workname": item.workname,
                "description": item.description,
                "category": item.category,
                "unit": item.unit,
                "price": item.price,
                "_id": item._id
            },
            showUpdateButton: true

        }
            
        )
    }

    render() {

        const unitList = this.state.unitList;
        const units = unitList.map((item, index) => {
            
                return <option key={index} value={item.unitname}>{item.unitname}</option>}
            
        )

        const categoryList = this.state.categoryList;
        const categories = categoryList.map((item, index) => {
            
                return <option key={index} value={item.categoryname}>{item.categoryname}</option>}
            
        )
            return <>
            <Form>
                <Form.Group>
                    <Form.Label>Вид работ</Form.Label>
                    <Form.Control onChange={this.changeHandler} name="workname" type="text" placeholder="Покраска стен" value={this.state.form.workname} />
                    
                </Form.Group>                 

                <Form.Group>
                    <Form.Label>Описание</Form.Label>
                    <Form.Control as="textarea" rows="3" name="description" onChange={this.changeHandler} value={this.state.form.description} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Категория</Form.Label>
                    <Form.Control as="select" name="category" onChange={this.changeHandler}  value={this.state.form.category}>
                        {categories}
                    </Form.Control>
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>Единицы измерения</Form.Label>
                    <Form.Control as="select" name="unit" onChange={this.changeHandler} value={this.state.form.unit}>
                        {units}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Базовая цена</Form.Label>
                    <Form.Control type="text" name="price" onChange={this.changeHandler} value={this.state.form.price} />
                </Form.Group>

                <Button onClick={this.addListItem} variant="primary">Добавить</Button>{' '}
                <Button onClick={this.updateListItem} variant="primary" 
                   disabled={!this.state.showUpdateButton ? "disabled" : null}>Обновить</Button>
            </Form>


        <Table list={this.state.list} 
                     unit={this.state.unitList}
                     removeWorkItem = {this.props.service.removeWorkItem}
                     getWorks = {this.getWorks}
                     changeForm = {this.changeForm}

        />
        </>

                 }
}
        
export default MyForm;
