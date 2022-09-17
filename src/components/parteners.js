import React, {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { handelInetialData } from "../actions/getData";
import { choose_method } from "../actions/PayMethod";
import List from "./create/List";
import { filterByname, filterByPhone, filterByEmail, filterByIdentefication } from "./glopalFunctions";
import Search from "./search";
import SubNave from "./subNave";

const getPartenersData = ({ parteners }) => {
    return {parteners}
}

const Parteners = () => {

        const {parteners }= useSelector(getPartenersData);
    
    const [filteredClients, setFilteredClients] = useState(parteners);
   const menuItems=[{name:"التقارير",path:"/report"},{name:"اضافة تمويل",path:"add-finance"}]
   const dispatch = useDispatch();
   const onChoose=(p)=>{
     dispatch(choose_method({partener:p}))
   }
  useEffect(()=>{
    dispatch(handelInetialData());

  },[])
    return (
        <>
            <div className="dash-view">
                <SubNave
                        menuItems={menuItems}
                        />
                <h1 className="title">عدد المستثمرين: {parteners.length}</h1>

                <Search
                    setFilteredClients={setFilteredClients}
                    filterByname={filterByname}
                    filterByPhone={filterByPhone}
                    filterByEmail={filterByEmail}
                    filterByIdentefication={filterByIdentefication}

                    clients={parteners}
                />
                <List items={filteredClients} 
                position={"relative"}
                 partener={true} 
                 setChoose={onChoose}/>
            </div>
            <Outlet/>
        </>
    )
}
export default Parteners;