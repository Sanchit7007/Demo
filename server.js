const express = require('express');
const app = express();

// Replace with your actual full name and date of birth (YYYY-MM-DD)
const fullName = 'your_full_name';
const dob = 'YYYY-MM-DD';
const userId = `${fullName.replace(/\s/g, '_')}_${dob.split('-').reverse().join('')}`;

app.post('/bfhl', (req, res) => {
  try {
    const data = req.body.data;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: 'Invalid data provided. Please provide an array.',
      });
    }

    const evenNumbers = data.filter((item) => item % 2 === 0);
    const oddNumbers = data.filter((item) => item % 2 !== 0);
    const alphabets = data
      .filter((item) => typeof item === 'string')
      .map((item) => item.toUpperCase());

    res.json({
      is_success: true,
      user_id: userId,
      even_numbers: evenNumbers,
      odd_numbers: oddNumbers,
      alphabets,
    });
  } catch (error) {
    console.error('Error processing data:', error);
    res.status(500).json({ is_success: false, message: 'Internal server error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
