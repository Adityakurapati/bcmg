import { NextRequest, NextResponse } from 'next/server';
import { searchVotersByName, getVotersBySerialNo } from '@/lib/firebase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get('name') || '';
    const enrollmentId = searchParams.get('enrollmentId') || '';

    // Validate that at least one parameter is provided
    if (!name.trim() && !enrollmentId.trim()) {
      return NextResponse.json(
        { error: 'Please provide either a voter name or enrollment ID' },
        { status: 400 }
      );
    }

    const results: any[] = [];
    const seenIds = new Set<string>();

    // Search by enrollment ID if provided
    if (enrollmentId.trim()) {
      const voter = await getVotersBySerialNo(enrollmentId.trim());
      if (voter) {
        results.push(voter);
        seenIds.add(enrollmentId.trim());
      }
    }

    // Search by name if provided
    if (name.trim()) {
      const nameResults = await searchVotersByName(name.trim());
      for (const voter of nameResults) {
        const voterId = voter.sr_no || enrollmentId;
        if (!seenIds.has(voterId)) {
          results.push(voter);
          seenIds.add(voterId);
        }
      }
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
