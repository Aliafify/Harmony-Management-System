import React from "react";
import "./style/search.css";

const Search = ({ setFilteredClients, filterByname, filterByPhone,filterByEmail,filterByIdentefication,clients }) => {

    const handelSearch = (value, arr) => {
        if (value.target.name === "searchByName") {
            setTimeout(setFilteredClients(filterByname(value.target.value, arr)), 1000)
        }
        if (value.target.name === "searchByPhone") {
            setTimeout(setFilteredClients(filterByPhone(value.target.value, arr)), 1000)
        }
        if (value.target.name === "searchByEmail") {
            setTimeout(setFilteredClients(filterByEmail(value.target.value, arr)), 1000)
        }
        if (value.target.name === "searchByIdentification") {
            setTimeout(setFilteredClients(filterByIdentefication(value.target.value, arr)), 1000)
        }

    }
    //console.log(typeof(clients[4].identification))
    return (
        <div className="search-cont">
            <input type="search" name="searchByName"
                placeholder="البحث بالاسم"
                onChange={(event) => handelSearch(event, clients)}
            />
            <input type="search"
                name="searchByPhone"
                placeholder="البحث برقم التليفون"
                onChange={(event) => handelSearch(event, clients)}
            />
              <input type="search"
                name="searchByEmail"
                placeholder="البحث بالبريد الالكترونى"
                onChange={(event) => handelSearch(event, clients)}
            />
             <input type="search"
                name="searchByIdentification"
                placeholder="البحث برقم البطاقة"
                onChange={(event) => handelSearch(event, clients)}
            />
        </div>

    )
}

Search.propTypes = {}

export default Search