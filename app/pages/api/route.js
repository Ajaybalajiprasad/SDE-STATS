import { NextRequest, NextResponse } from 'next/server';

const leetcodeQuery = (username) => `
query {
  matchedUser(username: "${username}") {
    profile {
      userAvatar
      ranking
    }
    submitStats {
      acSubmissionNum {
        difficulty
        count
      }
    }
  }
  userContestRanking(username: "${username}") {
    rating
  }
}
`;

export async function POST(req) {
  try {
    const { username } = await req.json();

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: leetcodeQuery(username) }),
    });

    const data = await response.json();

    if (!response.ok || data.errors) {
      return NextResponse.json({ error: 'Failed to fetch data', details: data.errors }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method GET Not Allowed' }, { status: 405 });
}
