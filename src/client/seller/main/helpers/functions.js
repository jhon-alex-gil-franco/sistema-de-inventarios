//this class contains all metods of comunication whith data base
export const ValidateIfExist = async (url) => {
  const resp = await fetch(url);
  const data = await resp.json();
  return data; 
};

export const consultData= async(url)=>{
  try {
    const resp=await fetch(url)
    const data=await resp.json()
    return data
  } catch (error) {
  }
}

export const insert = async(data, url) => {
    const insertData= await fetch (url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-type": "application/json"},
    })
    const resp= await insertData.json()
    return resp  
};

export const edit = async(data, url) => {
const modif=await fetch (url, {
 method: "PUT",
 body: JSON.stringify(data),
 headers: {
   "Content-type": "application/json",
 },
})
const resp= await modif.json()
 return resp;
}

export const deleted = async(url) => {
  const delet=await fetch (url, {
   method: "DELETE", 
  })
  const resp= await delet.json()
   return resp;
  }

