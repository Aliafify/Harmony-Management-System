import React from "react";
import { useSelector } from "react-redux";
import "../style/list.css"
const getParteners = ({ parteners }) => {
  return parteners;
}
const List = ({ items, outPut, position, top, client, partener ,setChoose}) => {
  let style = {
    position: position, top: top
  }
  const parteners = useSelector(getParteners)

  const getById = (id, schemaArr) => {
    const {data }= schemaArr.filter(p => p._id === id)
    return data
  }

  const onChoose =(e,p)=>{ //
    if(setChoose){

      let arr = document.querySelectorAll(".chose");
      arr.forEach(a=>{
        a.classList.remove("chose");
        
      });
      if(e.target.className.includes("chose")){
        e.target.classList.remove("chose");  
        
      }
      if(!e.target.className.includes("chose")){
        
        e.target.classList.add("chose");
        
      }
      //  console.log(e.target.className)
      setChoose(p);
    }
    else{return  null}
  }
    
  return (
    <>
      <ol className="list" style={style}>
        {
          items && items.map(p => <li key={p.name} onClick={(event)=>onChoose(event,p)} className="list-item c-h-ar-flex" >
            {setChoose&&<div className="top"></div>}
            <div className="item-details">

              <p> {p.name && p.name}<br />
              </p>

              {/* check radio  */}
            </div>

            {outPut && (
              <div className="check-box c-v-flex">
                <input className="check-input"
                  type="radio"
                  onChange={(event) => outPut(event.target.value)}
                  name={p.name}
                  value={p._id} />
              </div>
            )}
            <div className="list-dis ">
              <div className="c-h-ar-flex dis">


                <span >
                  <b>العنوان :</b>  {p.address}
                </span>
                <span >
                  <b>رقم الهاتف :</b>  {p.phone.join("/")}
                </span>
              </div>

              <hr></hr>
              <div className="c-h-ar-flex dis">
                <span >
                  <b>البريد الالكترونى :</b>  {p.email}
                </span>
                <span>
                  <b>رقم البطاقة :</b>  {p.identification}

                </span>
              </div>
              <hr></hr>
            {partener&&(<><div className="c-h-ar-flex dis">
              <span >
                <b>الكود : </b>  {p.code}
              </span>
              <span>
                <b>العملاء : </b>  {p.clients}

              </span>
            </div>
            <hr></hr></>)}


              {client && (<><div className="c-h-ar-flex dis">
                <span >
                  <b>عدد القروض:</b>  {p.advance.length}

                </span>
                <span>
                  <b>التاخيرات</b>  

                </span>
              </div><hr></hr></>)}




            </div>

          </li>
          )
        }
      </ol>
    </>
  )
}
export default List;