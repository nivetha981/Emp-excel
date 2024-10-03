 const url = 'https://raw.githubusercontent.com/nivetha981/Emp-excel/b2d61be643ef50c2334f3a6ee4d500b8c7f09d69/employee.xlsx';

        document.getElementById('loadExcel').addEventListener('click', () => {
            fetch(url)
                .then(response => response.arrayBuffer())
                .then(data => {
                    const workbook = XLSX.read(data, { type: 'array' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];

                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                    displayData(jsonData);
                })
                .catch(error => console.error('Error loading Excel file:', error));
        });

        function displayData(data) {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; // Clear previous results

            // Store all employee data for filtering
            window.employeeData = data;

            // Display the data
            data.forEach((row, index) => {
                // Skip the header row
                if (index === 0) return;

                const employeeCard = document.createElement('div');
                employeeCard.className = 'col-md-4 employee-card';
                employeeCard.textContent = `Name: ${row[0]}, Role: ${row[1]}, Department: ${row[2]}`;
                resultsDiv.appendChild(employeeCard);
            });
        }

        function filterResults() {
            const searchValue = document.getElementById('searchInput').value.toLowerCase();
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; // Clear previous results

            // Filter and display results based on search input
            window.employeeData.forEach((row, index) => {
                if (index === 0) return; // Skip header row
                const name = row[0].toLowerCase();
                const role = row[1].toLowerCase();
                const department = row[2].toLowerCase();

                if (name.includes(searchValue) || role.includes(searchValue) || department.includes(searchValue)) {
                    const employeeCard = document.createElement('div');
                    employeeCard.className = 'col-md-4 employee-card';
                    employeeCard.textContent = `Name: ${row[0]}, Role: ${row[1]}, Department: ${row[2]}`;
                    resultsDiv.appendChild(employeeCard);
                }
            });
        }