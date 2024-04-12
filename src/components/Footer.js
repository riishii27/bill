import React from 'react'

const Footer = ({name,email,website,address,phone,bankAccount,bankName}) => {
  return (
    <div>
      <footer className='footer border-t-2 border-gray-300 pt-5'>
        <ul className="flex flex-wrap items-center justify-center">
          <li><span className="font-bold">Your Name:</span>{name}</li>
          <li><span className="font-bold">Your Email:</span>{email}</li>
          <li><span className="font-bold">Phone no:</span>{phone}</li>
          <li><span className="font-bold">Bank:</span>{bankName}</li>
          <li><span className="font-bold">Account holder name:</span>{name}</li>
          <li><span className="font-bold">Account number:</span>{bankAccount}</li>
          <li><span className="font-bold">Website:</span><a href={website} target='_blank' rel='noopenner noreferrer'>{website}</a></li>
        </ul>
      </footer>
    </div>
  )
}

export default Footer
