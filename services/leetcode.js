import axios from 'axios';

const getLeetcodeUserDetails = async (username) => {
  try {
    const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);
    const userDetails = response.data;

    return {
      username: username,
      totalSolved: userDetails.totalSolved || 'N/A',
      hardSolved: userDetails.hardSolved || 'N/A',
      ranking: userDetails.ranking || 'N/A'
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getLeetcodeUserDetails;
