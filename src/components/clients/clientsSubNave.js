import React from 'react'
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom";
function SubNave({menuItems,onClick}) {
    const {options}=useSelector(mapStateToProps);

  return (
    <div className='subnav '>
        <nav className='subnav-nav'>
<ul className='h-menu'>
    <li className='smenu-item'><button onClick={()=>onClick(true)}>دفع القسط  </button></li>
    {menuItems.map(
        (i)=><li className='smenu-item'  key={i.name}>
            <button>
            <Link className='link'  to={options.client?i.path:""} >{i.name}</Link>
            </button>
        </li>
    )}
    
</ul>

        </nav>
    </div>
  )
}
function mapStateToProps({options}){
    return {options}
}

export default SubNave