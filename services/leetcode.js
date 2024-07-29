import axios from 'axios';

const getLeetCodeUserDetails = async (username) => {
  try {
    const response = await axios.post('/pages/api', {
      username: username
    });

    const userDetails = response.data;

    if (userDetails.errors) {
      throw new Error('Failed to fetch data');
    }

    return {
      username: username || 'N/A',
      totalSolved: userDetails.data.matchedUser.submitStats.acSubmissionNum[0].count || 'N/A',
      ranking: userDetails.data.matchedUser.profile.ranking || 'N/A',
      rating: userDetails.data.userContestRanking?.rating || 'N/A'
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default getLeetCodeUserDetails;
