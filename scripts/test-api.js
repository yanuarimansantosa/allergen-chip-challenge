#!/usr/bin/env node

/**
 * Test API connectivity and endpoints
 * Usage: npm run test-api
 */

const axios = require('axios');

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://allergen-chip-challenge.medinovatech.com';

const testData = {
  patient_age: 35,
  allergen_type: 'Bet_v_1',
  igg_level: 2.5,
  symptom_severity: 3,
};

async function runTests() {
  console.log('\n🧪 Testing Allergen Chip Challenge API');
  console.log(`📍 API URL: ${API_URL}\n`);

  let passedTests = 0;
  let failedTests = 0;

  // Test 1: Home endpoint
  try {
    console.log('Test 1: GET / (Home)');
    const response = await axios.get(`${API_URL}/`);
    if (response.status === 200 && response.data.status === 'active') {
      console.log('✅ PASSED - API is active\n');
      passedTests++;
    } else {
      console.log('❌ FAILED - Unexpected response\n');
      failedTests++;
    }
  } catch (error) {
    console.log(`❌ FAILED - ${error.message}\n`);
    failedTests++;
  }

  // Test 2: Health endpoint
  try {
    console.log('Test 2: GET /health (Health Check)');
    const response = await axios.get(`${API_URL}/health`);
    if (response.status === 200 && response.data.status === 'healthy') {
      console.log(`✅ PASSED - API is healthy`);
      console.log(`   Models loaded: ${response.data.models.join(', ')}\n`);
      passedTests++;
    } else {
      console.log('❌ FAILED - Health check failed\n');
      failedTests++;
    }
  } catch (error) {
    console.log(`❌ FAILED - ${error.message}\n`);
    failedTests++;
  }

  // Test 3: Models info endpoint
  try {
    console.log('Test 3: GET /api/models (Models Info)');
    const response = await axios.get(`${API_URL}/api/models`);
    if (response.status === 200 && response.data.total_models > 0) {
      console.log(`✅ PASSED - ${response.data.total_models} models available`);
      Object.entries(response.data.models).forEach(([key, value]) => {
        console.log(`   ${key}: ${value}`);
      });
      console.log();
      passedTests++;
    } else {
      console.log('❌ FAILED - No models found\n');
      failedTests++;
    }
  } catch (error) {
    console.log(`❌ FAILED - ${error.message}\n`);
    failedTests++;
  }

  // Test 4: Prediction endpoint
  try {
    console.log('Test 4: POST /api/predict (Make Prediction)');
    console.log('   Input data:', JSON.stringify(testData, null, 2));
    const response = await axios.post(`${API_URL}/api/predict`, testData);
    if (response.status === 200 && response.data.status === 'success') {
      console.log(`✅ PASSED - Prediction successful`);
      console.log(`   Confidence: ${(response.data.confidence * 100).toFixed(2)}%`);
      console.log(`   Ensemble prediction: ${response.data.ensemble_prediction}\n`);
      passedTests++;
    } else {
      console.log('❌ FAILED - Prediction failed\n');
      failedTests++;
    }
  } catch (error) {
    console.log(`❌ FAILED - ${error.message}\n`);
    failedTests++;
  }

  // Summary
  console.log('═'.repeat(50));
  console.log('📊 Test Summary');
  console.log('═'.repeat(50));
  console.log(`✅ Passed: ${passedTests}`);
  console.log(`❌ Failed: ${failedTests}`);
  console.log(`📈 Success rate: ${((passedTests / (passedTests + failedTests)) * 100).toFixed(1)}%\n`);

  if (failedTests === 0) {
    console.log('🎉 All tests passed! API is ready for production.\n');
    process.exit(0);
  } else {
    console.log('⚠️  Some tests failed. Check API connectivity and logs.\n');
    process.exit(1);
  }
}

// Run tests
runTests().catch((error) => {
  console.error('Fatal error:', error.message);
  process.exit(1);
});
