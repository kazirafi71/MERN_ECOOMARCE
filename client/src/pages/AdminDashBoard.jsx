import React from 'react';
import AddCategoryModal from '../components/AddCategoryModal';
import ProductModal from '../components/ProductModal';
import ShowProductList from '../components/ShowProductList';

const AdminDashBoard = () => {
    return (
        <div>
            <div>
            <div className="bg-dark text-light text-center py-5">
                <h1 className='py-5'>Admin Dashboard</h1> 
            </div>
        </div>
        <div className="container mt-5">
            <div className="row gy-5 text-center">
                <div className="col-md-4">
                <AddCategoryModal/>
                </div>
                <div className="col-md-4">
                <ProductModal/>
                </div>
                <div className="col-md-4">
                
                </div>
                
                

            </div>
        </div><br/><br/>
        <div className="container">
            <div className="row">
                <ShowProductList/>
            </div>
        </div>
        
        </div>
    );
};

export default AdminDashBoard;