import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'

import BootstrapTable from 'react-bootstrap-table-next';

import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';  

import paginationFactory from 'react-bootstrap-table2-paginator';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';



const Products = () => {

    const [products, setProducts] = useState([])

    const columns = [{
        dataField: '_id',
        text: 'Product ID',
        sort: true  
      }, 
      {
        dataField: 'name',
        text: 'Product Name',
        sort: true  
      }, 
      {
        dataField: 'brand',
        text: 'Brand',
        sort: true  
      },
      {
        dataField: 'category',
        text: 'Category',
        sort: true  
      },
      {
        dataField: 'price',
        text: 'Price',
        sort: true  
      },
      {
        dataField: 'rating',
        text: 'Rating',
        sort: true  
      },
    ];

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 5,
        lastPageText: '>>',
        firstPageText: '<<',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
          console.log('page', page);
          console.log('sizePerPage', sizePerPage);
        },
        onSizePerPageChange: function (page, sizePerPage) {
          console.log('page', page);
          console.log('sizePerPage', sizePerPage);
        }
      });

    useEffect(() =>{

        const getProducts = async () =>{

            const response = await fetch("http://127.0.0.1:8000/api/products/");
    
            const data = await response.json()
            console.log("data:",data)
            setProducts(data)
        }

        getProducts()
    }, [])

   

  return (
    <div className="mt-50">
        {/* <Table striped bordered hover>
        <thead>
            <tr>
            <th>#</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
            </tr>
        </thead>
        <tbody>
        {products.map((product, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>₹{product.price}</td>
                <td>{product.rating}</td>
            
            </tr>
                
        ))} 
        </tbody>
        </Table> */}

              <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-success mb-3"
                    table="export"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Export Data to Excel Sheet"
              />

        <BootstrapTable id="export" keyField='_id' striped hover data={ products } columns={ columns } filter={ filterFactory() } pagination={pagination}  />

    </div>
  )
}

export default Products