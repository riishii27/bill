import React from 'react';
import { useState, useEffect } from 'react';
import {v4 as uuidv4} from "uuid";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import Select from "react-select";

const TableForm = ({description,setDescription,quantity,setQuantity,amount,setAmount,price,setPrice,list,setList,total,setTotal}) => {
    const [isEditing,setIsEditing]= useState(false)

  //Submit Form Functioon  
  const handleSubmit = (e)=>{
        e.preventDefault()

        if (!description && !quantity && !price){
            alert("Please fill in all inputs")
        }
        else{
          const newItems={
            id:uuidv4(),
            description,
            quantity,
            price,
            amount,
        }
        setDescription("")
        setAmount("")
        setQuantity("")
        setPrice("")
        setList([...list,newItems])
        setIsEditing(false)
        }  
    }
    //Calculate item amount funtion
    useEffect(()=>{
        const calculateAmount=(amount)=>{
            setAmount(quantity*price)
        }
        calculateAmount(amount)
    },[amount,price,quantity,setAmount])
    //calculate the total amount of itmems in table
    useEffect(()=>{
      let rows = document.querySelectorAll(".amount")
      let sum = 0
  
      for (let i =0;i<rows.length;i++){
        if (rows[i].className==="amount"){
          sum+=isNaN(rows[i].innerHTML)? 0 :parseInt(rows[i].innerHTML)
          setTotal(sum)
        }
      }
    })
   
    //Edit Function
      const editRow = (id) =>{
        const editingRow = list.find((row)=>row.id ===id)
        setList (list.filter((row)=>row.id!==id))
        setIsEditing(true)
        setDescription(editingRow.description)
        setQuantity(editingRow.quantity)
        setPrice(editingRow.price)

      }
    //Delete Funtion
    const deleterow=(id)=> setList (list.filter((row)=>row.id!==id))
    
    const options = [
      { value: "item1", label: "E" },
      { value: "item2", label: "Item 2" },
      { value: "item3", label: "Item 3" },
      { value: "item4", label: "Item 4" },
    ];
    return (
    <>
    <form onSubmit={handleSubmit}>
    <div className='flex flex-col  md:mt-16'>
    <label htmlFor="description">Item Description</label>
    <input type="text" name='description' id="description" placeholder='Item Description' value={description} onChange={(e)=>setDescription(e.target.value)}/>
    </div>
     
     <div>
     <Select options={options} placeholder="Select an item..." />
     </div>
    <div className='md:grid grid-cols-3 gap-10'>
    <div className='flex flex-col'>
    <label htmlFor="quantity">Quantity</label>
    <input type="text" name='quantity' id="quantity" placeholder='Item quantity' value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
    </div>

    <div className='flex flex-col'>
    <label htmlFor="price">Price</label>
    <input type="text" name='price' id="price" placeholder='Item Price' value={price} onChange={(e)=>setPrice(e.target.value)}/>
    </div>

    <div className='flex flex-col'>
    <label htmlFor="amount">Amount</label>
    <p>{amount}</p>
    </div>
    </div> 
   
    <button type='submit' className="mb-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">{isEditing?"Editing Row Item":"Add Item"}</button>
    </form>  

    {/* {table item}   */}
    
    <table width="100%" className='mb-10'>
    <thead>
           <tr className='bg-gray-100 p-1'>
             <td className='font-bold '>Desciption</td>
             <td className='font-bold '>Quantity</td>
             <td className='font-bold '>Price</td>
             <td className='font-bold '>Amount</td>
           </tr>
    </thead>
        {list.map(({id,description,quantity,price,amount})=>(
         <React.Fragment key={id}>     
         <tbody>
         <tr>
             <td>{description}</td>
             <td>{quantity}</td>
             <td>{price}</td>
             <td className='amount'>{amount}</td>
             <td><button onClick={()=>deleterow(id)}><AiFillDelete className='text-red-500 font-bold text-xl'/></button></td>
             <td><button onClick={()=>editRow(id)}><FaEdit className=' text-green-500 font-bold text-xl'/></button></td>
           </tr>
         </tbody>
         </React.Fragment>
          ))}
        </table>
          <div>
            <h2 className='flex items-end justify-end text-gray-800 text-4xl font-bold'>Rs:{total.toLocaleString()}</h2>
          </div>
    </>
  )
}

export default TableForm
