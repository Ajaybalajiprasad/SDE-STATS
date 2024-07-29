const leetcodeQuery = (username) => `
  query {
    matchedUser(username: "${username}") {
      profile {
        userAvatar
        ranking
        userSlug
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
const fetchLeetCodeData = async(username) => {
  const query = leetcodeQuery(username);
  const url = 'https://leetcode.com/graphql';

  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`Error fetching data: HTTP error! Status: ${response.status}`);
      console.error('Response body:', JSON.stringify(data, null, 2));
      return null;
    }

    console.log('Submission Counts:', JSON.stringify(data.data.matchedUser.submitStats.acSubmissionNum[0].count, null, 2));
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return null;
  }
};
