import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubscriptionList = () => {
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
    <div className="subscription-list">
      <h2>Subscriptions</h2>
      <form onSubmit={addSubscription}>
        <input type="text" placeholder="User ID" value={user} onChange={(e) => setUser(e.target.value)} required />
        <input type="text" placeholder="Plan" value={plan} onChange={(e) => setPlan(e.target.value)} required />
        <input type="date" placeholder="Start Date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        <input type="date" placeholder="End Date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        <button type="submit">Add Subscription</button>
      </form>
      <ul>
        {subscriptions.map(subscription => (
          <li key={subscription._id}>{subscription.plan} - {subscription.startDate} to {subscription.endDate}</li>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionList;
