import React, {Component}  from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import AppBarIcon from '../components/appBarIcon'

import {logout} from '../store'

let iconStyle, navStyle


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false
    }
    this.onToggle = this.onToggle.bind(this)
  }


  onToggle() {
    this.setState({showNav: !this.state.showNav})
  }

  render() {
    const {handleClick, isLoggedIn} = this.props
    const show = this.props.location.pathname.includes('transactions')
    if (this.state.showNav === false) {
      navStyle = 'navSlide'
    } else {
      navStyle = 'navSlide open'
    }
    console.log('navStyle-----', navStyle )
    let search
    return (
      <div id="navContainer" className="flex-container-row flex-container-spaceBtw fullWidth">
        <div className="flex-container-row">
          <Link exact to="/"><h1>LINKapp</h1></Link>
        </div>
        <nav className="nav">
          <AppBarIcon onToggle={this.onToggle} />
          {
            isLoggedIn
              ? <div className={navStyle}>
                {
                  (!this.props.location.pathname.includes('links') &&
                  <Link className = "hvr-underline-reveal"
                  to={`/links/${this.props.user.id}`}>LINK</Link>)}
                {
                  // props.location.pathname.includes('links') &&
                  <Link to={`/${this.props.user.id}`} className="hvr-underline-reveal" >OVERVIEW</Link>
                }
                  <Link to={`/transactions/${this.props.user.id}`} className="hvr-underline-reveal" >TRANSACTION</Link>
                <a className="hvr-underline-reveal"
                href="#" onClick={handleClick}>LOGOUT</a>
                {
                  show &&
                  <div className="searchContainer" onClick={() => { search = true}}>
                  <i className="material-icons">search</i>
                </div>
                }
              </div>

              : <div className={navStyle}>
                <Link className="hvr-underline-reveal" to="/login">LOGIN</Link>
                <Link className="hvr-underline-reveal" to="/signup">SIGNUP</Link>
              </div>
          }
        </nav>
      </div>
    )
  }

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
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
