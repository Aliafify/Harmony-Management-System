import React from 'react'

function Table2({data,title}) {
    const keys = Object.keys(data)
    
  return (
    <>
    <table border = "1" width = "100%" >
     <caption>{title}</caption>
        <thead height="40vh">
            <tr>{keys.map(k=>
                <td>{k}</td> 
                )}
                </tr>
        </thead>
    <tbody >
        {data[keys[0]].map((d,i)=>
        
   <tr height='50vh'>
    {keys.map((k,j)=>
      
    <td>
    {data[keys[j]][i]}
    </td>
    )
}
    </tr>
        )
}

</tbody>
  </table>
</>
  )
}

export default Table2
