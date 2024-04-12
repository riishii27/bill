import React from "react";
import { useState, useRef } from "react";
import Header  from "./components/Header";
import MainDatails from "./components/MainDatails";
import ClientsDetails from "./components/ClientsDetails";
import Dates from "./components/Dates";
import Table from "./components/Table";
import Notes  from "./components/Notes";
import Footer  from "./components/Footer";
import TableForm from "./components/TableForm";
import ReactToPrint from "react-to-print";



// import { auth } from "./components/firebase";
// import Login from "./components/Login";
// import Signup from "./components/Signup";

function App() {
  // const [user, setUser] = useState(null);
  // const [Lemail, setLEmail] = useState(""); 
  // const [password, setPassword] = useState("");
  const[showInvoice,setShowInvoice]= useState(false)
  const[name,setName]=useState("")
  const[address,setAddress]=useState("")
  const[email,setEmail]=useState("")
  const[phone,setPhone]=useState("")
  const[bankName,setBankName]=useState("")
  const[bankAccount,setBankAccount]=useState("")
  const[website,setWebsite]=useState("")
  const[clientName,setClientName]=useState("")
  const[clientAddress,setClientAddress]=useState('')
  const[invoiceNumber,setInvoiceNumber]=useState("")
  const[invoiceDate,setInvoiceDate]=useState("")  
  const[dueDate,setDueDate]=useState("")
  const[notes,setNotes]=useState('')
  const[description,setDescription]=useState("")
  const[quantity,setQuantity]=useState("")
  const[price,setPrice]=useState("")
  const[amount,setAmount]= useState("")
  const[list,setList]=useState([])
  const[total,setTotal]=useState(0)
  
 
  const componentRef = useRef()

  const validateEmail = (email) => {
    // Use a regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Use a regular expression for basic phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validateWebsite = (website) => {
    // Use a regular expression for basic website validation
    const websiteRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.){1,}([a-zA-Z]{2,})$/;
    return websiteRegex.test(website);
  };

  const validateAccountNumber = (accountNumber) => {
    // Validate if the account number is exactly 17 digits
    const accountNumberRegex = /^\d{8,17}$/;
    return accountNumberRegex.test(accountNumber);
  };
  const isFormValid = () => {
    return validateEmail(email) && validatePhone(phone) && validateWebsite(website) && validateAccountNumber(bankAccount);
  };

  


  const handlePrint =()=>{
    window.print();
} 

// const setLoggedIn = (loggedIn) => {
//   if (loggedIn) {
//     setUser(auth.currentUser);
//   } else {
//     setUser(null);
//   }
// };
// const handleLogin = async () => {
//   try {
//     const userCredential = await auth.signInWithEmailAndPassword(Lemail, password);
//     const user = userCredential.user;
//     console.log("User signed in successfully:", user);
//   } catch (error) {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.error("Login error:", errorCode, errorMessage);
//   }
// };

