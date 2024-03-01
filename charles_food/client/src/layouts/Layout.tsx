import { Footer, Header, Hero } from '@/components'
import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Layout:FC<Props> = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto flex-1 py-10">
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout