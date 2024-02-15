import { dbConnect } from "../../db/db";
import { NextResponse } from "next/server";
const Calendar = require("../../models/Calendar");

export async function POST(req) {
   const body = await req.json();

   console.log(body);

   try {
      await dbConnect();

      const existingRecord = await Calendar.findOne({
         date: body.date,
         userId: body.userId,
      });

      if (existingRecord) {
         const updatedRecord = await Calendar.updateOne(
            { _id: existingRecord._id },
            {
               $set: {
                  addressId: body.addressId,
                  highlightClass: body.highlightClass,
                  workplaceLabel: body.workplaceLabel,
               },
            }
         );

         if (updatedRecord) {
            return NextResponse.json({
               status: 200,
               record: updatedRecord,
            });
         } else {
            return NextResponse.json({
               status: 400,
               error: "Could not update record",
            });
         }
      } else {
         const record = await Calendar.create({
            addressId: body.addressId,
            date: body.date,
            highlightClass: body.highlightClass,
            userId: body.userId,
            workplaceLabel: body.workplaceLabel,
         });
         if (record) {
            return NextResponse.json({ status: 200, record });
         } else {
            return NextResponse.json({
               status: 400,
               error: "Could not create record",
            });
         }
      }
   } catch (err) {
      return new NextResponse(err);
   }
}
export async function GET(req) {
   const { searchParams } = new URL(req.url);
   const userId = searchParams.get("userId");

   try {
      await dbConnect();

      const calendarData = await Calendar.find({ userId: userId });
      return NextResponse.json(calendarData);
   } catch (err) {
      return new NextResponse(err);
   }
}
