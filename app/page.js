'use client';
import { useState, useEffect } from 'react';
import DisplayPlatformData from '@/components/DisplayPlatformData';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import UserForm from '@/components/UserForm';
import { supabase } from '@/lib/supabase';
import getCodeforcesUserDetails from '@/services/codeforces';
import getCodechefUserDetails from '@/services/codechef';
import getLeetcodeUserDetails from '@/services/leetcode';

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);
  const [userDataByPlatform, setUserDataByPlatform] = useState({});
  const [loadingUser, setLoadingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('user_profiles').select('*');

      if (error) throw error;

      setLeaderboardData(data);
    } catch (error) {
      console.error('Error fetching data from Supabase:', error);
      setError('Failed to fetch leaderboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async (user) => {
    const { leetcode_username, codeforces_username, codechef_username } = user;

    const userDetails = {
      leetcode: leetcode_username ? await getLeetcodeUserDetails(leetcode_username) : null,
      codeforces: codeforces_username ? await getCodeforcesUserDetails(codeforces_username) : null,
      codechef: codechef_username ? await getCodechefUserDetails(codechef_username) : null,
    };

    await supabase.from('user_profiles').upsert({
      reg_no: user.reg_no,
      leetcode_data: userDetails.leetcode,
      codeforces_data: userDetails.codeforces,
      codechef_data: userDetails.codechef,
      last_updated: new Date().toISOString(),
    }, { onConflict: 'reg_no' });

    setUserDataByPlatform(userDetails);
    return userDetails;
  };

  const toggleUserDetails = async (reg_no) => {
    if (expandedUser === reg_no) {
      setExpandedUser(null);
      setLoadingUser(null); 
    } else {
      setLoadingUser(reg_no);
      setError(null);

      try {
        const user = leaderboardData.find(u => u.reg_no === reg_no);
        if (user) {
          const details = await fetchUserDetails(user);
          setUserDataByPlatform(details);
          setExpandedUser(reg_no);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        setError('Failed to fetch user details. Please try again.');
      } finally {
        setLoadingUser(null);
      }
    }
  };

  const filteredData = leaderboardData.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.reg_no.includes(searchTerm)
  );

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full transition-colors bg-white text-gray-900">
      {loadingUser && <LoadingOverlay />}
      <div className="max-w-6xl w-full px-4 py-8 bg-background text-gray-900 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">SDE Student Leaderboard</h1>
          <input
            type="text"
            placeholder="Search by Reg No or Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
        </div>
        <div className="bg-background rounded-lg shadow-md p-6 mb-8">
          <UserForm setUserDetails={setUserDataByPlatform} setLoading={setLoading} setError={setError} />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">Rank</th>
                  <th className="py-2 px-4 border-b">Reg No</th>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Leetcode</th>
                  <th className="py-2 px-4 border-b">Codeforces</th>
                  <th className="py-2 px-4 border-b">CodeChef</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((user, index) => (
                  <>
                    <tr
                      key={user.reg_no}
                      className={index % 2 === 0 ? 'bg-gray-50' : ''}
                      onClick={() => toggleUserDetails(user.reg_no)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td className="py-2 px-4 border-b">{index + 1}</td>
                      <td className="py-2 px-4 border-b">{user.reg_no}</td>
                      <td className="py-2 px-4 border-b">{user.name}</td>
                      <td className="py-2 px-4 border-b">
                        {user.leetcode_username || 'N/A'}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {user.codeforces_username || 'NIL'}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {user.codechef_username || 'NIL'}
                      </td>
                    </tr>
                    {expandedUser === user.reg_no && (
                      <tr className="bg-gray-100">
                        <td colSpan="6" className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <DisplayPlatformData platform="leetcode" userData={userDataByPlatform.leetcode} />
                            <DisplayPlatformData platform="codeforces" userData={userDataByPlatform.codeforces} />
                            <DisplayPlatformData platform="codechef" userData={userDataByPlatform.codechef} />
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
