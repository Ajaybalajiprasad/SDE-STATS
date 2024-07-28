'use client';
import { useState } from 'react';
import { Button, Label, Input, Card, CardHeader, CardTitle, CardContent } from '@/ui/components';
import getCodeforcesUserDetails from '@/services/codeforces';
import getCodechefUserDetails from '@/services/codechef';
import getLeetcodeUserDetails from '@/services/leetcode';

const UserForm = ({ setUserDetails }) => {
  const [usernames, setUsernames] = useState({
    codeforces: '',
    codechef: '',
    leetcode: '',
  });

  const handleChange = (e) => {
    setUsernames({ ...usernames, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const codeforcesDetails = await getCodeforcesUserDetails(usernames.codeforces);
    const codechefDetails = await getCodechefUserDetails(usernames.codechef);
    const leetcodeDetails = await getLeetcodeUserDetails(usernames.leetcode);

    setUserDetails({
      codeforces: codeforcesDetails,
      codechef: codechefDetails,
      leetcode: leetcodeDetails,
    });
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Enter Usernames</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="codeforces" className="text-gray-900">
            Codeforces
          </Label>
          <Input
            id="codeforces"
            name="codeforces"
            value={usernames.codeforces}
            onChange={handleChange}
            className="bg-background text-gray-900 border-gray-300"
          />
        </div>
        <div>
          <Label htmlFor="codechef" className="text-gray-900">
            CodeChef
          </Label>
          <Input
            id="codechef"
            name="codechef"
            value={usernames.codechef}
            onChange={handleChange}
            className="bg-background text-gray-900 border-gray-300"
          />
        </div>
        <div>
          <Label htmlFor="leetcode" className="text-gray-900">
            LeetCode
          </Label>
          <Input
            id="leetcode"
            name="leetcode"
            value={usernames.leetcode}
            onChange={handleChange}
            className="bg-background text-gray-900 border-gray-300"
          />
        </div>
      </div>
      <Button
        type="submit"
        onClick={handleSubmit}
        className="mt-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mb-6"
      >
        Fetch Status
      </Button>
    </div>
  );
};

const DisplayPlatformData = ({ platform, userData, darkMode }) => {
  const renderData = () => {
    if (platform === 'codeforces') {
      return (
        <table className="min-w-full text-left text-sm">
          <tbody>
            <tr>
              <td className={`p-2 ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>Username</td>
              <td className="p-2 font-bold">{userData.handle || 'N/A'}</td>
            </tr>
            <tr>
              <td className={`p-2 ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>Rank</td>
              <td className="p-2 font-bold">{userData.rank || 'N/A'}</td>
            </tr>
            <tr>
              <td className={`p-2 ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>Rating</td>
              <td className="p-2 font-bold">{userData.rating || 'N/A'}</td>
            </tr>
            <tr>
              <td className={`p-2 ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>Max Rating</td>
              <td className="p-2 font-bold">{userData.maxRating || 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      );
    } else if (platform === 'codechef') {
      return (
        <table className="min-w-full text-left text-sm">
          <tbody>
            <tr>
              <td className={`p-2 ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>Username</td>
              <td className="p-2 font-bold">{userData.username || 'N/A'}</td>
            </tr>
            <tr>
              <td className={`p-2 ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>Rating</td>
              <td className="p-2 font-bold">{userData.currentRating || 'N/A'}</td>
            </tr>
            <tr>
              <td className={`p-2 ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>Max Rating</td>
              <td className="p-2 font-bold">{userData.highestRating || 'N/A'}</td>
            </tr>
            <tr>
              <td className={`p-2 ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>Stars</td>
              <td className="p-2 font-bold">{userData.stars || 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      );
    } else if (platform === 'leetcode') {
      return (
        <table className="min-w-full text-left text-sm">
          <tbody>
            <tr>
              <td className={`p-2 ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>Username</td>
              <td className="p-2 font-bold">{userData.username || 'N/A'}</td>
            </tr>
            <tr>
              <td className={`p-2 ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>Total Solved</td>
              <td className="p-2 font-bold">{userData.totalSolved || 'N/A'}</td>
            </tr>
            <tr>
              <td className={`p-2 ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>Hard Solved</td>
              <td className="p-2 font-bold">{userData.hardSolved || 'N/A'}</td>
            </tr>
            <tr>
              <td className={`p-2 ${darkMode ? 'text-gray-400' : 'text-muted-foreground'}`}>Ranking</td>
              <td className="p-2 font-bold">{userData.ranking || 'N/A'}</td>
            </tr>
          </tbody>
        </table>
      );
    }
  };

  return (
    <Card className={`bg-${darkMode ? 'gray-700' : 'background'} text-${darkMode ? 'gray-300' : 'gray-900'}`}>
      <CardHeader>
        <CardTitle>{platform.toUpperCase()}</CardTitle>
      </CardHeader>
      <CardContent>{renderData()}</CardContent>
    </Card>
  );
};

export default function Leaderboard() {
  const [userDataByPlatform, setUserDataByPlatform] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleSetUserDetails = (details) => {
    setUserDataByPlatform(details);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen w-full transition-colors ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div
        className={`max-w-4xl w-full px-4 py-8 ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-background text-gray-900'
        } rounded-lg shadow-md`}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            SDE Student-status
          </h1>
        </div>
        <div
          className={`bg-${
            darkMode ? 'gray-700' : 'background'
          } rounded-lg shadow-md p-6 mb-8`}
        >
          <UserForm setUserDetails={handleSetUserDetails} />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(userDataByPlatform).map(([platform, userData]) => (
              <DisplayPlatformData
                key={platform}
                platform={platform}
                userData={userData}
                darkMode={darkMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
