import PhoneInput from '@/components/PhoneInput'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='w-full sm:w-[40%] flex flex-col gap-8 justify-center items-center p-4'>
    <div>
      <h2 className='text-2xl font-semibold text-stone-900 dark:text-stone-200 text-center'>Sign in to your account</h2>
      <p className='opacity-60 text-center text-sm mt-2 max-w-xs'>
        Enter your phone number to continue
      </p>
    </div>
      <div >
        <PhoneInput/>  
        <p className='text-sm opacity-70 text-center'>Don&apos;t have an account ? <Link to='/sign-up' className='underline dark:text-stone-50 text-stone-950'>Sign-up</Link></p>
      </div>
    </div>
}
