import React,{useEffect,useState,useMemo} from 'react';
import axios from 'axios';
import Pagination from "./Pagination";
import Search from "./Search";
import TableHeader from './Header'
import Navbar from '../../../Navbar';
import Sidebar from '../../../Sidebar';
import {Container,Row,Col,Button,Modal,Table} from "react-bootstrap";
import {Link,Redirect} from "react-router-dom";

function AdminViewAll()
{
    const [token,setToken]=useState(localStorage.getItem("token"))
   
    const [details,setDetails]=useState([]);
    const [changeStatus,setChangeStatus]=useState('');
    const [show,setShow]=useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [updateUser,setUpdateUser]=useState('')
    const [updatetime,setUpdatetime]=useState('')

    const ITEMS_PER_PAGE = 10;

    const Data = useMemo(() => {
        let a = details;

        if (search) {
            a = a.filter(
                comment =>
                    comment.username.toLowerCase().includes(search.toLowerCase()) ||
                    comment.firstname.toLowerCase().includes(search.toLowerCase()) ||
                    comment.lastname.toLowerCase().includes(search.toLowerCase()) ||
                    comment.appointDate.toLowerCase().includes(search.toLowerCase()) ||
                    comment.appointTime.toLowerCase().includes(search.toLowerCase()) ||
                    comment.status.toLowerCase().includes(search.toLowerCase()) ||
                    comment.bookedOn.toLowerCase().includes(search.toLowerCase()) ||
                    comment.year.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(a.length);

        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            a = a.sort(
                (a1, b1) =>
                    reversed * a1[sorting.field].localeCompare(b1[sorting.field])
            );
        }
        return a.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [details, currentPage, search, sorting]);

     const headers=[
        {
            name:'Student Details',
            field:'studentDetails',
        },
        
        {
            name:'Current Year',
            field:'year',
            sortable: true
        },
        {
            name:'Appointment Details',
            field:'appointDetails',
            sortable: true
        },
        
        {
            name:'Booked On',
            sortable: true,
            field:'bookedOn'
        },
        {
            name:'Status',
            field:'status',
            sortable: true
        },
        {
            field: 'cancel',
            name:'Cancel TC Appointment',
          },
          {
              field:'update',
              name:'Update TC Appointment Status'
          }
     ]
     
        useEffect ( () => { 
        axios.get('http://localhost:3002/viewAdminAll/').then(res => {
            console.log(res.data)
            setDetails(JSON.parse(res.data))
            })
          },[])
         
          const cancel=(username,date) => (e) => { 
            e.preventDefault(); 
            axios.post('http://localhost:3002/adminCancel',{username:username,date:date}).then((response) => {
                console.log(response)
                if(response.data==='deleted')
                {
                    alert('Appointment has been cancelled!')
                    window.location='/adminViewAll';
                }
                });
         }

        const statusHandler = (event)=>{
            console.log(`${event.target.value}`)
            setChangeStatus(event.target.value)
        }

        const handleClose= () => {             
                window.location='/AdminViewAll';
                setShow(false);
        }

        const submitHandler=()=>{
            console.log('inside cancel submit')
            axios.post('http://localhost:3002/adminUpdate',{username:updateUser,date:updatetime,status:changeStatus}).then((response) => {
                console.log(response)
                if(response.data==='updated')
                {
                    alert('Appointment status changed successfully!')
                    window.location='/adminViewAll';
                }
                });
                setShow(false);
        }

        const handleShow = (username,time)=>() => 
        {
            console.log('inside show')
            setUpdateUser(username)
            setUpdatetime(time)
            setShow(true);
        }
      
        if(token===null)
        {
            return  <Redirect to="/AdminLogin"/>
        }
        return (
             <Container fluid className="fontClass">
                <Row>
                   < Navbar/>
                </Row>
            <Row>
                <Col xs={2} id="sidebar-wrapper">      
                  <Sidebar />
                </Col>
               
               
                <Col  style={{paddingTop:'50px'}} xs={10} >

                <div className="row w-100">
                <div className="col mb-3 col-12 text-center">
                    <div className="row">
                        <div className="col-md-6">
                        <Pagination
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                            />
                    </div>
                    <div className="col-md-6 d-flex flex-row-reverse">
                    <Search
                                onSearch={value => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            />
                    </div>
                    </div>
                    <Table striped bordered hover>
                    <table>
                        <TableHeader
                            headers={headers}
                            onSorting={(field, order) =>
                                setSorting({ field, order })
                            }
                        />
                        <tbody>
                            {
                                Data.map( data => 
                                    (
                                        <>
                                        <tr>
                                            <td>{data.username}<br></br>
                                            {data.firstname}<br></br>
                                            {data.lastname}</td>
                                            <td>{data.year}</td>
                                            <td>{data.appointDate}<br></br>
                                            {data.appointTime}</td>
                                            <td>{data.bookedOn}</td>
                                            <td>{data.status}</td>
                                             <td> <Button  style={{width:'2rem'}}className="rounded-pill"size="sm" variant={data.status=='Booked'?'warning':'danger'} disabled={data.status!='Booked'} onClick={cancel(data.username,data.timestamp)}>Cancel</Button></td>
                                            <td> <Button style={{width:'2rem'}}className="rounded-pill" size="sm" variant={data.status=='Booked'?'success':'danger'} disabled={data.status!='Booked'} onClick={handleShow(data.username,data.timestamp)}>Change</Button>
                                            <Modal
                                            show={show}
                                            onHide={handleClose}
                                            backdrop="static"
                                            keyboard={false}
                                          >
                                            <Modal.Header closeButton>
                                              <Modal.Title>Status Change</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div>
                                                <label>Enter status : </label>
                                                <input   name="change" type="text" value={changeStatus}  onChange={statusHandler} />
                                                </div>
                                             </Modal.Body>
                                            <Modal.Footer>
                                              <Button variant="secondary" onClick={submitHandler}>
                                                Change
                                              </Button>
                                            </Modal.Footer>
                                          </Modal> 
                                            </td>
                                        
                                          
                                          </tr>
                                          </>
                                ))
                            }
                        </tbody>
                    </table>
                    </Table>
                    </div>
                    </div>
                  </Col> 
             
            </Row>

        </Container>
        




        )

}
export default AdminViewAll