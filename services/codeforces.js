import axios from 'axios';

const getCodeforcesUserDetails = async (username) => {
  try {
    const response = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
    const userDetails = response.data.result[0];
    
    return {
      handle: userDetails.handle,
      rating: userDetails.rating || 'N/A',
      rank: userDetails.rank || 'N/A',
      maxRating: userDetails.maxRating || 'N/A'
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getCodeforcesUserDetails;