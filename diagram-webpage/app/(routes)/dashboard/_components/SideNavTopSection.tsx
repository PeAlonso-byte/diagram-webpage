import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
function SideNavTopSection() {
  return (
    <Popover>
        <PopoverTrigger>
            <div className='flex items-center gap-3 hover:bg-slate-200 p-3 rounded-lg cursor-pointer'>
                <Image src='/logo-1.png' alt='logo' width={40} height={40} />
                <h2>Team Name
                    <ChevronDown />
                </h2>
            </div>
        </PopoverTrigger>
        <PopoverContent>Place content</PopoverContent>
    </Popover>
  )
}

export default SideNavTopSection