// const handleSignup = async () => {
//   try {
//     const userCredential = await auth.createUserWithEmailAndPassword(Lemail, password);
//     const user = userCredential.user;
//     console.log("User signed up successfully:", user);
//   } catch (error) {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.error("Signup error:", errorCode, errorMessage);
//   }
// };

  return (
    <>  
    {/* {user ? (  */}
    <main className="p-5 m-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white rounded shadow">
    {showInvoice? (
        <>
        <ReactToPrint trigger={()=><button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">Print / Download</button>}
    content = {()=>componentRef.current}/>
    
        <div ref={componentRef} className="p-5 ">
        <Header handlePrint={handlePrint}/>
        <MainDatails name={name} address={address}/>
        <ClientsDetails clientName={clientName} clientAddress={clientAddress}/>
        <Dates invoiceNumber={invoiceNumber} invoiceDate={invoiceDate} dueDate={dueDate}/>
        <Table  description={description} quantity={quantity} amount={amount} price={price} list={list} setList={setList} total={total} setTotal={setTotal}/>
        <Notes notes={notes}/>
        <Footer name={name} address={address} website={website} email={email} phone={phone} bankAccount={bankAccount} bankName={bankName}/>
          </div> 
          <button onClick={()=>setShowInvoice(false)} className="mt-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">Edit Information</button>
        </> ):(
          <>
          {/* {name address client name invoice number oinvoice datw duedate notes email phone number bank name band acocount number accound holder website} */}
          <div className="flex flex-col justify-center ">
         <article className="md:grid grid-cols-2 gap-10">
          <div className="flex flex-col">
         <label htmlFor="name">Enter Your Name</label>
          <input type="text" name='text' id="name" placeholder="Enter Your Name" autoComplete="off" value={name} onChange={(e)=>setName(e.target.value)}/>
          </div>
          
          <div className="flex flex-col">
          <label htmlFor="address">Enter Your Address</label>
          <input type="text" name='address' id="address" placeholder="Enter Your Address" autoComplete="off" value={address} onChange={(e)=>setAddress(e.target.value)}/>
          </div> 
         </article>
           
           <article className="md:grid grid-cols-3 gap-10">
          <div className="flex flex-col">
          <label htmlFor="email">Enter Your Email</label>
          <input type="email" name='email' id="email" placeholder="Enter Your Email" autoComplete="off" value={email} onChange={(e)=>setEmail(e.target.value)} className={validateEmail(email) ? '' : 'error-input'}/>
          {!validateEmail(email) && (
                <span className="error text-red-500">Invalid email format</span>
              )}
          </div>

          <div className="flex flex-col ">
          <label htmlFor="website">Enter Your Website</label>
          <input type="url" name='website' id="website" placeholder="Enter Your Website" autoComplete="off" value={website} onChange={(e)=>setWebsite(e.target.value)}  className={validateWebsite(website) ? '' : 'error-input'}/>
          {!validateWebsite(website) && (
                <span className="error text-red-500 mb-9">Invalid website format</span>
              )}
          </div>

          <div className="flex flex-col">
          <label htmlFor="phone">Enter Your PhoneNo</label>
          <input type="text" name='phone' id="phone" placeholder="Enter Your Phone Number" autoComplete="off" value={phone} onChange={(e)=>setPhone(e.target.value)}  className={validatePhone(phone) ? '' : 'error-input'}/>
          {!validatePhone(phone) && (
                <span className="error text-red-500 ">Invalid phone number</span>
              )}
          </div>

          </article>
         
         <article className="md:grid grid-cols-2 gap-10">
          <div className="flex flex-col">
          <label htmlFor="bankName">Enter Your Bank Name</label>
          <input type="text" name='bankName' id="bankName" placeholder="Enter Your Bank Name" autoComplete="off" value={bankName} onChange={(e)=>setBankName(e.target.value)}/>
          </div>

          <div className="flex flex-col">
          <label htmlFor="bankAccount">Enter Your Bank Account Number</label>
          <input type="text" name='bankAccount' id="bankAccount" placeholder="Enter Your Website" autoComplete="off" value={bankAccount} onChange={(e)=>setBankAccount(e.target.value)} className={`${
                  validateAccountNumber(bankAccount) ? '' : 'error-input'
                }`}/>
             {!validateAccountNumber(bankAccount) && (
                <span className="error text-red-500">
                  Account number must between 8 - 17 digits
                </span>
              )}   
          </div>
          </article>

          <article className="md:grid grid-cols-2 gap-10 md:mt-16">
          <div className="flex flex-col">
          <label htmlFor="clientName">Enter Client's Name</label>
          <input type="text" name='clientName' id="clientName" placeholder="Enter Client Name" autoComplete="off" value={clientName} onChange={(e)=>setClientName(e.target.value)}/>
          </div>

          <div className="flex flex-col">
          <label htmlFor="clientAddress">Enter Client's Address</label>
          <input type="text" name='clientAddress' id="clientAddress" placeholder="Enter client's address" autoComplete="off" value={clientAddress} onChange={(e)=>setClientAddress(e.target.value)}/>
          </div>
          </article>

          <article className="md:grid grid-cols-3 gap-10 ">
          <div className="flex flex-col">
          <label htmlFor="invoiceNumber">Enter Invoice Number</label>
          <input type="text" name='invoiceNumber' id="invoiceNumber" placeholder="Enter Invoice Number " autoComplete="off" value={invoiceNumber} onChange={(e)=>setInvoiceNumber(e.target.value)}/>
          </div>

          <div className="flex flex-col">
          <label htmlFor="invoiceDate">Enter Invoice Date</label>
          <input type="date" name='invoiceDate' id="invoiceDate" placeholder="Enter Invoice Date" autoComplete="off" value={invoiceDate} onChange={(e)=>setInvoiceDate(e.target.value)}/>
          </div>

          <div className="flex flex-col">
          <label htmlFor="dueDate">Enter Due Date</label>
          <input type="date" name='dueDate' id="dueDate" placeholder="Enter Due Date" autoComplete="off" value={dueDate} onChange={(e)=>setDueDate(e.target.value)}/>
          </div>
          </article>
          
          {/* {this is our table} */}
          <article>
          <TableForm  description={description} setDescription={setDescription} quantity={quantity} setQuantity={setQuantity} amount={amount} setAmount={setAmount} price={price} setPrice={setPrice} list={list} setList={setList} total={total} setTotal={setTotal}/>
          </article>

          <label htmlFor="notes">Additional Notes</label>
          <textarea name="notes" id="notes" cols="30" rows="10" placeholder="Additional Notes to Client's" value={notes} onChange={(e)=>setNotes(e.target.value)}></textarea>

          <button
              onClick={() => {
                if (isFormValid()) {
                  setShowInvoice(true);
                } else {
                  alert("Please fix validation errors before previewing invoice.");
                }
              }}
              className={`bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 ${isFormValid() ? 'border-blue-500 hover:bg-transparent hover:text-blue-500' : 'border-gray-300 cursor-not-allowed'}`}
              disabled={!isFormValid()}
            >Preview Invoice</button>
          </div>
        </>)}
    </main>
     {/* : (
      <div className="p-5 m-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white rounded shadow">
        <Login setLoggedIn={setLoggedIn} handleLogin={handleLogin} setLemail={setLEmail} />
        <Signup setLoggedIn={setLoggedIn} handleSignup={handleSignup} setLemail={setLEmail}/>
      </div>
    ) */}
    </>
  )
}

export default App;
