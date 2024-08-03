import { useState } from 'react';
import { supabase } from '@/lib/supabase';

const ExcelUploader = ({ onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setUploading(true);
    setError(null);

    try {
      const data = await sendFileToFlaskAPI(file);
      await processData(data);
      onUploadComplete();
    } catch (err) {
      console.error('Error processing file:', err);
      setError('Failed to process the file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const sendFileToFlaskAPI = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('https://ajaybalaji.pythonanywhere.com/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload file to Flask API');
    }

    const data = await response.json();
    return data;
  };

  const processData = async (data) => {
    for (const row of data) {
      if (row['Leetcode ID'] || row['Codeforce ID'] || row['CodeChef ID']) {
        await supabase.from('user_profiles').upsert({
          reg_no: row['Reg No'],
          name: row['Name'],
          leetcode_username: row['Leetcode ID'],
          codeforces_username: row['Codeforce ID'],
          codechef_username: row['CodeChef ID'],
          leetcode_data: row['Leetcode Data'] || {},
          codeforces_data: row['Codeforces Data'] || {},
          codechef_data: row['CodeChef Data'] || {},
          last_updated: new Date().toISOString(),
        }, { onConflict: 'reg_no' });
      }
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        disabled={uploading}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
      />
      {uploading && <p>Uploading and processing data...</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ExcelUploader;
