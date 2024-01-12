import { NextRequest, NextResponse } from "next/server";

import dbConnection from "@/config/mongoose";
import User from "@/models/user";
import bcrypt from "bcrypt";

interface PayLoad {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    dbConnection();
    const body: PayLoad = await req.json();

    const { email, name, password } = body;

    const hashedPassword = await bcrypt.hash(password || "", 10);

    const user = new User({
      email,
      name,
      password: hashedPassword,
    });
    await user.save();
    return NextResponse.json(
      { success: true, message: "User Registered Successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
