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
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem, Grid, Card, ListItemIcon, Input, Button, Checkbox } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import TopBar from '../components/TopBar.component';
import ResponsiveDrawer from '../components/SideBar.component';
import SimpleCard from '../components/Card.component';
import { connect } from "react-redux";
import { compose } from "redux";
import { addTodo, updateTodo, deleteTodo } from "../Redux/todo/todo.actions";
import { v4 as uuidv4 } from 'uuid';
import { CreateOutlined, DeleteOutlined } from '@material-ui/icons'
import bg from '../assets/images/bg.jpg'
import Particles from 'react-particles-js';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundImage: `url(${bg})`,
        height: '100vh',
        objectFit: 'cover',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
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

function Home(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [todo, setTodo] = React.useState('');
  const [todoList, setTodoList] = React.useState('');
  const [updateTrigger, setUpdateTrigger] = React.useState(false);
  const [updateValue, setUpdateValue] = React.useState('');
  const [tagId, setTagId] = React.useState('');
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    if (props.todos) {
      setTodoList(props.todos.filter((data) => data.cid == props.selectedCategoryId))
    }

  }, [props.selectedCategoryId, props.todos])

  const container = window !== undefined ? () => window().document.body : undefined;
  const REGEXP = /^$/;

  const handleClick = (e, name) => {
    switch (name) {
      case 'addtask':
        addTask()
        break;
      case 'update':
        setUpdateTrigger(true);
        setTagId(e)
        for (let data in props.todos) {
          if (props.todos[data].id == e) {
            setUpdateValue(props.todos[data].data)
          }
        }

        break;
      case 'updatetask':
        updateTask(tagId)
        break;
      case 'delete':
        deleteTask(e)
        break;
      default:
        break;
    }
  }
  const handleChange = (e, name) => {
    switch (name) {
      case 'changeTodo':
        setTodo(e.target.value)
        break;
      case 'changeUpdateTodo':
        setUpdateValue(e.target.value)
        break;
      default:
        break;
    }
  }

  function updateTask(id) {
    let payload = {
      updateValue: updateValue,
      id: id
    }
    props.updateTodo(payload)
    setUpdateTrigger(false);
    setUpdateValue("")
  }
  function deleteTask(id) {
    props.deleteTodo(id)
  }
  function addTask() {
    if(REGEXP.test(todo)){
     return
    }
    else{
      let payload = {
        id: uuidv4(),
        cid: props.selectedCategoryId,
        data: todo,
        isComplete: false
      }
      props.addTodo(payload)
      setTodo("")
    }
  }
  return (
    <div className={classes.root}>
     
      <CssBaseline />
    
      <TopBar handleDrawerToggle={handleDrawerToggle} />
      <ResponsiveDrawer />
      <div style={{position:'absolute',width:'100%'}}><Particles /></div>
      <main  style={{zIndex:'10',width:'100%',height:'100%'}} className={classes.content}>
   
        <div className={classes.toolbar} />
        <Grid container justifyContent="center">
          <Grid  item xs={4}></Grid>
          <Grid  item xs={4}>
 
            <SimpleCard>

              {props.categories && props.categories.length != 0 ?
                <Typography paragraph className="App">
                  <AppBar position="static" style={{
                    backgroundColor: 'black', alignItems: 'center',
                    display: 'flex'
                  }}>
                    <Toolbar>  {props.selectedCategory && props.selectedCategory[0] && props.selectedCategory[0].name}</Toolbar>

                  </AppBar>

                  <br />
                  {
                    todoList && todoList.map((todo, index) => {
                      return (
                        <Card style={{ marginBottom: '5px' }}> <Grid container>

                          <Grid item xs={1}></Grid>
                          <Grid item xs={6}>{todo.data}</Grid>
                          <Grid item xs={1}> <CreateOutlined onClick={(e) => handleClick(todo.id, 'update')} style={{ cursor: 'pointer' }} /></Grid>
                          <Grid item xs={1}><DeleteOutlined style={{ cursor: 'pointer' }} onClick={(e) => handleClick(todo.id, 'delete')} /> </Grid>
                          <Grid item xs={3}></Grid>
                        </Grid>
                        </Card>)
                    })
                  }
                  {updateTrigger ? <Input id="my-input" value={updateValue} onChange={(e) => handleChange(e, 'changeUpdateTodo')} aria-describedby="my-helper-text" placeholder="update todo" /> : <Input id="my-input" value={todo} onChange={(e) => handleChange(e, 'changeTodo')} aria-describedby="my-helper-text" placeholder="Add todo" />}

                  <span> {updateTrigger ? <Button onClick={(e) => handleClick(e, 'updatetask')}>update  </Button> : <Button onClick={(e) => handleClick(e, 'addtask')}>+Add  </Button>}</span>
                </Typography> : 'Please add one category '}

            </SimpleCard>

          </Grid >
          <Grid item xs={4}></Grid>
        </Grid>
       
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  selectedCategoryId: state.todo.selectedCategoryId,
  selectedCategory: state.todo.selectedCategory,
  todos: state.todo.todos,
  categories: state.todo.categories
});

const mapDispatchToProps = {
  addTodo,
  updateTodo,
  deleteTodo
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Home);


