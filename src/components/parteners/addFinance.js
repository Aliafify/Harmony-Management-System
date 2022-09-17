import React, { useRef } from 'react';
import serializeForm from 'form-serialize';
import { useDispatch, useSelector } from 'react-redux';
import { update_user } from '../../actions/parteners';

function AddFinance() {
  const partener =useSelector(mapStateToProps);
  
  const dispatch=useDispatch();
  const form = useRef();
  const handelData = (e) => {
    e.preventDefault();
    const data = serializeForm(form.current, { hash: true });
    const oldFinance = parseInt(partener.finance);
    const newFinance= oldFinance+parseInt(data.finance);
    const oldBank = parseInt(partener.bank);
    const newBank =parseInt(data.finance)+oldBank;
    data.finance=newFinance;
    data.bank=newBank;
     dispatch(update_user(partener._id,data,partener.role))
    
  }
  return (
    <div className="add-cont addfinance">

    <form className="create-form" ref={form} onSubmit={handelData}>


                <input className="tex" type="number" name="finance" placeholder="اضافة مبلغ تمويل" required />
                
        <input className="add-sub" type="submit" plceholder="اضافة" value="اضافة" />
              

           

            
          
    </form>       
</div>
  )
}
function mapStateToProps({options}){
 return options.partener
}

export default AddFinance