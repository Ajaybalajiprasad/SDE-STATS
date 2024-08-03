import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/components';

const DisplayPlatformData = ({ platform, userData }) => {
  const renderData = () => {
    if (!userData) {
      return <p>No data available for {platform}.</p>;
    }

    const dataFields = {
      codeforces: [
        { label: 'Username', key: 'handle' },
        { label: 'Rank', key: 'rank' },
        { label: 'Rating', key: 'rating' },
        { label: 'Max Rating', key: 'maxRating' },
      ],
      codechef: [
        { label: 'Username', key: 'username' },
        { label: 'Rating', key: 'currentRating' },
        { label: 'Max Rating', key: 'highestRating' },
        { label: 'Stars', key: 'stars' },
      ],
      leetcode: [
        { label: 'Username', key: 'username' },
        { label: 'Total Solved', key: 'totalSolved' },
        { label: 'Rating', key: 'rating', transform: (value) => (typeof value === 'number' ? value.toFixed(2) : 'N/A') },
        { label: 'Ranking', key: 'ranking' },
      ],
    };

    return (
      <table className="min-w-full text-left text-sm">
        <tbody>
          {dataFields[platform].map(({ label, key, transform }) => (
            <tr key={key}>
              <td className="p-2 text-muted-foreground">{label}</td>
              <td className="p-2 font-bold">
                {transform ? transform(userData[key]) : userData[key] || 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <Card className="bg-background text-gray-900">
      <CardHeader>
        <CardTitle>{platform.toUpperCase()}</CardTitle>
      </CardHeader>
      <CardContent>{renderData()}</CardContent>
    </Card>
  );
};

export default DisplayPlatformData;