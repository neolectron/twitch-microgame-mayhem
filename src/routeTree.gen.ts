
import { Route as rootRoute } from './routes/__root'
import { Route as indexRoute } from './routes/index'
import { Route as lobbyRoute } from './routes/lobby'
import { Route as roomRoute } from './routes/room'
import { Route as notFoundRoute } from './routes/404'

export const routeTree = rootRoute.addChildren([
  indexRoute,
  lobbyRoute,
  roomRoute,
  notFoundRoute,
])
