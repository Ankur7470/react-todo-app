import React, { useState, useEffect } from 'react'
import "./style.css"

//get local storage back
const getLocalData =()=>{
    const lists=localStorage.getItem("mytodolist");
    if(lists){
        return JSON.parse(lists);
    }
    else{
        return [];
    }
}

const Todo = () => {

    //state variables
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);


    // addItem function
    const addItem = () =>
    {
        if(!inputData){
            alert("please fill the data");
        }
        else if(inputData && toggleButton){
            setItems(
                items.map((curElem) =>{
                    if(curElem.id === isEditItem){
                        return{...curElem, name:inputData}
                    };
                    return curElem;
            })
          );

            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
        }

        else{
            const myNewData ={
                id: new Date().getTime().toString(),
                name:inputData
            }
            setItems([...items,myNewData]);
            setInputData("");
        }
    };

    //to delete items
    const deleteItem =(index) =>
    {
        const updatedItem = items.filter((curElem)=>{
            return curElem.id !== index;
        });
        setItems(updatedItem);
    };
    //to remove all items
    const removeAll =() =>
    {
        setItems([]);
    };
    //to edit items
    const editItem =(index) =>
    {
        const item_todo_edit = items.find((curElem)=>{
            return curElem.id === index;
        });
        setInputData(item_todo_edit.name);
        setIsEditItem(index);
        setToggleButton(true);
    };

    // adding data to local storage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./image/todo (1).png" alt="todologo" />
                        <figcaption><span>Add Your Stuff Here</span> 😊</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder='✍️ Add Item'
                         className='form-control'
                          value={inputData }
                          onChange={ (event)=> setInputData(event.target.value)} />
                        <i className="fa fa-plus add-btn" onClick={addItem}></i>
                    </div>
                    {/* show our items */}
                    <div className="showItems">
                        {/* starting loop */}
                        {items.map((curElem,index) =>{
                                return(
                                    <div className="eachItem" key={curElem.id}>
                                         <h3>{curElem.name}</h3>
                                         <div className="todo-btn">
                                              <i className="far fa-edit add-btn" onClick={()=>editItem(curElem.id)}></i>
                                              <i className="fas fa-trash-alt add-btn" onClick={()=>deleteItem(curElem.id)} ></i>
                                         </div>
                                    </div>
                                );
                        })}
                    </div>

                    {/*  */}
                    <div className="showItems">
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll} ><span>CHECK LIST</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo;
