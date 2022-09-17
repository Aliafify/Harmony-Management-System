import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./style/subNave.css";
function SubNave({menuItems,onClick}) {
    const {options}=useSelector(mapStateToProps);
 if(!onClick){onClick=(i)=>{}}
    return (
    <div className='subnav '>
        <nav className='subnav-nav'>
<ul className='h-menu'>
    {menuItems.map(
        (i)=><li className='smenu-item' onClick={onClick(i.name)} key={i.name}>
            <button>
            <Link className='link' to={options.partener?i.path:""} >{i.name}</Link>
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
export default SubNave;