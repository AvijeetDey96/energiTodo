import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import FormDialog from './CategoryDialog.component'
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    title: {
        flexGrow: 1,
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        background: 'black'
    },
    fab: {
        margin: theme.spacing(2),
    },
    absolute: {
        position: 'absolute',

        right: theme.spacing(3),
    },
}));

export default function TopBar({ handleDrawerToggle }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
<>
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                 <span style={{color:'#B3E283'}}>Energi</span>  Todo 
                </Typography>

                <Tooltip title="Add Category" aria-label="Add Category">
                    <Fab color="secondary" onClick={handleClickOpen} className={classes.absolute}>
                        <AddIcon />
                    </Fab>
                </Tooltip>

            </Toolbar>
           
        </AppBar>
 <FormDialog open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
 </>
    );
}
