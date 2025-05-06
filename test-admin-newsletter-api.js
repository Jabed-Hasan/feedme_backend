/**
 * Manual test script for admin newsletter API endpoints
 * Run this with Node.js: node test-admin-newsletter-api.js
 */

const fetch = require('node-fetch');

const API_BASE_URL = process.env.API_URL || 'http://localhost:5000/api';

// Replace with an actual admin token from your system
const ADMIN_TOKEN = 'YOUR_ADMIN_JWT_TOKEN_HERE';

async function testAdminNewsletterAPI() {
  try {
    console.log('Testing Admin Newsletter API...');
    console.log('-----------------------');

    // Test: Get all newsletter subscriptions (admin only)
    console.log('Test: Get all newsletter subscriptions');
    
    const getAllResponse = await fetch(`${API_BASE_URL}/newsletter/all`, {
      method: 'GET',
      headers: {
        'Authorization': ADMIN_TOKEN,
        'Content-Type': 'application/json',
      },
    });
    
    const getAllData = await getAllResponse.json();
    console.log('Get all subscriptions response:', getAllData);
    console.log('-----------------------');

    // Test with query parameters (e.g., filter by subscription status)
    console.log('Test: Get only active subscriptions');
    
    const getActiveResponse = await fetch(`${API_BASE_URL}/newsletter/all?isSubscribed=true`, {
      method: 'GET',
      headers: {
        'Authorization': ADMIN_TOKEN,
        'Content-Type': 'application/json',
      },
    });
    
    const getActiveData = await getActiveResponse.json();
    console.log('Get active subscriptions response:', getActiveData);
    console.log('-----------------------');

    console.log('Admin Newsletter API testing completed!');
  } catch (error) {
    console.error('Error testing Admin Newsletter API:', error);
  }
}

testAdminNewsletterAPI(); 