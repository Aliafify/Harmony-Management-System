import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { handelInetialData } from './actions/getData';
import { intializeLogIn } from './actions/login';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/register';
import PartenerRport from './components/parteners/partenerReport';
import AddFinance from './components/parteners/addFinance';
import ClientRport from './components/clients/clientReport';
import AddWorker from './components/worker/addWorker';
import Parteners from './components/parteners';
import Clients from './components/clients';
import AddClient from './components/create/addClient';
import AddPartener from './components/create/addPartener';
import PayMethods from './components/paymethods';
import NoMatch from './components/noMatch';
import NewDeal from './components/clients/newDeal';

function App() {
  const dispatch = useDispatch()
  const data = useSelector(mapStateToProps);

  useEffect(() => {
    dispatch(intializeLogIn());
  }, [])



  return (
    <BrowserRouter>
      <Routes>
        {!data.auth ? (
          <>
            <Route path="/" element={<Login />} />

          </>
        ) : (<>
          {/* <Route index element={<Dashboard/>}/> */}
          <Route path="dashboard" element={<Dashboard />}>
          {data.user.role==="Admin"&&<Route index element={<Parteners/>}/>}
          {data.user.role==="Partener"&&<Route index element={<PartenerRport/>}/>}
          {/* {data.user.role==="Worker"&& <Route index element={<Clients/>}/>} */}
          
          <Route path="add-worker" element={<AddWorker/>}/>
          <Route path="" element={<Parteners/>}>
          </Route>
          <Route path="add-finance" element={<AddFinance />} />
          <Route path="clients" element={<Clients/>}>
          </Route>
          <Route path="new-deal" element={<NewDeal/>}/>
          <Route path="addclient" element={<AddClient/>}/>
          <Route path ="addpartener" element={<AddPartener/>}/>
          <Route path="addmethod" element={<PayMethods/>}/>
          <Route path='*' element={<NoMatch/>}/>
          </Route>

          <Route path='/client-report' element={<ClientRport/>}/>
          <Route path='/report' element={<PartenerRport />} />
          
        </>
        )}
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="*" element={<Navigate to={data.auth ? '/dashboard' : "/"} />} />

      </Routes>
    </BrowserRouter>
  );
}
const mapStateToProps = ({ user }) => {
  return user
}
export default App;
