import React from "react";
import operators from '../../operatorsData';
import { PageContainer, OperatorList, OperatorItem, OperatorForm, Input, Button } from './HomeStyle';
import { useState } from "react";

export default function Home() {
  const [listOfOperators, setListOfOperators] =useState(operators);
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
          name='name' />       
        <Input 
          type='text'
          placeholder='surname'
          name='surname'/>        
        <Input 
          type='radio'
          name='gender'
          value='men'          
          />MEN        
        <Input 
          type='radio'
          name='gender'
          value='women'
          />WOMEN
        <Button>Add Employee</Button>
      </OperatorForm>
    </PageContainer>  
  )  
}
