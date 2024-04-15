function Validation(values,key)
{
let error={}

if(values.name===""){  error.name="Name should not be empty"}

else{  error.name=""}

if(values.email===""){  error.email="Email should not be empty"}

else{ error.email=""}

if(values.password===""){  error.password="Password should not be Empty"}

else{ error.password=""}

if(key!=="adm234")
{
    error.key="Key is Invalid"
}
else{error.key=""}

return error;
}

export default Validation;