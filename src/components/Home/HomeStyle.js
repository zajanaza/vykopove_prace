import styled from 'styled-components';

export const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  background-color: #D9C0AE;
`;

export const OperatorList = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    background: transparent;
`;

export const OperatorItem = styled.div`
    display: flex;
    height: 45px;
    padding: 0 15px;
    align-items: center;
    justify-content: space-between;
    background-color: #BE8A7B; 
    &:nth-child(even) {
      background-color: #8E2446;
    }
`;
export const OperatorForm = styled(OperatorList)`
flex-direction: row;
margin: 50px 0;
padding-top: 0;
justify-content: space-between;
align-items: center;
`;

export const Input = styled.input`
width: 130px;
height: 25px;
padding-left: 10px;
`;

export const Button = styled.button`
width: 330px;
height: 40px;
background-color: black;
color:#D9C0AE;
border:none;
border-radius: 5px;
`;

export const Buttons = styled(OperatorForm)`          
  margin: 30px 0;
  height: 40px;
`;

export const TabButton = styled.button`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 48%;
  border: 1px solid white;
  color: white;
  font-size: 20px;
  cursor: pointer;
  background-color: transparent;
  ${(props) =>{
    if (props.name === props['data-active']){              //zmena pozadi tlacitka pri aktivaci vyberu
      return `
        background-color: black`;
    }
  }}
`;

export const ShelterForm = styled(OperatorForm)`          

    flex-direction: column;

`;     

export const TabButton2 = styled(TabButton)`

`;