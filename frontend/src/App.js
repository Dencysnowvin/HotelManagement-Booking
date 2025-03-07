import './App.css';
import {  Route, Routes } from 'react-router-dom';

import Landingpage from './component/Landingpage';
import Layout from './component/Layout';
import Nav from './component/Nav';
import Registers from './component/Registers';
import Logins from './component/Logins';
import RoomManager from './component/RoomManager';
import ViewRooms from './component/Room/ViewRooms';
import CreateRoom from './component/Room/createroom';
import DeleteRoom from './component/Room/deleteroom';
import UpdateRoom from './component/Room/updateroom';
import CreateBooking from './component/Booking/createBooking';
import ViewBookings from './component/Booking/viewBookings';
import UpdateBookings from './component/Booking/updateBooking';
import RoomListing from './component/Room/RoomListing';
import FindMyBooking from './component/Booking/FindMyBooking';
import About from './component/About';
import RoomDetails from './component/Room/RoomDetails';
import Services from './component/Services';
import DeleteBooking from './component/Booking/deleteBooking';
import CreatePayment from './component/Payment/createPayment';
import UpdatePayment from './component/Payment/updatePayment';
import PaymentTable from './component/Payment/paymentTable';
import FindAllBookings from './component/Booking/FindAllBookings';
import PaymentStatus from './component/Payment/PaymentStatus';







function App() {
  
  return (
    <div align="center">
      <Routes>
      <Route path="/" element={<Landingpage/>}></Route> 
      <Route path="/layout" element={<Layout/>}></Route> 
      <Route path="/nav" element={<Nav/>}></Route> 
      <Route path="/registers" element={<Registers/>}></Route>
      <Route path="/logins" element={<Logins/>}></Route> 
      <Route path="/roomcrud" element={<RoomManager/>}></Route> 
      <Route path="/viewrooms" element={<ViewRooms/>}></Route>
      <Route path="/createroom" element={<CreateRoom/>}></Route>
      <Route path="/deleteroom" element={<DeleteRoom/>}></Route>
      <Route path="/updateroom" element={<UpdateRoom/>}></Route>
      <Route path="/createbooking" element={<CreateBooking/>}></Route>
      <Route path="/updatebookings" element={<UpdateBookings/>}></Route>
      <Route path="/deletebooking" element={<DeleteBooking/>}></Route>
      <Route path="/viewbooking" element={<ViewBookings/>}></Route>
      <Route path="/roomlisting" element={<RoomListing/>}></Route>
      <Route path="/findmybooking" element={<FindMyBooking/>}></Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/roomdetails" element={<RoomDetails/>}></Route>
      <Route path="/services" element={<Services/>}></Route>
      <Route path="/createpayment" element={<CreatePayment/>}></Route>
      <Route path="/updatepayment" element={<UpdatePayment/>}></Route>
      <Route path="/paytable" element={<PaymentTable/>}></Route>
      <Route path="/findallbookings" element={<FindAllBookings/>}></Route>
      <Route path="/paymentstatus" element={<PaymentStatus/>}></Route>
      </Routes>
    </div>

  );
}

export default App;
