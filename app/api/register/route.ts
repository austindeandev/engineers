import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import UserExtra from '@/models/UserExtra';
import { hash } from 'bcryptjs';

export async function POST(req: Request) {
  const { username, email, password } = await req.json();
  if (!email || !password || !username) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  await dbConnect();
  const lower = String(email).toLowerCase();
  const exists = await UserExtra.findOne({  $or: [
    { name: new RegExp(`^${username}$`, "i") },
    { email: new RegExp(`^${lower}$`, "i") }
  ] });
  if (exists) return NextResponse.json({ error: 'Try another username or email' }, { status: 409 });
  const count = await UserExtra.estimatedDocumentCount();
  const role = count === 0 ? 'admin' : 'staff';
  const hashedPassword = await hash(password, 10);
  await UserExtra.create({ name: username, email: lower, hashedPassword, role });
  return NextResponse.json({ ok: true });
}
