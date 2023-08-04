import React from "react";
import operators from '../../operatorsData';
import { PageContainer, OperatorList, OperatorItem, OperatorForm, Input, Button } from './HomeStyle';
import { useState } from "react";

export default function Home() {
  const [listOfOperators, setListOfOperators] =useState(operators);
  const [newOperator, setNewOperator] = useState({
    id: (listOfOperators.length > 0 ? Math.max(...listOfOperators.map(operator => operator.id)) + 1 : 1),
    name:"",
    surname:"",
    gender: ""
  });
  const [valid, setValid] = useState(false);
  
  const handleChange = (e) =>{
    const updateOperator = {...newOperator, [e.target.name]: e.target.value};
    setNewOperator(updateOperator); 
    validateData(updateOperator);   
  };
  const validateData = (operator) => {
    if (operator.gender === "") {
      return setValid(false);
    } else if (operator.name.trim().length === 0) {
      return setValid(false);
    }else if (operator.surname.trim().length === 0) {
      return setValid(false);
    }
    setValid(true);
  };

  const handleAdd = () =>  {
    setListOfOperators((listOfOperators) => {
      return [...listOfOperators, newOperator];
    });
    const newOperatorId = newOperator.id + 1;
    const newOperatorGender = newOperator.gender;
    const updateOperator = {
      id: newOperatorId,
      name:"",
      surname:"",
      gender:newOperatorGender,      
    }
    setNewOperator(updateOperator); 
    setValid(false);
  };  
  return (
    <PageContainer>
      <OperatorList name='operatorList'>
        {listOfOperators.map((operator) => {
          return(
            <OperatorItem key={operator.id}>{operator.name}  {operator.surname} - {operator.gender}
            </OperatorItem>
          )
        })}
      </OperatorList>   
      <OperatorForm>
        <Input
          type='text'
          placeholder='jmeno'
          name='name'
          value={newOperator.name}
          onChange={handleChange} />       
        <Input 
          type='text'
          placeholder='surname'
          name='surname'
          value={newOperator.surname}
          onChange={handleChange}/>        
        <Input 
          type='radio'
          name='gender'
          value='men'                                     
          onChange={handleChange}         
          />MEN       
        <Input 
          type='radio'
          name='gender'
          value='women'           
          onChange={handleChange}         
          />WOMEN  
        <Button disabled={!valid} onClick={handleAdd}>Add Employee</Button>
      </OperatorForm>
    </PageContainer>  
  )  
}
