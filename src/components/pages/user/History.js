import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { useTable,useSortBy} from 'react-table'
import Navbar from '../../Navbar';
import SidebarUser from '../../SidebarUser';
import {HistoryColumn} from './HistoryColumn'
import {Container,Row,Col,Button,Card,Nav,Modal,Table} from "react-bootstrap";
import {Link,Redirect} from "react-router-dom";

function History()
{
    
    const [details,setDetails]=useState([])
    const [token,setToken]=useState(localStorage.getItem('token'))
    const [username,setUsername]=useState(localStorage.getItem('log'))
    useEffect ( () => { 
       var url='http://localhost:3002/feeDetails/'+username
        axios.get(url).then(res => {
            console.log(res.data)
            setDetails(JSON.parse(res.data))
            })
        },[])
        const{
            getTableProps,
            getTableBodyProps,
            rows,
            headerGroups,
            prepareRow,
            
        }=useTable({
            columns:HistoryColumn,
            data: details
        },
        useSortBy)
        
        if(token===null)
        {
            return  <Redirect to="/UserLogin"/>
        }
        return (
        <Container fluid className="fontClass">
                <Row>
                   < Navbar/>
                </Row>
            <Row>
                <Col xs={2} id="sidebar-wrapper">      
                  <SidebarUser />
                </Col>
                <Col xs={1} id="sidebar-wrapper">      
                  
                </Col>
                
                <Col  xs={7} id="page-content-wrapper">
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
                            rows.map((row)=>{
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
            
        </Col> 
        </Row>
    </Container>
    )
}
export default History