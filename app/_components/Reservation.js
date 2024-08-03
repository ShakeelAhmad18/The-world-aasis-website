 import React from 'react'
import DateSelector from './DateSelector'
import ReservationForm from './ReservationForm'
import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service'
import { auth } from '../_lib/auth'
import LoginMessage from './LoginMessage'
 
 export default async function Reservation({cabin,id}) {
    const [settings,bookedDates] = await Promise.all([getSettings(),getBookedDatesByCabinId(id)])
    
    const session=await auth()

   return (
    <div className="grid grid-cols-2 border border-primary-800">
          <DateSelector cabin={cabin} settings={settings} bookedDates={bookedDates}/>
      
         { session?.user ? <ReservationForm cabin={cabin}  user={session?.user}/> : <LoginMessage/> }

        </div>
   )
 }
 