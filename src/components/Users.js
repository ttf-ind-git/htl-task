
import React, { useState, useEffect } from 'react'
// import { Table } from 'react-bootstrap'
import { Button , Row, Col } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';
import { Link, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import Filter from './Filter';
import Chart from './Chart';

const Users = () => {

    const navigate = useNavigate();

    const [users, setUsers] = useState([])
    const [usersForRender, setUsersForRender] = useState([]);
    // const [chartData, setChartData] = useState()

    useEffect(() =>{
        getUsers()
    }, [])

    const getUsers = async () =>{

        const response = await fetch("http://127.0.0.1:8000/api/users/");

        const data = await response.json()
        // console.log("data:",data)
        setUsers(data)
    }


    const mapComponent=(id, lat, lon, name, email)=>{
        navigate('/mapview',{state:{id: id, lat: lat, lon: lon, name: name, email: email}});
    }

    useEffect(() => {

      renderData(users);
       
    }, [users]);


    const renderData = (data) => {

      let postsArray = JSON.parse(JSON.stringify(data));
      let userData = [];
      postsArray.map((item, index) => {
          const id = item.id;
          const lat = item.latitude
          const log = item.longitude
          const name = item.first_name
          const email = item.email

        item.s_no = (
          <h6>{index + 1}</h6>
        );
        item.action = (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              {/* <Link to={`/mapview/${id}`}> <button type="button" className="btn-info btn-sm">View</button> </Link> */}
              <button className="btn-info btn-sm" onClick={()=>{mapComponent(id, lat, log, name, email)}} >View </button>
            </div>
          </div>
        );
        userData.push(item);
      });

        setUsersForRender(userData);

        const table = document.getElementById('export-table');
        table.getElementsByTagName("thead")[1].innerHTML="";

      }
    

        const data = {
          columns: [
            {
                label: 'S.No',
                field: 's_no',
                sort: 'asc',
                width: 100
            },
            {
              label: 'Username',
              field: 'username',
              sort: 'asc',
              width: 150
            },
            {
              label: 'Email',
              field: 'email',
              sort: 'asc',
              width: 270
            },
            {
              label: 'First Name',
              field: 'first_name',
              sort: 'asc',
              width: 200
            },
            {
              label: 'Last Name',
              field: 'last_name',
              sort: 'asc',
              width: 100
            },
            {
                label: 'Created Date',
                field: 'date_created',
                sort: 'asc',
                width: 100
            },
            {
                label: 'Action',
                field: 'action',
                sort: 'asc',
                width: 100
            }
          ],
          rows: usersForRender,
            
        };

      
        const FilterHandle = (start_date, end_date) => {
         
          if(!start_date || !end_date){
            alert("Please select dates..");
            return false;
          }

          if(new Date(start_date) > new Date(end_date)){
            alert("End date must be greater than start date..");
            return false;
          }

          const filteredUsers = users.filter((item) => {
            return new Date(item.date_created) >= new Date(start_date) && new Date(item.date_created) <= new Date(end_date)
          });

          renderData(filteredUsers);


        }

        const handleExport = () => {
         
          const wb = XLSX.utils.book_new();
          const ws = XLSX.utils.table_to_sheet(document.getElementById('export-table'));

          ws['!cols'] = [];
          ws['!cols'][6] = { hidden: true };
          // ws['!cols'][7] = { hidden: true };
          // ws['!cols'][8] = { hidden: true };
          // ws['!cols'][9] = { hidden: true };
          
          XLSX.utils.book_append_sheet(wb, ws, "sheet1");
          XLSX.writeFile(wb, "my_file.xlsx");

        }

        // console.log("users")

        // let result = users.reduce(function (r, a) {
        //     r[a.date_created] = r[a.date_created] || [];
        //     r[a.date_created].push(a);
        //     return r;
        // }, Object.create(null));

        // setChartData(group_by_data)
        
        // convert array to array of objects
        // const arrayOfObj = Object.entries(group).map((e) => ( { [e[0]]: e[1] } ));
        
        // console.log(Object.keys(group));
        // console.log(Object.values(group));
       
       
      
        return (
            <div className="mt-50">
               
               <Row>
                  <Col xs={10}>
                    <Filter FilterDate={FilterHandle} Export={handleExport} />
                  </Col>

                  <Col xs={2}>
                  <button 
                    className="btn btn-primary" onClick={handleExport}>
                    Export
                  </button>
                  </Col>

               </Row>

                <Row>
                  <Col xs={12}>
                      <MDBDataTable
                          id="export-table"
                          striped
                          bordered
                          small
                          data={data}
                      />
                  </Col>
                </Row>
               
            </div>
         
        );
}


export default Users