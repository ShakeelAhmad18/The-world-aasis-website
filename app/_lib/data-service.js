import axios from 'axios';
import { eachDayOfInterval } from 'date-fns';

/////////////
// GET

export async function getCabin(id) {
  /*const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .eq('id', id)
    .single();*/

    try {

      const data=await axios.get(`http://localhost:5000/api/cabins/${id}`)

      return data;
      
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }

  // For testing
  // await new Promise((res) => setTimeout(res, 1000));

  
}


export async function getCabinPrice(id) {
  /*
  const { data, error } = await supabase
    .from('cabins')
    .select('regularPrice, discount')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
  }
  */
  try {
     const data=await axios.get(`http://localhost:5000/api/cabins/price/${id}`)

     return data;

    } catch (error) {
       console.log(error)
   }
 
 }


 export const regsiterGuest=async function(formData){

  const res= axios.post('http://localhost:5000/api/guest/register',formData)
  return res.data;
  

 }

export const getCabins = async function () {
  /*const { data, error } = await supabase
    .from('cabins')
    .select('id, name, maxCapacity, regularPrice, discount, image')
    .order('name');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  } */

  try {

    const data=await axios.get('http://localhost:5000/api/cabins')
    return data;
    
  } catch (error) {
    console.log(error)
  }
   
  
};

// Guests are uniquely identified by their email address
export async function getGuest() {
 /* const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('email', email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;*/
  
  try {

       const res=await axios.get('http://localhost:5000/api/guest/getguest')
       const data=res.data;
       return data;

  } catch (error) {

    console.log(error.message)

  }


}

export async function getBooking(id) {
  const { data, error, count } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not get loaded');
  }

  return data;
}


export async function getBookings(guestId) {

  const { data, error, count } = await supabase
    .from('bookings')
    // We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)'
    )
    .eq('guestId', guestId)
    .order('startDate');

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

}



export async function getBookedDatesByCabinId(cabinId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();

  // Getting all bookings
  /*const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('cabinId', cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }*/

    const res=await axios.get(`http://localhost:5000/api/booking/getbooking/cabin/${cabinId}`)
    const data=res.data
  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}




export async function getSettings() {
  /*const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }*/
 try {

  const res=await axios.get('http://localhost:5000/api/sitting/getsitting')
  return res.data;
  
 } catch (error) {
   throw new Error(error.message)
 }
 
}



export async function getCountries() {
  try {
    const res = await fetch(
      'https://restcountries.com/v2/all?fields=name,flag'
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error('Could not fetch countries');
  }
}

/////////////
// CREATE

export async function createGuest(newGuest) {
  const { data, error } = await supabase.from('guests').insert([newGuest]);

  if (error) {
    console.error(error);
    throw new Error('Guest could not be created');
  }

  return data;
}

export async function createBooking(newBooking) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }

  return data;
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id, updatedFields) {
  const { data, error } = await supabase
    .from('guests')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }
  return data;
}


export async function updateBooking(id, updatedFields) {
  const { data, error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

/////////////
// DELETE

export async function deleteBooking(id) {
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
