import React,{useEffect,useState,useMemo} from 'react';
import axios from 'axios';
import { useTable,useGlobalFilter,useSortBy,usePagination} from 'react-table'
import {FeeColumns} from './FeeColumns';
import {GlobalFilter} from './GlobalFilter'
import Navbar from '../../Navbar';
import Sidebar from '../../Sidebar';
import {Container,Row,Col,Button,Table,OverlayTrigger,Tooltip} from "react-bootstrap";
import {Link,Redirect} from "react-router-dom";

function FeePayments()
{
  
  const [token,setToken]=useState(localStorage.getItem("token"))

  const [allDetails,setAllDetails]=useState([])
  useEffect ( () => {
    axios.get('http://localhost:3002/adminViewFeeDetails').then((response) => {
        console.log(response)
        setAllDetails(JSON.parse(response.data))
        })
    },[])

    const sendMail = (e) => {
        
      axios.get("http://localhost:3002/mail")
      .then((response) => {
          alert("Fee Reminder emails sent successfully!");
      });

    }
 
    const columns=useMemo(()=>FeeColumns,[])
    const data=useMemo(()=>allDetails,[])

    const{
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
        gotoPage,
        pageCount,
        setPageSize,
        setGlobalFilter
    }=useTable({
        columns:FeeColumns,
        data: allDetails
    },
    useGlobalFilter,useSortBy,usePagination)
    const {pageIndex,pageSize,globalFilter}=state
    
      if(token===null)
      {
        return  <Redirect to="/AdminLogin"/>
      }
    return(
      <>
     
      <Container fluid className="fontClass">
            <Row>
               < Navbar/>
            </Row>
        <Row>
            <Col xs={2} id="sidebar-wrapper">      
              <Sidebar />
            </Col>
            <Col xs={1} id="sidebar-wrapper">      
              
            </Col>
            
            <Col  xs={7} style={{paddingLeft:'90px',padding:'80px 0px 0px 30px'}}>
              <Row style={{paddingBottom:'10px'}}>
                <Col xs={5}>
              <GlobalFilter  filter={globalFilter} setFilter={setGlobalFilter}/>
              </Col>
              <Col xs={3}></Col>
<Col xs={3}>
<OverlayTrigger    
    key={'top'}
    placement={'top'}
    overlay={
      <Tooltip id={`tooltip-${'top'}`}>
        Send a fee reminder email to all the students.
      </Tooltip>
    }
  >
    <Button size="md" className="rounded-pill"style={{width: '8rem'}}variant="danger" onClick={sendMail}>Send Fee Reminders</Button>
  </OverlayTrigger>
  </Col>
              </Row>
           
             


<Row>
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
          </Row>
          <div class="row">
            <div class="col-sm-4">
              <span>
                  Page{' '}
                  <strong>
                      {pageIndex+1} of {pageOptions.length}
                  </strong>{' '}
              </span>
              <span>
                  |Go to page:{' '}
                  <input type='number' defaultValue={pageIndex+1}
                  onChange={e=>{
                      const pageNumber = e.target.value ? Number(e.target.value) -1:0
                      gotoPage(pageNumber)
                  }}
                  style={{width:'50px'}}
                  />
              </span>
              </div>
              <div class="col-sm-4">
              <select value={pageSize} onChange={e=>setPageSize(Number(e.target.value))}>
                  {
                      [10,25,50].map(pageSize=> (
                          <option key={pageSize} value={pageSize}>
                              show {pageSize}
                          </option>
                      ))
                  }
              </select>
              </div>
              <div class="col-sm-4">
          <button onClick={()=>gotoPage(0)} displayed={!canPreviousPage}>
              {'<<'}
          </button>
          <button onClick={()=>previousPage()} disabled={!canPreviousPage}>Previous</button>
          <button onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
          <button onClick={() => gotoPage(pageCount-1)} disabled={!canNextPage}>
              {'>>'}
          </button>
          </div>
          </div>
            </Col> 
          </Row>
          </Container>
          </>
    )
  }
export default FeePayments