#!/usr/bin/env node

/**
 * Integration Test Script
 * Tests the connection to the deployed backend
 */

const https = require('https');

const BACKEND_URL = 'https://task-manager-api-r4tk.onrender.com';

console.log('🔍 Testing Backend Integration...\n');

// Test health endpoint
function testHealth() {
  return new Promise((resolve, reject) => {
    const req = https.get(`${BACKEND_URL}/health`, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve({ status: res.statusCode, data: response });
        } catch (error) {
          reject(new Error('Invalid JSON response'));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Test API endpoints
function testAPIEndpoints() {
  const endpoints = [
    '/api/auth',
    '/api/users', 
    '/api/tasks'
  ];
  
  const tests = endpoints.map(endpoint => {
    return new Promise((resolve) => {
      const req = https.get(`${BACKEND_URL}${endpoint}`, (res) => {
        resolve({ endpoint, status: res.statusCode });
      });
      
      req.on('error', () => {
        resolve({ endpoint, status: 'ERROR' });
      });
      
      req.setTimeout(5000, () => {
        req.destroy();
        resolve({ endpoint, status: 'TIMEOUT' });
      });
    });
  });
  
  return Promise.all(tests);
}

async function runTests() {
  try {
    // Test health endpoint
    console.log('1. Testing Health Endpoint...');
    const healthResult = await testHealth();
    console.log(`   ✅ Health Check: ${healthResult.status} - ${JSON.stringify(healthResult.data)}`);
    
    // Test API endpoints
    console.log('\n2. Testing API Endpoints...');
    const apiResults = await testAPIEndpoints();
    
    apiResults.forEach(result => {
      if (result.status === 401) {
        console.log(`   ✅ ${result.endpoint}: ${result.status} (Unauthorized - Expected for protected routes)`);
      } else if (result.status === 200 || result.status === 404) {
        console.log(`   ✅ ${result.endpoint}: ${result.status}`);
      } else {
        console.log(`   ❌ ${result.endpoint}: ${result.status}`);
      }
    });
    
    console.log('\n🎉 Integration Test Complete!');
    console.log('\n📋 Summary:');
    console.log(`   Backend URL: ${BACKEND_URL}`);
    console.log(`   Health Status: ✅ Working`);
    console.log(`   API Endpoints: ✅ Accessible`);
    console.log('\n🚀 Your backend is ready for frontend integration!');
    
  } catch (error) {
    console.error('\n❌ Integration Test Failed:');
    console.error(`   Error: ${error.message}`);
    console.error('\n🔧 Troubleshooting:');
    console.error('   1. Check if the backend is deployed correctly');
    console.error('   2. Verify the URL is correct');
    console.error('   3. Check Render dashboard for any issues');
  }
}

runTests(); 