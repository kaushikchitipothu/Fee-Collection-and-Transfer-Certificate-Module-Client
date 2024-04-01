import './App.css';
import {BrowserRouter as Router,Switch,Route } from 'react-router-dom';

import Home from './components/pages/Home';
import ResetPassword from './components/pages/ResetPassword';
import ForgotPassword from './components/pages/ForgotPassword';

import UserLogin from'./components/pages/user/UserLogin';
import User from './components/pages/user/User';
import Profile from './components/pages/user/Profile';
import FeeDetails from './components/pages/user/FeeDetails';
import BookingHome from './components/pages/user/slotBooking/Home';
import Book from './components/pages/user/slotBooking/book';
import View from './components/pages/user/slotBooking/view';
import Cancel from './components/pages/user/slotBooking/Cancel';
import Timeslot from './components/pages/user/slotBooking/timeslot';
import PayFee from './components/pages/user/payFee'
import History from './components/pages/user/History'


import AdminViewAll from './components/pages/admin/slotBooking/AdminViewAll'
import AdminLogin from './components/pages/admin/AdminLogin';
import AdminHome from './components/pages//admin/AdminHome';
import AdminFee from './components/pages/admin/AdminFee';
import FeePayments from './components/pages/admin/FeePayments';


function App() {
  return (
    <>
    <Router>
      <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/ForgotPassword' component={ForgotPassword}></Route>
      <Route path='/ResetPassword' component={ResetPassword}></Route>

      <Route path='/UserLogin' component={UserLogin}></Route>
      <Route path='/User' component={User}></Route>
      <Route path='/Profile' component={Profile}></Route>
      <Route path='/FeeDetails' component={FeeDetails}></Route>
      <Route path='/bookingHome'><BookingHome /></Route>
      <Route path='/book'><Book /></Route>
      <Route path='/view'><View /></Route>
      <Route path='/cancel'><Cancel /></Route>
      <Route path='/timeslot/:id' component={Timeslot}></Route>
      <Route path='/PayFee'><PayFee/></Route>
      <Route path='/History'><History/></Route>
        
      <Route path='/AdminLogin' component={AdminLogin}></Route>
      <Route path='/AdminHome' component={AdminHome}></Route>   
      <Route path='/AdminFee' component={AdminFee}></Route>
      <Route path='/FeePayments' component={FeePayments}></Route>  
  
      <Route path='/AdminViewAll'><AdminViewAll /></Route>     
      </Switch>
    </Router>
    </>
  );
}

export default App;