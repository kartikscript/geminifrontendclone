import { createRootRoute, Outlet, useMatchRoute } from '@tanstack/react-router'
import { ThemeProvider } from '../components/theme-provider';

const RootLayout = () => {

  const matchRoute = useMatchRoute()
  let isAuthRoute = false
  if (matchRoute({to:'/login'}) || matchRoute({to:'/sign-up'})){
    isAuthRoute = true
  } 
  return(
      <>
        {/* <div className="p-2 flex gap-2">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>{' '}
          
        </div>
        <hr /> */}
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className='flex justify-center min-h-screen'>

            <Outlet />
            {
              isAuthRoute && (
                <div className='flex-1 hidden sm:flex justify-center items-center flex-col dark:bg-stone-900 bg-stone-200 p-4'> 
                  <h1 className='text-3xl font-bold text-center my-4'>Welcome to Gemini</h1>
                  <p className='text-center mb-4'>The ultimate AI-powered coding assistant</p>
                </div>
              )
            }
          </div>
        </ThemeProvider>
        {/* <TanStackRouterDevtools /> */}
      </>
  )
}


export const Route = createRootRoute({ component: RootLayout })