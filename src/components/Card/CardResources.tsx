'use client'

import { ExternalLink, Github, LifeBuoy } from 'lucide-react'
import { Button } from '../ui/button/button'

export const CardResources = () => {
  return (
    <div className="mt-2 flex items-center">
      <div className="flex flex-1 items-center gap-2">
        <Github size={16} className="text-shadcn-400" />
        <Button variant="link" size="link">
          <h2 className="text-shadcn-400 underline">Github</h2>
        </Button>
      </div>

      <div className="flex flex-1 items-center gap-2">
        <LifeBuoy size={16} className="text-shadcn-400" />
        <Button variant="link" size="link">
          <h2 className="text-shadcn-400 underline">Suporte</h2>
        </Button>
      </div>

      <div className="flex flex-1 items-center gap-2">
        <ExternalLink size={16} className="text-shadcn-400" />
        <Button variant="link" size="link">
          <h2 className="text-shadcn-400 underline">CLI Docs</h2>
        </Button>
      </div>

      <div className="flex flex-1 items-center gap-2">
        <ExternalLink size={16} className="text-shadcn-400" />
        <Button variant="link" size="link">
          <h2 className="text-shadcn-400 underline">Docs</h2>
        </Button>
      </div>
    </div>
  )
}
