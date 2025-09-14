import Chat from '@/components/Chat'
import { ModeToggle } from '@/components/mode-toggle'
import SideBar from '@/components/SideBar'
import { useChatStore } from '@/store'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {

  const [showExpanded, setShowExpanded] = useState(false)
  const router = useRouter()
  const isAuthenticated = useChatStore((state)=>state.isAuthenticated)
  useEffect(()=>{
    if(!isAuthenticated) router.navigate({to:"/sign-up"})
  },[])
  return <div className='flex h-screen w-full'>
    <SideBar showExpanded={showExpanded} setShowExpanded={setShowExpanded}/>
    {showExpanded && <div onClick={()=>setShowExpanded(false)} className='block sm:hidden fixed size-full inset-0 bg-white/60 dark:bg-black/80 z-10'/>}

    <main className='flex-1 flex flex-col'>
      <div className='p-4 flex justify-between items-center border-b text-2xl font-semibold'>
        <div className='flex items-center gap-2'>
          <Menu className='size-5 sm:hidden block' onClick={()=>setShowExpanded(true)}/>
          <h2>Gemini Clone</h2>
        </div>
        <ModeToggle/>
      </div>
      <div className='bg-stone-50 dark:bg-stone-900 flex-1 overflow-hidden flex flex-col'>
        <Chat/>
      </div>
    </main>
    </div>
}
