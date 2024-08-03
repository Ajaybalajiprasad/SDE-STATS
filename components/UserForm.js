'use client';
import { useState } from 'react';
import { Button, Label, Input, Tabs, Tab } from '@/components/ui/components';
import DisplayPlatformData from '@/components/DisplayPlatformData';
import getCodeforcesUserDetails from '@/services/codeforces';
import getCodechefUserDetails from '@/services/codechef';
import getLeetcodeUserDetails from '@/services/leetcode';
import { supabase } from '@/lib/supabase';
import ExcelUpload from '@/utils/ExcelUploader';

const UserManagement = ({ setLoading, setError }) => {
  const [userDetails, setUserDetailsState] = useState({
    reg_no: '',
    name: '',
    codeforces: '',
    codechef: '',
    leetcode: '',
  });

  const [fetchedDetails, setFetchedDetails] = useState({
    codeforces: null,
    codechef: null,
    leetcode: null,
  });

  const [activeTab, setActiveTab] = useState('excel'); // State to manage the active tab

  const handleChange = (e) => {
    setUserDetailsState({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const codeforcesDetails = userDetails.codeforces ? await getCodeforcesUserDetails(userDetails.codeforces) : null;
      const codechefDetails = userDetails.codechef ? await getCodechefUserDetails(userDetails.codechef) : null;
      const leetcodeDetails = userDetails.leetcode ? await getLeetcodeUserDetails(userDetails.leetcode) : null;

      const userData = {
        reg_no: userDetails.reg_no,
        name: userDetails.name,
        leetcode_username: userDetails.leetcode,
        codeforces_username: userDetails.codeforces,
        codechef_username: userDetails.codechef,
        leetcode_data: leetcodeDetails,
        codeforces_data: codeforcesDetails,
        codechef_data: codechefDetails,
        last_updated: new Date().toISOString(),
      };

      const { error } = await supabase.from('user_profiles').upsert(userData, { onConflict: 'reg_no' });

      if (error) throw error;

      setFetchedDetails({
        codeforces: codeforcesDetails,
        codechef: codechefDetails,
        leetcode: leetcodeDetails,
      });
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      setError('Failed to fetch user details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Tabs activeTab={activeTab} onChange={setActiveTab}>
        <Tab id="excel" label="Upload Excel">
          <h2 className="text-xl font-bold mb-4">Upload Excel Sheet</h2>
          <ExcelUpload setLoading={setLoading} setError={setError} />
        </Tab>
        <Tab id="manual" label="Enter Manually">
          <h2 className="text-xl font-bold mb-4">Enter Student Details Manually</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reg_no" className="text-gray-900">Reg No</Label>
                <Input id="reg_no" name="reg_no" value={userDetails.reg_no} onChange={handleChange} className="bg-background text-gray-900 border-gray-300" required />
              </div>
              <div>
                <Label htmlFor="name" className="text-gray-900">Name</Label>
                <Input id="name" name="name" value={userDetails.name} onChange={handleChange} className="bg-background text-gray-900 border-gray-300" required />
              </div>
              <div>
                <Label htmlFor="codeforces" className="text-gray-900">Codeforces</Label>
                <Input id="codeforces" name="codeforces" value={userDetails.codeforces} onChange={handleChange} className="bg-background text-gray-900 border-gray-300" />
              </div>
              <div>
                <Label htmlFor="codechef" className="text-gray-900">CodeChef</Label>
                <Input id="codechef" name="codechef" value={userDetails.codechef} onChange={handleChange} className="bg-background text-gray-900 border-gray-300" />
              </div>
              <div>
                <Label htmlFor="leetcode" className="text-gray-900">LeetCode</Label>
                <Input id="leetcode" name="leetcode" value={userDetails.leetcode} onChange={handleChange} className="bg-background text-gray-900 border-gray-300" />
              </div>
            </div>
            <Button type="submit" className="mt-4 bg-primary text-primary-foreground">Fetch Status</Button>
          </form>
        </Tab>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {fetchedDetails.leetcode && <DisplayPlatformData platform="leetcode" userData={fetchedDetails.leetcode} />}
        {fetchedDetails.codeforces && <DisplayPlatformData platform="codeforces" userData={fetchedDetails.codeforces} />}
        {fetchedDetails.codechef && <DisplayPlatformData platform="codechef" userData={fetchedDetails.codechef} />}
      </div>
    </div>
  );
};

export default UserManagement;
