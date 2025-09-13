import Chat from '@/components/Chat'
import { ModeToggle } from '@/components/mode-toggle'
import SideBar from '@/components/SideBar'
import { useChatStore } from '@/store'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {

  const router = useRouter()
  const isAuthenticated = useChatStore((state)=>state.isAuthenticated)
  useEffect(()=>{
    if(!isAuthenticated) router.navigate({to:"/sign-up"})
  },[])
  return <div className='flex sm:h-screen w-full'>
    <SideBar/>
    <main className='flex-1 flex flex-col'>
      <div className='p-4 flex justify-between items-center border-b text-2xl font-semibold'>
        <h2>Gemini Clone</h2>
        <ModeToggle/>
      </div>
      <div className='bg-stone-50 dark:bg-stone-900 flex-1 overflow-hidden flex flex-col'>
        <Chat/>
      </div>
    </main>
    </div>
}
