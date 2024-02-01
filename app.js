const express = require('express');
const app = express();

app.get('/mean', (req, res) => {
    const nums = req.query.nums;

    if(!nums){
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }

    const numbers = nums.split(',').map(Number);

    if (numbers.some(isNaN)) {
        throw new ExpressError('Invalid number detected in nums.', 400);
    }

    if (numbers.length === 0) {
        throw new ExpressError('List of numbers cannot be empty.', 400);
    }

    const mean = numbers.reduce((acc, num) => acc + num) / numbers.length;

    res.json({ operation: 'mean', value: mean});
})

app.get('/median', (req, res) => {
    const nums = req.query.nums;

    if(!nums){
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
    }

    const numbers = nums.split(',').map(Number);

    if (numbers.some(isNaN)) {
        throw new ExpressError('Invalid number detected in nums.', 400);
    }

    if (numbers.length === 0) {
        throw new ExpressError('List of numbers cannot be empty.', 400);
    }

    numbers.sort((a, b) => a - b);

    let median;
    const mid = Math.floor(numbers.length / 2);
  
    if (numbers.length % 2 === 0) {
      median = (numbers[mid - 1] + numbers[mid]) / 2;
    } else {
      median = numbers[mid];
    }
  
    res.json({ operation: 'median', value: median });
})

app.get('/mode', (req, res) => {
    const nums = req.query.nums;

    if (!nums) {
        throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
    }

    const numbers = nums.split(',').map(Number);

    if (numbers.some(isNaN)) {
        throw new ExpressError('Invalid number detected in nums.', 400);
    }

    const frequencyMap = {};
    let modes = [];
    let maxFrequency = 0;

    numbers.forEach((num) => {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;

        if (frequencyMap[num] > maxFrequency) {
            maxFrequency = frequencyMap[num];
            modes = [num];
        } else if (frequencyMap[num] === maxFrequency) {
            modes.push(num);
        }
    });

    res.json({ operation: 'mode', value: modes });
})
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});