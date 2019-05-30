import React from 'react';
import UserLayout from '../../../hoc/UserLayout';
import ManageBrands from './ManageBrands';
import ManageAttribute1 from './ManageAttribute1';

const ManageCategories =()=>{
  return(
      <UserLayout>
          <ManageBrands/>
          <ManageAttribute1/>

      </UserLayout>
  );
};

export default ManageCategories;