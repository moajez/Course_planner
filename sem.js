document.getElementById('dateForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const initialDate = new Date(document.getElementById('initialDate').value);
    const finalDate = new Date(document.getElementById('finalDate').value);

    if (initialDate > finalDate) {
        document.getElementById('result').textContent = 'Initial date should not be more than final date.';
        return;
    }

    const timeDifference = finalDate - initialDate;
    const dayDifference = (timeDifference / (1000 * 3600 * 24)) + 1; // Include both initial and final dates

    const allDates = getAllDatesBetween(initialDate, finalDate);

    document.getElementById('result').textContent = `Total number of days: ${dayDifference}`;
    document.getElementById('nextPageButton').style.display = 'block';

    localStorage.setItem('totalDays', dayDifference);
    localStorage.setItem('allDates', JSON.stringify(allDates));
});

document.getElementById('nextPageButton').addEventListener('click', function() {
    window.location.href = 'week.html';
});

function getAllDatesBetween(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(formatDate(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}