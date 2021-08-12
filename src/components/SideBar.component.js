import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TopBar from '../components/TopBar.component'
import { connect } from "react-redux";
import { compose } from "redux";
import { addCategery, deleteCategory, getInitialCategory, selectedCategory } from "../Redux/todo/todo.actions";
import { DeleteOutlined } from '@material-ui/icons'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        // display: 'flex',
        color: 'white',
        height: '100vh',
        backgroundColor: 'black',
        //   backgroundImage: "linear-gradient(147deg, #000000 0%, #434343 74%)"
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    labelWithIcon: {
        border: "2px solid white",
        marginBottom: '5px'
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },

}));

function ResponsiveDrawer(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const selectCategory = (id) => {
        props.selectedCategory(id)
    }
    const deleteCatgory = (id) => {
        props.deleteCategory(id)
    }
    const drawer = (
        <div className={classes.root} >
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {props.categories.map((data, index) => (<div style={{ display: "flex", alignItems: 'center' }}>
                    <ListItem className={classes.labelWithIcon} button key={data.id} onClick={(e) => selectCategory(data.id)}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon style={{ color: 'white' }} /> : <MailIcon style={{ color: 'white' }} />}</ListItemIcon>
                        <ListItemText style={{ color: '#B3E283' }} primary={data.name} />
                    </ListItem>
                    <span > <DeleteOutlined style={{ cursor: 'pointer' }} onClick={(e) => deleteCatgory(data.id)} /></span>

                </div>
                ))}
            </List>
            <Divider />

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>

            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>

        </div>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

const mapStateToProps = (state) => ({
    categories: state.todo.categories

});

const mapDispatchToProps = {
    addCategery,
    selectedCategory,
    deleteCategory

};


export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ResponsiveDrawer);
