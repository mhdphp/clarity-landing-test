// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    headless: true,
    baseURL: 'file:///i:/Claude%20Code%20with%20Python%2C%20Power%20BI%2C%20Excel%2C%20PowerPoint%20%26%20Word/Project2%20-%20Clarity%20Landing/',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
