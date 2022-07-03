import React from 'react';
import MenubarUser from './../../layouts/MenubarUser';

const HomeUser = () => {
  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-md-2">
          <MenubarUser />
        </div>

        <div className="col">
          <div className='row'>
            <h1> Home user</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeUser;
