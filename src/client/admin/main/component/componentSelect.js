export const  componetSelectOptions=(select, data, param1, param2, child )=>{
    if(select){
        select.addEventListener("click", () => {
            if (select.childNodes.length == child) {       
                for (const info of data){
                    const listItem = document.createElement("OPTION");
                    listItem.textContent = ` ${ info[param1]}  `;
                    listItem.value = info[param2]
                    listItem.className = "form-control";
                    select.appendChild(listItem);
                }
            }
        });
    }   
}