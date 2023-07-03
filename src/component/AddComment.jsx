import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Dialogmodal from "./Dialogmodal";
import { useState, useEffect } from "react";
import axios from "axios";
import AddUserModal from "./AddUserModal";

function AddComment() {

  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);
  const [open, setOpen] = useState(false);
  const sortData= data.map((items)=>items.user).sort()
  return (
    <div className="home_container">
      <div>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <>
              <Button variant="contained" {...bindTrigger(popupState)}>
                User List
              </Button>
              <Menu {...bindMenu(popupState)}  >
              {sortData.map((items,index)=>
                <MenuItem onClick={popupState.close}   key={index}>{items}</MenuItem>
                )}
                <MenuItem className="btn"  onClick={()=>setOpen(true)}   >Add User</MenuItem>

              </Menu>
            </>
          )}
        </PopupState>
      </div>
      <div className='popup_btn' >
     <Dialogmodal users={sortData} />
     <AddUserModal open={open} setOpen={setOpen} data={data} fetchData={fetchData} />
      </div>
    </div>
  );
}

export default AddComment;
