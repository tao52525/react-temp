import React, { Suspense, lazy, Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Spin } from 'antd'
import 'normalize.css'
import styles from './styles/base.styl'
import Header from './components/Header'
import Home from './containers/Home'

// 基于路由的代码分割
const Login = lazy(() => import(/* webpackChunkName: "login" */ './containers/Login'))
const List = lazy(() => import(/* webpackChunkName: "list" */ './containers/List'))
const ErrorPage = lazy(() => import(/* webpackChunkName: "error-page" */ './containers/ErrorPage'))

const App = () => (
  <Router>
    <Suspense fallback={<Spin />}>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Main>
          <Route exact path="/" component={Home} />
          <Route exact path="/list" component={List} />
          <Route exact path="/list/:id" component={List} />
        </Main>
        <Route component={ErrorPage} />
      </Switch>
    </Suspense>
  </Router>
)

class Main extends Component {
  render() {
    const children = this.props.children
    return (
      <div>
        <Header />
        <div className={styles.container}>{children}</div>
      </div>
    )
  }
}

export default App
