import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Navbar.module.css'
import { AuthContext } from '../../../context'

const Navbar = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext)
  const logout = () => {
    setIsAuth(false)
    localStorage.removeItem('auth')
  }
  return (
    <div className={classes.navbar}>
      <NavLink to="/" exact className={classes.navbarLinksItem} activeClassName={classes.active}>Home</NavLink>
      <div className={classes.navbarLinks}>
        <NavLink to="/about" className={classes.navbarLinksItem} activeClassName={classes.active}>about</NavLink>
        <NavLink to="/posts" className={classes.navbarLinksItem} activeClassName={classes.active}>posts</NavLink>
        <span onClick={logout} className={classes.navbarLinksItem}>Logout</span>
      </div>
    </div>
  )
}

export default Navbar
