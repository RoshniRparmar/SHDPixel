import {useState} from "react";
import Logo from "./Logo";
import Form from "./form";
import PackingList from "./packingList";
import Stats from "./State";
// import Item from "./Item" ;

export default function App(){
   const[items,setItems]=useState([]);

   function handleAddItems(item){
    setItems((items)=>[...items , item]);
  }

  function handleDeleteItem(id){
    console.log(id);
    setItems((items)=>items.filter((item)=>item.id !== id));
  }

  function handleToggleItem(id){
    setItems((items)=> items.map((item)=>item.id === id ?{...item,packed:!item.packed}:item ));
  }

  
  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return(
    <div className="app">
      <Logo/>
      <Form onAddItems={handleAddItems}/>
      <PackingList  items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} onClearList={handleClearList}/>
      <Stats items={items}/>
    </div>
  );
}

 

