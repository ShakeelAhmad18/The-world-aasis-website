
import '@/app/_styles/globals.css'
import { Josefin_Sans } from 'next/font/google'
import Header from "./_components/Header"
import { ReservationProvider } from './_components/ReservationContext'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './Providers'

const josefin=Josefin_Sans({
  subsets:['latin'],
  display:'swap',
})



export const metadata = {
  title: { 
    template:' %s - The World Oasis' ,
    default: "Welcome - The World Oasis",
    description: "Luxurious cabin hotel located in the heart of Itailans Dolomities,sourounded by beautiful mountains and dark forest "
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className} antialiased bg-primary-900 text-primary-100 min-h-screen flex flex-col `}>
       <Header/>
       <div className='flex-1 px-8 py-12 grid'>
        <main className='max-w-7xl mx-auto w-full'>
          <AuthProvider>
          <ReservationProvider>
             {children}
            <Toaster/>
          </ReservationProvider>
          </AuthProvider>
        </main>
        </div>
      </body>
    </html>
  )
}
