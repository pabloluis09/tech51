import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubscriptionManagement = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [user, setUser] = useState('');
  const [plan, setPlan] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const { data } = await axios.get('/api/subscriptions');
      setSubscriptions(data);
    };

    fetchSubscriptions();
  }, []);

  const addSubscription = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/subscriptions', { user, plan, startDate, endDate });
    setSubscriptions([...subscriptions, data]);
  };

  return (
    <div className="subscription-management">
      <h2 className="text-2xl font-bold mb-4">Subscriptions</h2>
      <form onSubmit={addSubscription} className="mb-4">
        <input type="text" placeholder="User ID" value={user} onChange={(e) => setUser(e.target.value)} required className="input" />
        <input type="text" placeholder="Plan" value={plan} onChange={(e) => setPlan(e.target.value)} required className="input" />
        <input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required className="input" />
        <input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required className="input" />
        <button type="submit" className="btn">Add Subscription</button>
      </form>
      <ul className="list">
        {subscriptions.map(subscription => (
          <li key={subscription._id} className="list-item">{subscription.plan} - {subscription.startDate} to {subscription.endDate}</li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionManagement;
