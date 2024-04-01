import React,{useEffect,useState,useMemo} from 'react';
import axios from 'axios';
import { useTable,useSortBy,usePagination } from 'react-table'
import { COLUMNS } from './column';
import Navbar from '../../../Navbar';
import SidebarUser from '../../../SidebarUser';
import {Container,Row,Col,Table} from "react-bootstrap";
import {Redirect} from "react-router-dom"

function Viewappointments()
{

    const [allAppoint,setAllAppoint]=useState([])
    const [token,setToken]=useState(localStorage.getItem('token'))
    const [username,setUsername]=useState(localStorage.getItem('log'))
    useEffect(()=>
    {   
        var url='http://localhost:3002/viewAll/'+username
        axios.get(url).then(res => {
            console.log(res.data)
           setAllAppoint(JSON.parse(res.data))
            })
        },[])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
    }=useTable({
        columns:COLUMNS,
        data: allAppoint
    },
    useSortBy,usePagination)
    const {pageIndex,pageSize}=state

        if(token===null)
        {
            return  <Redirect to="/UserLogin"/>
        }
        return(
            <>
            <Container fluid className="fontClass">
                <Row>
                   < Navbar/>
                </Row>
            <Row>
                <Col xs={2} id="sidebar-wrapper">      
                  <SidebarUser />
                </Col>
                <Col xs={2} >      
                  <h2 style={{color:"#1f2635",fontSize:'20px'}}className="welcome">TC Appointments</h2>
                </Col>
                <Col  xs={5} style={{padding:'120px 0px 10px 10px'}} >
                <Table striped bordered hover>
          <table {...getTableProps()}>
              <thead >
                  {
                      headerGroups.map((headerGroup)=>(
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column)=>(
                             <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                             <span>
                                 {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼' ):''}
                             </span>
                             </th>
                            ))}
                    </tr>
                      ))
                  }
                 
              </thead>
              <tbody {...getTableBodyProps()}>
                  {
                      page.map((row)=>{
                          prepareRow(row)
                          return(
                            <tr {...row.getRowProps()}>
                                {
                                  row.cells.map((cell)=>{
                                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                  })
                                }
                        </tr>
                          )
                      })
                  }
                  
              </tbody>
          </table>
          </Table>
          <div class="row">
            <div class="col-sm-4">
              <span>
                  Page{' '}
                  <strong>
                      {pageIndex+1} of {pageOptions.length}
                  </strong>{' '}
              </span>
           
              </div>
              
             <div class="col-sm-4">
          
          <button onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous</button>
          <button onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
         
          </div>
          </div>
                  </Col> 
            </Row>
        </Container>
        </>
        )
}
export default Viewappointments