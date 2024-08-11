import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from "uuid";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import Select from "react-select";

const TableForm = ({ list, setList, total, setTotal }) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [selectedItemValue, setSelectedItemValue] = useState("");

  const handleAddItem = (e) => {
    e.preventDefault();

    if (!description || !quantity || !price) {
      alert("Please fill in all inputs");
      return;
    }

    let newItem = {
      id: uuidv4(),
      description,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      amount: parseInt(quantity) * parseFloat(price),
    };

    // Apply GST based on the selected item, if any
    if (selectedItemValue) {
      const selectedItem = options.find((opt) => opt.value === selectedItemValue);
      if (selectedItem) {
        switch (selectedItem.value) {
          case "item1": // Essential Goods
            newItem.amount *= 1.03; // 3% GST
            break;
          case "item2": // Processed Foods
            newItem.amount *= 1.10; // 10% GST
            break;
          case "item3": // Clothing and Textiles
            newItem.amount *= 1.05; // 5% GST
            break;
          case "item4": // Electronics and Appliances
            newItem.amount *= 1.15; // 15% GST
            break;
          case "item5": // Medicines and Health products
            newItem.amount *= 1.11; // 11% GST
            break;
          case "item6": // Services
            newItem.amount *= 1.14; // 14% GST
            break;
          case "item7": // Default (no additional GST)
            // No GST applied, amount remains as is
            break;
          default:
            break;
        }
      }
    }

    setList([...list, newItem]);
    setDescription("");
    setQuantity("");
    setPrice("");
  };

  const options = [
    { value: "item1", label: "Essential Goods" },
    { value: "item2", label: "Processed Foods" },
    { value: "item3", label: "Clothing and Textiles" },
    { value: "item4", label: "Electronics and Appliances" },
    { value: "item5", label: "Medicines and Health products" },
    { value: "item6", label: "Services" },
    { value: "item7", label: "Default" }, 
  ];

  const deleterow = (id) => {
    const updatedList = list.filter((row) => row.id !== id);
    setList(updatedList);
  };

  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id);
    setDescription(editingRow.description);
    setQuantity(editingRow.quantity.toString());
    setPrice(editingRow.price.toString());
  };

  // Calculate total amount whenever `list` changes
  useEffect(() => {
    const calculatedTotal = list.reduce((acc, item) => acc + item.amount, 0);
    setTotal(calculatedTotal);
  }, [list, setTotal]);

  return (
    <>
      <form onSubmit={handleAddItem}>
        <div className='flex flex-col md:mt-16'>
          <label htmlFor="description">Item Description</label>
          <input
            type="text"
            name='description'
            id="description"
            placeholder='Item Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <Select
            options={options}
            placeholder="Select an item..."
            onChange={(selectedOption) => setSelectedItemValue(selectedOption ? selectedOption.value : "")}
          />
        </div>

        <div className='md:grid grid-cols-3 gap-10'>
          <div className='flex flex-col'>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="text"
              name='quantity'
              id="quantity"
              placeholder='Item quantity'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name='price'
              id="price"
              placeholder='Item Price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="amount">Amount</label>
            <p>{isNaN(quantity * price) ? "" : (quantity * price).toFixed(2)}</p>
          </div>
        </div>

        <button
          type='submit'
          className="mb-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
        >
          Add Item
        </button>
      </form>

      <table width="100%" className='mb-10'>
        <thead>
          <tr className='bg-gray-100 p-1'>
            <td className='font-bold'>Description</td>
            <td className='font-bold'>Quantity</td>
            <td className='font-bold'>Price</td>
            <td className='font-bold'>Amount</td>
            <td className='font-bold'>Actions</td>
          </tr>
        </thead>
        <tbody>
          {list.map(({ id, description, quantity, price, amount }) => (
            <tr key={id}>
              <td>{description}</td>
              <td>{quantity}</td>
              <td>{price}</td>
              <td>{amount.toFixed(2)}</td>
              <td>
                <button onClick={() => deleterow(id)}>
                  <AiFillDelete className='text-red-500 font-bold text-xl' />
                </button>
                <button onClick={() => editRow(id)}>
                  <FaEdit className=' text-green-500 font-bold text-xl' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h2 className='flex items-end justify-end text-gray-800 text-4xl font-bold'>
          Total: Rs {total.toFixed(2)}
        </h2>
      </div>
    </>
  );
};

export default TableForm;
