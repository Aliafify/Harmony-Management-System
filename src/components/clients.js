import React, { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import List from "./create/List";
import { filterByname, filterByPhone, filterByEmail, filterByIdentefication, findDate, late } from "./glopalFunctions";
import Search from "./search";
import SubNave from "./clients/clientsSubNave";
import PayList from "./pay/paylist";
import { choose_method, inetialize_methods } from "../actions/PayMethod";

//
const getClientsData = ({ clients ,parteners}) => {
    
    return {clients,parteners}
}
//
const Clients = () => {
    const dispatch = useDispatch();
    const data = useSelector(getClientsData); // all clients from store 
    const clients = data.clients;
    const [filteredClients, setFilteredClients] = useState(clients); //used to search in clients list 
    const [choose, setChoose] = useState([]);
    const [show,setShow]=useState(false)
    const menueItems = [{ name: "التقرير",path:'/client-report'},{name:"معاملة جديدة",path:"/dashboard/new-deal" }];
    useEffect(()=>{
        dispatch(inetialize_methods())
      },[])
    //   clients.map(c=>{
    //     const advance=c.advance;
    //     let delay =[]
    //     advance.map(a=>delay.push(late(a)));
    //     c.delay =delay;
    //     console.log(c)
    // })
    const setChooses = (v)=>{  // <=== function to store choosed clients on choose var 
        const check = choose.filter(c=> c._id === v._id  );
        if(check.length === 0){ // <=== condition to pervent choose one item twice .
            setChoose([...choose,v])
        }
        dispatch(choose_method({client:v}))
    }
    const deleteName =(v)=>{  // delete choosed iteme from choose 
        const check = choose.filter(c=> c._id !== v  );
        setChoose(check);
    }
    const onClick=()=>{
        show?setShow(false):setShow(true)
    }
    return (
        <>
            <div className="dash-view">
                <SubNave
                    menuItems={menueItems}
                    onClick={onClick}
                    />
                <h1 className="title">عدد العملاء: {clients.length}</h1>
                <Search
                    setFilteredClients={setFilteredClients}
                    filterByname={filterByname}
                    filterByPhone={filterByPhone}
                    filterByEmail={filterByEmail}
                    filterByIdentefication={filterByIdentefication}
                    clients={clients}
                />
                <List items={filteredClients}
                    position={"relative"}
                    client={true}
                    partener={false}
                    setChoose={setChooses} />
                    
                    {show && <PayList clients={choose} 
                    deleteName={deleteName} 
                    
                    />}
            </div>
        </>
    )
}
export default Clients;