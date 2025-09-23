import dbConnect from "@/lib/db";
import MenuItem from "@/models/MenuItem";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await dbConnect();
  try {
    const menuItems = await MenuItem.find({ storeId: params.storeId });
    return NextResponse.json({ success: true, data: menuItems });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  await dbConnect();
  try {
    const body = await request.json();
    const newMenuItem = await MenuItem.create({
      ...body,
      storeId: params.storeId,
    });
    return NextResponse.json(
      { success: true, data: newMenuItem },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}
