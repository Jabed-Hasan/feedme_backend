/**
 * Manual test script for newsletter API endpoints
 * Run this with Node.js: node test-newsletter-api.js
 */

const fetch = require('node-fetch');

const API_BASE_URL = process.env.API_URL || 'http://localhost:5000/api';

async function testNewsletterAPI() {
  try {
    console.log('Testing Newsletter API...');
    console.log('-----------------------');

    // Test 1: Subscribe to newsletter
    console.log('Test 1: Subscribe to newsletter');
    const email = `test${Date.now()}@example.com`;
    
    const subscribeResponse = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    const subscribeData = await subscribeResponse.json();
    console.log(`Subscribe response for ${email}:`, subscribeData);
    console.log('-----------------------');

    // Test 2: Try to subscribe with the same email (should still be successful)
    console.log('Test 2: Subscribe with same email');
    const duplicateResponse = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    const duplicateData = await duplicateResponse.json();
    console.log(`Duplicate subscribe response for ${email}:`, duplicateData);
    console.log('-----------------------');

    // Test 3: Unsubscribe from newsletter
    console.log('Test 3: Unsubscribe from newsletter');
    const unsubscribeResponse = await fetch(`${API_BASE_URL}/newsletter/unsubscribe/${encodeURIComponent(email)}`, {
      method: 'GET',
    });
    
    const unsubscribeData = await unsubscribeResponse.json();
    console.log(`Unsubscribe response for ${email}:`, unsubscribeData);
    console.log('-----------------------');

    console.log('Newsletter API testing completed!');
  } catch (error) {
    console.error('Error testing Newsletter API:', error);
  }
}

testNewsletterAPI(); 