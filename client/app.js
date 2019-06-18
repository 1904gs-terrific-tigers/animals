import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

import {createMuiTheme, withStyles} from '@material-ui/core/styles'
import {ThemeProvider} from '@material-ui/styles'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#29316b'
    },
    secondary: purple
  },
  status: {
    danger: 'orange'
  }
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar />
        <Routes />
      </div>
    </ThemeProvider>
  )
}

export default App
