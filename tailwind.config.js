const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
    content: [
        './App.tsx',
        './index.tsx',
        './src/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {},
      },
    plugins: [],
});