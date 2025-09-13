import { useState } from 'react'
import { Menu, MoreVertical, PenBox, Search } from 'lucide-react'
import { useChatStore } from '@/store'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Modal } from './Chat'
import { Input } from './ui/input'
import { toast } from 'sonner'

export function DropdownMenuDemo({triggerEl, children}: {triggerEl: React.ReactNode, children: React.ReactNode  }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>{triggerEl}</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit" align="center">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const SideBar = () => {
  const setActiveChat = useChatStore((state) => state.setActiveChat)
  const removeChat = useChatStore((state) => state.removeChat)
  const Chats = useChatStore((state) => state.chats)


  const [showExpanded, setShowExpanded] = useState(false)
  const [hardExpand, setHardExpand] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [searchChats, setSearchChats] = useState(Chats)



  const SearchChat = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const arrr = Chats.filter(c => c.title.toLowerCase().trim().includes((e.target.value).trim().toLowerCase()))
    setSearchChats(arrr)
  }

  const expandMenu = () => {
    setShowExpanded(true)
  }
  const collapseMenu = () => {
    setShowExpanded(false)
  }

  const activeChatId = useChatStore((state) => state.activeChatId)
  
  return (
    <section onMouseLeave={collapseMenu} onMouseEnter={expandMenu} className={`${(showExpanded || hardExpand) ? "w-[40%] sm:w-[20%]" :"w-20" } transition-all duration-300 whitespace-nowrap sm:h-screen border-r p-4 flex flex-col gap-8 font-medium`}>
      <div className='*:size-10 *:transition-all *:duration-300 *:[&:hover]:bg-stone-200 dark:*:[&:hover]:bg-stone-600  *:p-3 *:rounded-full *:cursor-pointer flex gap-4 justify-between items-center '>
        <Menu  onClick={()=>setHardExpand(!hardExpand)} className='min-w-10'/>
        <Search onClick={()=>setShowSearchModal(true)} className={`${(showExpanded || hardExpand) ? "opacity-100 ":"opacity-0 "} transition-all duration-300`}/>
      </div>
      <button onClick={()=>setActiveChat()} className='flex items-center rounded-2xl gap-3 cursor-pointer transition-all hover:bg-stone-100 dark:hover:bg-stone-600 px-4 py-2'>
        <PenBox className='min-w-4 w-4'/>
        <span className={`${(showExpanded || hardExpand) ? "opacity-100 scale-x-100 w-auto":"opacity-0 scale-x-0 w-0"} origin-left truncate transition-all duration-300`}>New Chat</span>
      </button>
      
      <div className={`${(showExpanded || hardExpand) ? "opacity-100 w-full scale-x-100":"opacity-0 w-0 scale-x-0"} transform-content origin-left duration-300 transition-all h-max space-y-4`}>
        <h3 className='pl-4 opacity-70'>Recent</h3>
        <ul className='flex flex-col gap-1 h-full '>
          {
            Chats.map((chat) => (
              <li onClick={()=>setActiveChat(chat.id)} key={chat.id} className={` ${chat.id === activeChatId && 'bg-stone-100 dark:bg-stone-700'} group flex items-center justify-between w-full rounded-full gap-1.5 py-2 px-4 cursor-pointer hover:bg-stone-100 hover:dark:bg-stone-600`}>
                <span className='truncate'>{chat.title}</span>
                <DropdownMenuDemo 
                  triggerEl ={
                    <MoreVertical className='h-full scale-125 aspect-square p-1 rounded-full hover:bg-stone-300 dark:hover:bg-stone-500 hidden group-hover:block ' />
                  }
                >
                  <DropdownMenuItem onClick={()=>{removeChat(chat.id); toast.success('Chat successfully deleted !')}} variant='destructive' >
                     Delete
                  </DropdownMenuItem>
                </DropdownMenuDemo>
              </li>
            ))
          }
          
          
        </ul>
      </div>
      <Modal
      setOpenModal={setShowSearchModal}
        title='Search Your Chats'
        description='Start by writing any title name'
        isPageOpen = {showSearchModal}
      >
        <Input onChange={SearchChat} className='dark:text-white' placeholder='Search Chats'/>
          {
            searchChats.map((chat) => (
              <li onClick={()=>setActiveChat(chat.id)} key={chat.id} className={` ${chat.id === activeChatId && 'bg-stone-900 '} dark:text-white group flex items-center justify-between w-full rounded-full gap-1.5 py-2 px-4 cursor-pointer hover:bg-stone-500`}>
                <span className='truncate'>{chat.title}</span>
                <DropdownMenuDemo 
                  triggerEl ={
                    <MoreVertical className='h-full scale-125 aspect-square p-1 rounded-full hover:bg-stone-900 hidden group-hover:block ' />
                  }
                >
                  <DropdownMenuItem onClick={()=>removeChat(chat.id)} variant='destructive' >
                     Delete
                  </DropdownMenuItem>
                </DropdownMenuDemo>
              </li>
            ))
          }
      </Modal>
    </section>
  )
}

export default SideBar