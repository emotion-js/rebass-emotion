import React from 'react'
import styled from 'react-emotion'

const newStyled = function(Component, opts) {
  if (opts === undefined && Component.__emotion_styles !== undefined) {
    opts = { target: Component.toString().substring(1) }
  }
  const thing = styled(Component, opts)
  thing.attrs = newProps => {
    return styled(props => <Component {...newProps} {...props} />)
  }
  return thing
}
export { newStyled as default }
export { ThemeProvider, withTheme } from 'emotion-theming'
