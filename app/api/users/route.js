import { dbConnect } from "../../db/db";
import { NextResponse } from "next/server";
const User = require("../../models/User");

export async function POST(req) {
   const body = await req.json();

   try {
      await dbConnect();

      const user = await User.findOne({
         email: body.email,
         password: body.password,
      });

      if (user) {
         return NextResponse.json({ status: 200, user });
      } else {
         return NextResponse.json({
            status: 400,
            error: "Invalid input",
         });
      }
   } catch (err) {
      return new NextResponse(err);
   }
}
export async function GET() {
   try {
      await dbConnect();

      const users = await User.find();

      return NextResponse.json(users);
   } catch (err) {
      return new NextResponse(err);
   }
}

export async function PUT(req) {
   const body = await req.json();

   try {
      await dbConnect();

      const updatedUser = await User.updateOne(
         { _id: body.userId },
         {
            $set: {
               isEligible: body.isEligible,
            },
         }
      );

      if (updatedUser) {
         return NextResponse.json({
            status: 200,
            record: updatedUser,
         });
      } else {
         return NextResponse.json({
            status: 400,
            error: "Could not update user data",
         });
      }
   } catch (err) {
      return new NextResponse(err);
   }
}
