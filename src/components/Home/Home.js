import React from "react";
import operators from '../../operatorsData';
import { PageContainer, OperatorList, OperatorItem } from './HomeStyle';
import { useState } from "react";

export default function Home() {
  const [listOfOperators, setListOfOperators] =useState(operators);
  return (
    <PageContainer>
      <OperatorList name='operatorList'>
        {listOfOperators.map((operator) => {
          return(
            <OperatorItem key={operator.id}>{operator.name} / {operator.surname} / {operator.age}
            </OperatorItem>
          )
        })}
      </OperatorList>
    </PageContainer>
  )  
}
