import { Header } from '@/components'
import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Layout:FC<Props> = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto flex-1 py-10">
        {children}
      </div>
    </div>
  )
}

export default Layout