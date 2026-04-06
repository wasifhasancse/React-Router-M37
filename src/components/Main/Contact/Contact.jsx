import React from 'react';
import { Link, useLoaderData } from 'react-router';

const Contact = () => {
  const userData = useLoaderData()
  return (
    <div className='space-y-3'>
      {userData.map(item =>
      <div key={item.id} className='p-3 border'>
        <div>{item.name}</div>
        <div>{item.email}</div>
        <Link to={`/contactDetails/${item.id}`}>See More</Link>
      </div>)}
    </div>
  );
};

export default Contact;
