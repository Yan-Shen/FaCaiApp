import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link, NavLink} from 'react-router-dom'
import {logout} from '../store'


/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, isLoggedIn} = props
  return (
    <div id="navContainer"className="flex-container-row flex-container-spaceBtw fullWidth">
      <div className="flex-container-row">
        {/* <img src="../style/logo.png" /> */}
        <Link exact to="/"><h1>LINKapp</h1></Link>
      </div>
      <nav>

        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              {
                (!props.location.pathname.includes('links')&&
                <Link className="hvr-underline-reveal"
                to={`/links/${props.user.id}`}>LINK</Link>)}
              {
                // props.location.pathname.includes('links') &&
                <Link to={`/${props.user.id}`} className="hvr-underline-reveal" >HOME</Link>
              }
                <Link to={`/transaction`} className="hvr-underline-reveal" >TRANSACTION</Link>
              <a className="hvr-underline-reveal"
              href="#" onClick={handleClick}>LOGOUT</a>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}

              <Link className="hvr-underline-reveal"  to="/login">login</Link>
              <Link className="hvr-underline-reveal"  to="/signup">signup</Link>
            </div>
        }
      </nav>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
