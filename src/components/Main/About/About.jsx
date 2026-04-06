import React, { use } from 'react';
import { Outlet, useNavigate } from 'react-router';

const About = ({ postData }) => {
  const navigation = useNavigate() //Navigate is the path link for onClick, and set path in onclick
  const post = use(postData) //Api data received
  return (
    <div className='space-y-3'>
      {post.map(item => <div key={item.id} className='p-3 border max-w-md'>
        <div className='line-clamp-1'>{item.title}</div>
        <button onClick={()=>navigation(`/aboutDetails/${item.id}`)} className='hover:underline'>See More</button>
      </div>)}
    </div>
  );
};

export default About;
