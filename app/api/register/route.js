import { regsiterGuest } from "@/app/_lib/data-service"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {

     const {name,email,password,nationalID}= await req.json()
    const formData={
        name,
        email,
        password,
        nationalID
    }
    await regsiterGuest(formData)
    return NextResponse.json({message:'User Registered'},{status:201})

  } catch (error) {

    if (error.response && error.response.data && error.response.data.errors) {
        return NextResponse.json({ message: 'Validation Error', errors: error.response.data.errors }, { status: 400 });
      }

    return NextResponse.json({message:'There is error occur while registering the Guest'},{status:500})

  }
}
