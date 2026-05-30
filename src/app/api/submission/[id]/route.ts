import { NextRequest, NextResponse } from 'next/server';
import { getSubmission } from '@/lib/storage';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const submission = await getSubmission(id);

  if (!submission) {
    return NextResponse.json({ error: 'Submission not found.' }, { status: 404 });
  }

  return NextResponse.json(submission);
}
