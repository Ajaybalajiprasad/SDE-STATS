'use client'
import { useState } from 'react';
import UserForm from '@/components/AccountForm';

const Home = () => {
  const [userDetails, setUserDetails] = useState(null);

  return (
    <div>
      <UserForm setUserDetails={setUserDetails} />
    </div>
  );
};

export default Home;
