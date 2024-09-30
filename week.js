document.getElementById('weekdayForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedWeekdays = Array.from(document.querySelectorAll('input[name="weekday"]:checked')).map(input => parseInt(input.value));
    const allDates = JSON.parse(localStorage.getItem('allDates'));

    const selectedDates = allDates.filter(dateStr => {
        const date = parseDate(dateStr);
        return selectedWeekdays.includes(date.getDay());
    });

    document.getElementById('result').textContent = `Total selected weekdays: ${selectedDates.length}`;
    displaySelectedDates(selectedDates);

    // Store selected dates in local storage
    localStorage.setItem('selectedDates', JSON.stringify(selectedDates));
    console.log('Selected dates:', selectedDates);
});

function parseDate(dateStr) {
    const parts = dateStr.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are zero-based
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
}

function displaySelectedDates(dates) {
    const selectedDatesContainer = document.getElementById('selectedDates');
    selectedDatesContainer.innerHTML = '<h2>Selected Dates:</h2>';
    dates.forEach(date => {
        const dateElement = document.createElement('div');
        dateElement.textContent = date;
        selectedDatesContainer.appendChild(dateElement);
    });
}