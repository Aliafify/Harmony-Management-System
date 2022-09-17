import React from 'react'
import { convertObjToArr } from './glopalFunctions';

function Table({rowNum,coulmnNum,data,title}) {
    const num = (r)=>{
      let arr = [];
  for(let i = 1 ; i<= r ; ++i){
       arr.push(i);
    }
   return arr
}
const dataKeys = Object.keys(data)
const convert = (obj,col,row)=>{
    const arr = convertObjToArr(obj);
    let matrix = [];
    for(let j=1;j<= row;j++){
        let column = [];
        for(let i = col*matrix.length ; i< col+col*matrix.length ; i++){
            column.push(arr[i])
        }
        matrix.push(column);
    }
    return matrix
}
const arrData=convert(data,coulmnNum,rowNum);
const arrKeys = convert(dataKeys,coulmnNum,rowNum);
  return (
    <>
        <table border = "1" width = "100%" height= "200vh">
         <caption>{title}</caption>
        { num(rowNum).map((n,indR)=><tr key={n}>
            {num(coulmnNum).map((c,indC)=> <td key={c}>{arrKeys[indR][indC]} : {arrData[indR][indC]} </td>)}
         </tr>)
         
}
      </table>
    </>
  )
}

export default Table