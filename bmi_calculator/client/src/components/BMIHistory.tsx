import React, { useState, useEffect } from 'react';
import { getBMIHistory } from '../api/bmiApi';
import type { BMIRecord } from '../types';

const BMIHistory: React.FC = () => {
  const [history, setHistory] = useState<BMIRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const records = await getBMIHistory();
      setHistory(records);
    } catch (err) {
      setError('Failed to fetch BMI history');
      console.error('History fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading history...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (history.length === 0) return <div className="no-history">No BMI records found</div>;

  return (
    <div className="bmi-history">
      <h2>BMI History</h2>
      <div className="history-list">
        {history.map((record) => (
          <div key={record._id} className="history-item">
            <div className="history-date">
              {new Date(record.createdAt).toLocaleDateString()}
            </div>
            <div className="history-details">
              <span className="bmi-value">BMI: {record.bmi}</span>
              <span className={`category ${record.isHealthy ? 'healthy' : 'unhealthy'}`}>
                {record.category}
              </span>
            </div>
            <div className="history-measurements">
              Height: {record.height}{record.unit === 'metric' ? 'cm' : 'in'}, 
              Weight: {record.weight}{record.unit === 'metric' ? 'kg' : 'lbs'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BMIHistory;