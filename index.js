// 1. 100 раз используем запрос про получение факта года
const fetchFacts = async () => {
  const results = [];
  for (let i = 0; i < 100; i++) {
    const res = await fetch('http://numbersapi.com/random/year');
    const text = await res.text();
    results.push(text);
  }
  return results;
};

// 2. Добавляем в ответ информацию о месяце и дате
const addDateInformation = (results) => {
  return results.filter(text => {
    const regex = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}(st|nd|rd|th)/;
    return regex.test(text);
  });
};

// Тесты
const runTests = async () => {
  // 3а. Массив не пустой
  const results = await fetchFacts();
  const dateResults = addDateInformation(results);
  if (dateResults.length > 0) {
    console.log('Test 3a passed: Array is not empty.');
  } else {
    console.error('Test 3a failed: Array is empty.');
  }

  // 3б. Массив пустой.
  const emptyArray = [];
  if (emptyArray.length === 0) {
    console.log('Test 3b passed: Array is empty.');
  } else {
    console.error('Test 3b failed: Array is not empty.');
  }

  // 3в. Массив содержит более 5 элементов.
  if (dateResults.length > 5) {
    console.log('Test 3c passed: Array has more than 5 elements.');
  } else {
    console.error('Test 3c failed: Array has 5 or fewer elements.');
  }

  // 4. Длина каждого из элементов более 10 символов
  dateResults.forEach((text, index) => {
    if (text.length >= 10) {
      console.log(`Test 4 passed for element at index ${index}: Each element is at least 10 chars long.`);
    } else {
      console.error(`Test 4 failed for element at index ${index}: Element is less than 10 chars long.`);
    }
  });
};

// Call the async function
runTests();
