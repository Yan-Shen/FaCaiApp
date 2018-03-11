import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */

// function handleClick() {
//   alert('onClick triggered on the title component');
// }
const iconStyle = {
  width: '30px',
  backgroundColor: 'none',
  position: 'absolute',
  right: '20px',
  top: '0px',
  padding: 0,
}

const AppBarIcon = (props) => (
    <AppBar
    style={iconStyle}
    className = "iconShow"
    // title="Title"
    onLeftIconButtonClick={props.onToggle}
    iconElementLeft ={<IconButton><ActionHome /></IconButton>}
  />

);

export default AppBarIcon;
