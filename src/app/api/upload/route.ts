import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { v4 as uuidv4 } from 'uuid';

const MAX_BYTES = 4.5 * 1024 * 1024; // keep under serverless body-size limits

export async function POST(req: NextRequest) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'File uploads are not configured on this server yet.' },
        { status: 501 }
      );
    }

    const form = await req.formData();
    const file = form.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: `File too large (max ${(MAX_BYTES / 1048576).toFixed(1)} MB).` }, { status: 413 });
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const pathname = `uploads/${uuidv4()}-${safeName}`;

    const blob = await put(pathname, file, {
      access: 'public',
      contentType: file.type || undefined,
    });

    return NextResponse.json({ url: blob.url, name: file.name, size: file.size }, { status: 201 });
  } catch (err) {
    console.error('[upload] Error:', err);
    const msg = err instanceof Error ? err.message : 'Upload failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
