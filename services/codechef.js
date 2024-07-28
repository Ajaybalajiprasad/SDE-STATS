import axios from 'axios';

const getCodechefUserDetails = async (username) => {
    try{
      const response = await axios.get(`https://codechef-api.vercel.app/handle/${username}`);
      const userDetails = response.data;

      return {
        username: username,
        currentRating: userDetails.currentRating || 'N/A',
        highestRating: userDetails.highestRating || 'N/A',
        stars: userDetails.stars || 'N/A'
      };
    }catch(err){
        console.error(err);
        return null;
    }
};

export default getCodechefUserDetails;
