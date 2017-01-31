import React, { PropTypes } from 'react'
import ControlledHistory from './ControlledHistory'
import StaticRouter from 'react-router-dom/StaticRouter'

const restoreKeys = () => {
  try {
    return JSON.parse(sessionStorage.ReactRouterKeys)
  } catch(e) {} // eslint-disable-line
}

const saveKeys = (keys) => {
  try {
    sessionStorage.ReactRouterKeys = JSON.stringify(keys)
  } catch(e) {} // eslint-disable-line
}

const ControlledBrowserRouter = ({
  history,
  location,
  action,
  onChange,
  basename,
  ...routerProps
}) => (
  <ControlledHistory
    history={history}
    location={location}
    action={action}
    onChange={onChange}
    restoreKeys={restoreKeys}
    saveKeys={saveKeys}
  >
    {({ history, action, location }) => (
      <StaticRouter
        context={{}}
        action={action}
        location={location}
        basename={basename}
        onPush={history.push}
        onReplace={history.replace}
        blockTransitions={history.block}
        {...routerProps}
      />
    )}
  </ControlledHistory>
)

ControlledBrowserRouter.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  action: PropTypes.string,
  onChange: PropTypes.func,
  basename: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node
  ])
}

export default ControlledBrowserRouter