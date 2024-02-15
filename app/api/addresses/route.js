import { dbConnect } from "../../db/db";
import { NextResponse } from "next/server";
const Address = require("../../models/Address");

export async function POST(req) {
   const body = await req.json();

   try {
      await dbConnect();

      const address = await Address.create({
         label: body.label,
         value: body.value,
         lat: body.lat,
         lng: body.lng,
      });

      if (address) {
         return NextResponse.json({ status: 200, address });
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

      const addresses = await Address.find();

      return NextResponse.json(addresses);
   } catch (err) {
      return new NextResponse(err);
   }
}
