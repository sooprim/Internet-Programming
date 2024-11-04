// script.js

document.addEventListener('DOMContentLoaded', () => {
    fetchAuthors();
    document.getElementById('closeModal').onclick = () => closeModal();
});

let authorsData = [];

async function fetchAuthors() {
    const response = await fetch('https://raw.githubusercontent.com/sweko/uacs-internet-programming-exams/main/dry-run-mid-term-2024/data/authors.json');
    authorsData = await response.json();
    populateNationalityFilter();
    displayAuthors(authorsData);
}

function populateNationalityFilter() {
    const nationalities = [...new Set(authorsData.map(author => author.nationality))];
    const nationalityFilter = document.getElementById('nationalityFilter');
    nationalities.forEach(nation => {
        const option = document.createElement('option');
        option.value = nation;
        option.textContent = nation;
        nationalityFilter.appendChild(option);
    });
}

function displayAuthors(authors) {
    const authorList = document.getElementById('authorList');
    authorList.innerHTML = '';

    authors.forEach(author => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${author.id}</td>
            <td>${author.name}</td>
            <td>${author.birth_date}</td>
            <td><input type="checkbox" disabled ${author.death_date ? '' : 'checked'}></td>
            <td>${calculateAge(author.birth_date, author.death_date)}</td>
            <td>${author.nationality}</td>
            <td><a href="#" onclick="showBibliography(${author.id})">${author.bibliography.length}</a></td>
            <td>${calculateYearsActive(author)}</td>
        `;
        authorList.appendChild(row);
    });
}

function calculateAge(birthDate, deathDate) {
    const birth = new Date(birthDate);
    const death = deathDate ? new Date(deathDate) : new Date();
    return death.getFullYear() - birth.getFullYear();
}

function calculateYearsActive(author) {
    const years = author.bibliography.map(book => book.year);
    const startYear = Math.min(...years);
    const endYear = author.death_date ? new Date(author.death_date).getFullYear() :
        Math.max(...years) >= new Date().getFullYear() - 2 ? 'present' : Math.max(...years);
    return `${startYear} - ${endYear}`;
}

function showBibliography(authorId) {
    const author = authorsData.find(a => a.id === authorId);
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    author.bibliography.sort((a, b) => b.year - a.year).forEach(book => {
        const item = document.createElement('li');
        item.textContent = `${book.year} - ${book.name} (${book.type})`;
        bookList.appendChild(item);
    });

    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function applyFilters() {
    const nameFilter = document.getElementById('nameFilter').value.toLowerCase();
    const nationalityFilter = document.getElementById('nationalityFilter').value;
    const aliveFilter = document.getElementById('aliveFilter').checked;
    const activeYearFilter = document.getElementById('activeYearFilter').value;

    const filteredAuthors = authorsData.filter(author => {
        const matchesName = author.name.toLowerCase().includes(nameFilter);
        const matchesNationality = nationalityFilter ? author.nationality === nationalityFilter : true;
        const matchesAlive = aliveFilter ? !author.death_date : true;
        const matchesYearActive = activeYearFilter ? 
            calculateYearsActive(author).includes(activeYearFilter) : true;

        return matchesName && matchesNationality && matchesAlive && matchesYearActive;
    });

    displayAuthors(filteredAuthors);
}

function sortTable(column) {
    const sortOrder = column === currentSortColumn ? -currentSortOrder : 1;
    authorsData.sort((a, b) => (a[column] > b[column] ? sortOrder : -sortOrder));
    displayAuthors(authorsData);
    currentSortColumn = column;
    currentSortOrder = sortOrder;
}

let currentSortColumn = null;
let currentSortOrder = 1;