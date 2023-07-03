import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
export default function AddUserModal({open,setOpen,data,fetchData}) {
const [value,setValue] = React.useState("")
const formValue={
    id:data.length+1,
    user:value
}



console.log("data,",data.length)
    const postData = () => {
        axios.post(
            "http://localhost:3000/users",
          formValue
          )
          .then((res) => {
            console.log(res);
            fetchData()
            setOpen(false)
          })
          .catch((err) => console.log(err));
      };
      
      const handleSubmit =(e)=>{
    e.preventDefault()
    if(value.length<1){
        alert('Enter User Name')
    }else if(data.some((items)=>items.user.toLowerCase().includes(value.toLowerCase()))){
        alert('User Already exist')
    }
    else
    {
    postData()
    setValue('')
    }
      }
  
console.log("aca>>..///",data.some((items)=>items.user.includes(value)));
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <TextField
          value={value}
          onChange={(e)=>setValue(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="User"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button className='btn' onClick={handleClose}>Cancel</Button>
          <Button className='btn' onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}