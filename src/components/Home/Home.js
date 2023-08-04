import React from "react";
import operators from '../../operatorsData';
import { PageContainer, OperatorList, OperatorItem, OperatorForm, Input, Button, Buttons, TabButton, ShelterForm } from './HomeStyle';
import { useState, useRef } from "react";

export default function Home() {
  const [listOfOperators, setListOfOperators] =useState(operators);
  const operatorsCount = useRef(operators.length);
  const [activeTab, setActiveTab] = useState("list-of-operators");  
  const [countMen, setCountMen] = useState (3);
  const [countWomen, setCountWomen] = useState (2);
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
    if (newOperator.gender === 'men') {
      setCountMen(countMen+1);
    } else setCountWomen(countWomen+1);
    operatorsCount.current++;
    const newOperatorGender = newOperator.gender;
    const updateOperator = {
      id: (operatorsCount.current + 1),
      name:"",
      surname:"",
      gender:newOperatorGender,      
    }
    setNewOperator(updateOperator); 
    setValid(false);        
  };  

  const handleDelete = (idToDel, genderToDel) => {
    setListOfOperators(listOfOperators.filter((operator) => operator.id !== idToDel));
    if (genderToDel === 'men') {
      setCountMen(countMen-1)
    } else setCountWomen(countWomen-1);
  };
  const [meters, setMeters] = useState(0);
  const [hours, setHours] = useState(0);
  
  const handleChange2 = (e) => {
    setMeters(e.target.value);
    validateCapacity();
  };
  const handleChange3 = (e) => {
    setHours(e.target.value);
    validateCapacity();
  };
  const [capacity,setCapacity] =useState(false);
  
  const validateCapacity = () => {    
    if ((((countMen*1)+(countWomen*0.5))*hours) < meters) {
      return setCapacity(false);
    } else setCapacity(true);
  };
    const test =() => {
    console.log((((countMen*1)+(countWomen*0.5))*hours))
  };
  return (
    <PageContainer>
      <Buttons>
        <TabButton name="list-of-operators" data-active={activeTab} onClick={() => setActiveTab ('list-of-operators')}>List of Employees</TabButton>
        <TabButton name='shelter-storage' data-active={activeTab} onClick={() => setActiveTab('shelter-storage')}>Tasks</TabButton>
      </Buttons>
      {(activeTab === 'list-of-operators') &&
      <>
        <OperatorList name='operatorList'>
          {listOfOperators.map((operator) => {
            return(
              <OperatorItem key={operator.id}>
                {operator.name}  {operator.surname} - {operator.gender}
                <button
                style={{
                    color: 'black',
                    fontWeight: 'bolder',
                    border: 2 + 'px solid #D9C0AE',
                    borderRadius: 50 + '%',
                    height: 25 + 'px', 
                    width: 25 + 'px' 
                }}
                onClick={() => {handleDelete(operator.id, operator.gender)}}>
                X
                </button>
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
      </>}
      {activeTab === 'shelter-storage' &&
      <>
        <h3 style={{color: '#73453F'}}>PLANNING EXCAVATION WORKS</h3>
        <p>MEN: {countMen} </p>
        <p>WOMEN: {countWomen} </p>
        <ShelterForm>
          <Input 
          type="number"
          min="0"
          placeholder="Enter meters"        
          onChange={handleChange2}/>          
          <Input 
          type="number"
          min="0"
          placeholder="Enter hours"   
          onChange={handleChange3}/>                                
          <Button disabled={!capacity} onClick={test}>Work planning</Button>        
        </ShelterForm>
      </>}  
    </PageContainer>  
  )  
}
