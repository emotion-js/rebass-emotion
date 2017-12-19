import React from 'react'
import styled from 'react-emotion'

const newStyled = function(Component) {
  const thing = styled(Component)
  thing.attrs = newProps => {
    return styled(props => <Component {...newProps} {...props} />)
  }
  return thing
}
export { newStyled as default }
export { ThemeProvider, withTheme } from 'emotion-theming'
