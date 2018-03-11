import React from 'react';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

function FrontPage() {
  return (
    <div className="frontPageContainer">
      <div className = "carosole">
      </div>
      <div className="flex-container-wrap sologanSection">
        <div className="slogonContainer">
          <h3>Balance Update? You betcha</h3>
          <p>Instant update on how much $ and debt you have </p>
        </div>

        <div className="slogonContainer">
          <h3>Transaction Analysis? Checked</h3>
          <p> Where do I spend my most money? Track spending made easy. </p>
        </div>

        <div className="slogonContainer">
          <h3>Asset Details? Done</h3>
          <p> Detailed breakdown of asset classes </p>
        </div>

      </div>

        {/* <div style={{textAlign: 'center'}}>
          <h3 style={{color: '#666', display: 'inline-block',  backgroundColor: 'white', padding: '2%', borderRadius: '20px'}}>
          Start Using LINKapp is as simple as 123
          </h3>
        </div>
        <List className="flex-container-wrap stepContainer">
            <div className="listItemContainer">
            <ListItem disabled={true} leftAvatar={<Avatar>1</Avatar>} style={{display: 'inline', color: '#666'}}>
            Sign Up
            </ListItem>
            </div>
            <div className="listItemContainer">
            <ListItem disabled={true} leftAvatar={<Avatar>2</Avatar>} style={{display: 'inline', color: '#666'}}>
              Add Link
            </ListItem>
            </div>
            <div className="listItemContainer">
            <ListItem disabled={true} leftAvatar={<Avatar>3</Avatar>} style={{display: 'inline', color: '#666'}}>
              Go to Overview
            </ListItem>
            </div>
        </List> */}
    </div>
  )
}

export default FrontPage;
