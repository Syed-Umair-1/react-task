import * as React from 'react';
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepPurple } from "@mui/material/colors";
import axios from "axios";
import moment from "moment";
import TextareaAutosize from "@mui/base/TextareaAutosize";
// import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];






export default function Dialogmodal({users}) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);


  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

 
  const [data, setData] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:3000/comments")
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [comment,setComment] = useState("")

  const formValue = {
    id:data.length+1,
    updatedBy: "Van Henry",
    comment:comment,
    updatedOn: new Date(),
    taggedTo: personName,
  }

  const postData = () => {
    axios.post(
        "http://localhost:3000/comments",
       formValue 
      )
      .then((res) => {
        console.log(res);
        fetchData()
        
      })
      .catch((err) => console.log(err));
  };
  
  const handleSubmit =()=>{

postData()

setComment('')
setPersonName([])
  }

  return (
    <div>
      
      <Button className='btn' onClick={handleClickOpen('body')}>Add Comment</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
       <DialogTitle id="alert-dialog-title" className="comment_head">
              <div> Comments ({data.length})</div>
              <div>
                <span> LOAN ID - {parseInt( Math.random()*100)+1458}</span>
              </div>
            </DialogTitle>
            {data.map((items, index) => (
              <DialogContent className="user_comment" key={index}>
                <div className="avtar">
                  <Stack direction="row" spacing={2}>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>
                      {items.updatedBy
                        .split(" ")
                        .splice(0, 2)
                        .map((item) => item.slice(0, 1))}
                    </Avatar>
                  </Stack>
                </div>
                <div className="user_name">
                  <DialogContentText id="alert-dialog-description">
                    {items.updatedBy}
                  </DialogContentText>
                  <DialogContentText id="alert-dialog-description">
                    {items.comment}
                  </DialogContentText>
                  <DialogContentText id="alert-dialog-description">
                    {items.taggedTo.map((item, index) => (
                      <span className="tagged_name" key={index}>
                        {item}
                      </span>
                    ))}
                  </DialogContentText>
                  <DialogContentText id="alert-dialog-description">
                    {`${moment(items.updatedOn).format("MMM")} ${moment(
                      items.updatedOn
                    ).format("d")}, ${moment(items.updatedOn).format(
                      "yyyy"
                    )}, ${moment(items.updatedOn).format("h:mm")}`}
                  </DialogContentText>
                </div>
              </DialogContent>
            ))}
            <DialogContent className="user_comment">
              <div className="avtar">
                <Stack direction="row" spacing={2}>
                  <Avatar sx={{ bgcolor: deepPurple[500] }}>{"VH"}</Avatar>
                </Stack>
              </div>
              <form >
                <div className="user_name">
                  <TextareaAutosize
                  value={comment}
                  onChange={(e)=>setComment(e.target.value)}
                    aria-label="minimum height"
                    //   style={{ width: "1000px" }}
                    minRows={7}
                    placeholder="Comment"
                  />
                  <div>
                    <FormControl>
                      <InputLabel id="demo-multiple-checkbox-label">
                        Tag
                      </InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        renderValue={(selected) => selected.join(", ")}
                        MenuProps={MenuProps}
                      >
                        {users.map((items,index) => (
                          <MenuItem key={index} value={items}>
                            <Checkbox checked={personName.indexOf(items) > -1} />
                            <ListItemText primary={items} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                <Button className={comment.length<1 || personName.length<1?'btn_d':'btn'} type='submit' disabled={comment.length===0 || personName.length===0?true:false} onClick={handleSubmit}   >Save</Button>
                </div>
              </form>
            </DialogContent>
      </Dialog>
    </div>
  );
}