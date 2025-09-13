import PhoneInput from '@/components/PhoneInput'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='sm:w-[40%] flex flex-col gap-8 justify-center items-center p-4'>
    <div>
      <h2 className='text-2xl font-semibold text-stone-900 dark:text-stone-200'>Create your account</h2>
      <p className='opacity-60 text-center text-sm mt-2 max-w-xs'>
        Enter your phone number to continue
      </p>
    </div>
    <div >
      <PhoneInput/>  
      <p className='text-sm opacity-70 text-center'>Already have an account ? <Link to='/login' className='underline dark:text-stone-50 text-stone-950'>Login</Link></p>
    </div>
  </div>
}
