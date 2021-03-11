import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

const EditProductPrivate = ({ children, ...rest }) => {
    const x = useSelector(x => x.auth.user)
    //console.log(x)
    let token=localStorage.getItem('auth_token')
    //console.log(token)
    return (
        <Route
      {...rest}
      render={({ location }) =>
        x.role==='Admin' ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default EditProductPrivate;