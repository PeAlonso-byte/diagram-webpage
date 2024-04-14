import { Archive, ChevronDown, Flag, Github } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import SideNavTopSection, { TEAM } from './SideNavTopSection'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import SideNavBottomSection from './SideNavBottomSection'
import { useConvex, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'

function SideNav() {
  const {user}:any = useKindeBrowserClient()
  const createFile = useMutation(api.files.createFile)
  const [activeTeam, setActiveTeam] = useState<TEAM>()
  const [totalFiles, setTotalFiles] = useState<Number>(0)

  const convex = useConvex()

  useEffect(() => {
    activeTeam&&getFiles()
  }, [activeTeam])


  const onFileCreate = (fileName:string) => {
    createFile({
      fileName:fileName,
      teamId:activeTeam?._id,
      createdBy: user?.email,
      archive:false,
      document:'',
      whiteboard:'',
    }).then(resp=>{
      if (resp) {
        toast('File created successfully!')
      }
    }, (e) => {
      toast('Error while creating new File')
    })
  }

  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles,{teamId:activeTeam?._id})
    setTotalFiles(result.length)
  }
  return (
    <div
    className='bg-gray-100 h-screen fixed w-72 border-r p-6 flex flex-col'>
        <div className='flex-1'>
          <SideNavTopSection user={user} setActiveTeamInfo={(activeTeam:TEAM) => setActiveTeam(activeTeam)}/>
        </div>

        <div>
          <SideNavBottomSection 
          onFileCreate={onFileCreate}
          totalFiles={totalFiles}/>
        </div>
    </div>
  )
}

export default SideNav