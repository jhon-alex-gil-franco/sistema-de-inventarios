
//this  function return the date current 



export const dateNow=()=>{
    let date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    let yyyy = date.getFullYear();
    if(dd<10){dd=`0${dd}`}
    if(mm<10){mm=`0${mm}`}
   const datenow=`${yyyy}-${mm}-${dd}`
   return datenow
}


//this function remove all child of a table

export const dropChildOfTable=(table)=>{
    while(table.hasChildNodes()){
        table.removeChild(table.firstChild)
    }
}
