import React, { Component } from 'react'
import { withRouter } from 'react-router'
import styles from './header.styl'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Header'
    }
  }
  clickHandle() {
    console.log(this)
  }
  render() {
    const { title } = this.state
    console.log(styles)
    return (
      <div className={styles.name} onClick={() => this.clickHandle()}>
        {title}
      </div>
    )
  }
}

export default withRouter(Header)
