import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

// NOTE: Writes to the local filesystem.
// Works in development and self-hosted production.
// NOT compatible with Vercel serverless — migrate to a DB/KV store before deploying there.

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email = (body.email ?? '').trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Invalid email' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'data', 'subscribers.json');
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let subscribers: { email: string; subscribedAt: string }[] = [];
  if (fs.existsSync(filePath)) {
    subscribers = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  if (subscribers.some((s) => s.email === email)) {
    return Response.json({ message: 'Already subscribed' }, { status: 200 });
  }

  subscribers.push({ email, subscribedAt: new Date().toISOString() });
  fs.writeFileSync(filePath, JSON.stringify(subscribers, null, 2));

  return Response.json({ message: 'Subscribed' }, { status: 201 });
}
