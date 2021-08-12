import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, InputLabel, Select, MenuItem, Grid, ListItemIcon, Icon ,Input} from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

import { connect } from "react-redux";
import { compose } from "redux";
import { addCategery, getIcons } from "../Redux/todo/todo.actions";

function FormDialog(props) {
    const [newIcon, setNewIcon] = useState('')
    const [category, setCategory] = useState('')
    useEffect(() => {
        props.getIcons();
    }, [])
    useEffect(() => {
        console.log('props.iconList', props.iconList);
        setNewIcon(props.iconList[0])
    }, [props.iconList])
    const handleChange = (event, name) => {
        switch (name) {
            case 'changeIcon':
                setNewIcon(event.target.value);
                break;
            case 'changeCategory':
                setCategory(event.target.value);
                break;
            default:
        }

    };
    const handleClick = (name) => {
        switch (name) {
            case 'ClickAdd':
                addCategory()
                break;

            default:
        }
    }
    const addCategory = () => {
        if(category !== ""){
            let payload = {
                id: uuidv4(),
                name: category,
                // icon: newIcon
            }
            props.addCategery(payload)
            setNewIcon(props.iconList[0]);
            setCategory('')
            props.handleClose();
        }
        else{
            return
        }
      
    }
    return (
        <div>

            <Dialog open={props.open} onClose={props.handleClose}   aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
                <DialogContent>
                    <Grid container
                        spacing={3}
                        direction="row"
                        justifyContent="center"
                        alignItems="center">
                        <Grid item xs={12}  >
                            <FormControl >
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Enter Category Name"
                                    type="text"
                                    value={category}
                                    onChange={(e) => handleChange(e, 'changeCategory')}

                                />
                            </FormControl>
                        </Grid>

                      
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={(e)=>handleClick('ClickAdd')} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state) => ({
    iconList: state.todo.iconList

});

const mapDispatchToProps = {
    addCategery,
    getIcons
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(FormDialog);

// export default  FormDialog;