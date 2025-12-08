import { NextResponse } from 'next/server';

interface Settings {
  weekStart: number;
}

// In-memory storage to match the previous behavior
let settings: Settings = {
  weekStart: 1
};

export async function GET() {
  return NextResponse.json(settings);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Server received POST settings:', body);

    if (body.weekStart !== undefined) {
      settings.weekStart = Number(body.weekStart);
    }

    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
