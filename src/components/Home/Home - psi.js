import React from "react"; 
import { PageContainer, DogList, DogItem, DogForm, Input, Button, Buttons, TabButton, ShelterForm} from "./HomeStyle";  
import dogs from '../../dogsData';
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const dogsCount = useRef(dogs.length);                               //nastavuje defaul value na 5 (delka puvodniho pole)
  const [listOfDogs, setListOfDogs] = useState(dogs);
  const [newDog, setNewDog] = useState({                               //slozene zavorky, protoze je to objekt
    //id:listOfDogs.length>0 ? Math.max(...listOfDogs.map (dog => dog.id)) + 1 : 1,  
    //pokud to pole nebude prazdne, tak hleda max id a pak dosadi id plus 1
    id: dogsCount.current + 1,                                         //zapsano jinym zpusobem nez o radek vyse
    name:"",
    race:"",
    age:"",
  });
  const [valid, setValid] = useState(false);
  const [activeTab, setActiveTab] = useState("list-of-dogs");
  const [ shelterStorage, setShelterStorage] = useState({
    food: 35,
    vaccine: 15,
    pills: 20,
  });
  const [tempStorage, setTempStorage] = useState({                // k ulozeni hodnoty z inputu ve skladu
    food: '',
    vaccine: '',
    pills: '',
  });
  const handleChange = (e) => {                                        //e je event-tedy zapis do inputu
    const updateDog = {...newDog, [e.target.name]: e.target.value};   //e.target a name rika, ze u 1. inputu je to name, u 2. race atd
    setNewDog(updateDog);
    validateData(updateDog);                                                                          
  };
  const dogRequirements = {                                  //min. skladove zasoby pro 1 psa
    food: 5,
    vaccine: 1,
    pills: 2,
  };
  useEffect(() => {
    console.log(listOfDogs)}, [listOfDogs]);                //mel by vypsat seznam psu do konzole a to jen pri zmene listOfDogs

  //validacni fce na form inputs, doplnuje hodnotu do valid pomoci setValid a valid je dosazena do Button nize
  const validateData = (dog) => {                                       
    if (dog.age === "" || parseInt(dog.age) < 0 || parseInt(dog.age) > 24) {
      return setValid(false);
    } else if (dog.name.trim().length === 0) {
      return setValid(false);
    } else if (dog.race.trim().length === 0) {
      return setValid(false);
    }
    setValid(true);
  }; 

  const handleAdd = () => {                                   
    let pushDog = false;
    const totalRequirements = {
      food:(dogRequirements.food * (listOfDogs.length + 1)),
      vaccine:(dogRequirements.vaccine * (listOfDogs.length + 1)),
      pills:(dogRequirements.pills * (listOfDogs.length + 1)),
    }
    if (totalRequirements.food <= shelterStorage.food &&          //zjisteni dostatku zasob pri pridavani psa
        totalRequirements.vaccine <= shelterStorage.vaccine &&
        totalRequirements.pills <= shelterStorage.pills
    ){
      pushDog = true;
    }  
    if (pushDog) {
      setListOfDogs((listOfDogs) => {
        return [...listOfDogs, newDog];                      //updatuje hodnotu pole objektu tim, ze vezme puvodni listOfDogs a prida do nej newDog
      });
      //const newId = newDog.id + 1;                         //je mozne pracovat s dogsCount
    dogsCount.current++;
    const updateDog = {
      //id: newId,
      id: dogsCount.current + 1,                            //je mozne pracovat s dogsCount
      name: '',
      race:'',
      age:''
    }
    setNewDog(updateDog);                                   //zajisti pridani id novemu psovi a vyresetovani 
    setValid(false);                                        //po pridani a resetovani poli opet spusti
    } else {
      alert('Nemáš dost zásob')
    }                      
  };
  const handleDelete = (idToDel) => {
    setListOfDogs(listOfDogs.filter(dog => dog.id != idToDel)) //fce na odebirani psu z listu spojena s tlacitkem
  }; 
  const handleStorage = (e) => {
    const updateStorage = {...tempStorage,[e.target.name]: e.target.value};
    setTempStorage(updateStorage);
  }
  const updateStorage = () => {                                //pricita hodnotu v inputu do zasob
    const storageValue = tempStorage;
    let newStorageValue = {};
    const keys = Object.keys(storageValue);
    //console.log(keys);                                    
    keys.map((key) => {
      if(parseInt(storageValue[key])){                          //pokud storageValue ma hodnotu, tak
        newStorageValue[key] = parseInt(shelterStorage[key]) + parseInt (storageValue[key])   //secte se
      } else {
        newStorageValue[key] = parseInt(shelterStorage[key])
      }
    });
    setShelterStorage(newStorageValue);
    setTempStorage({food:'', vaccine: '', pills: ''})         //hodnotu v inputech se po stisku tlacitka zresetuji
  };
  return (
    <PageContainer>
      <Buttons>
        <TabButton name='list-of-dogs'data-active={activeTab} onClick={() => setActiveTab('list-of-dogs')}>

          
          Seznam psů</TabButton>
        <TabButton name='shelter-storage' data-active={activeTab} onClick={() => setActiveTab('shelter-storage')}>Sklad útulku</TabButton>
      </Buttons>
      {(activeTab === 'list-of-dogs') && 
        <>
          <DogList name='dogList'>
            {listOfDogs.map((dog) => {
              return(
                <DogItem key={dog.id}>{dog.name} / {dog.race} / {dog.age}
                  <button
                    style={{
                      color: '#64766a',
                      fontWeight: 'bolder',
                      border: 2 + 'px solid #64766a',
                      borderRadius: 50 + '%',
                      height: 25 + 'px',
                      width: 25 + 'px'
                    }}
                    onClick={() => {handleDelete(dog.id)}}>          
                      X
                  </button>
                </DogItem>
              )
            })}
          </DogList>
          <DogForm>
            <Input 
              type='text' 
              placeholder='jmeno psa' 
              name='name'
              value={newDog.name}
              onChange={handleChange}/>                       
            <Input 
              type='text' 
              placeholder='rasa psa' 
              name='race'
              value={newDog.race}
              onChange={handleChange}/>  
            <Input 
              type='number' 
              placeholder='vek psa' 
              name='age'
              min='0'
              max='24'
              value={newDog.age}
              onChange={handleChange}/>                  
            <Button disabled={!valid} onClick={handleAdd}>Přidat</Button>
          </DogForm>
        </>} 
      {(activeTab ==='shelter-storage' &&
      <>
        <h3>Aktuální zásoby</h3>
        <p>granule: {shelterStorage.food} kg</p>
        <p>vakcíny: {shelterStorage.vaccine} ks</p>
        <p>medikamenty: {shelterStorage.pills} ks</p>
        <ShelterForm>
            <Input
              type="number"
              min="0"
              placeholder="granule (kg)"
              name="food"
              value={tempStorage.food}
              onChange={handleStorage}
            />
            <Input
              type="number"
              min="0"
              placeholder="vakcíny (ks)"
              name="vaccine"
              value={tempStorage.vaccine}
              onChange={handleStorage}
            />
            <Input
              type="number"
              min="0"
              placeholder="léky (ks)"
              name="pills"
              value={tempStorage.pills}
              onChange={handleStorage}
            />
            <Button onClick={updateStorage}>Doplnit zásoby</Button>
          </ShelterForm>
      </>)}               
    </PageContainer>
  );
}
