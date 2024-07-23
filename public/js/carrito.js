function fetchData() {
            fetch('/get-data')
                .then(res => res.json())
                .then(data => {
                    const tableBody = document.getElementById('t-body');
                    tableBody.innerHTML = '';  // Clear any existing rows
                    data.forEach(row => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td>${row.id_producto}</td>
                            <td>${row.cantidad_producto}</td>
                            <td>${row.nombre_producto}</td>
                            <td>$ ${row.precio_producto}</td>
                            <td>$ ${row.total_precio}</td>
                        `;
                        tableBody.appendChild(tr);
                        console.log(tr);
                    });
                })
                .catch(error => console.error('Error fetching data:', error));
        }

        document.addEventListener('DOMContentLoaded', function() {
            fetchData();  // Initial fetch
            setInterval(fetchData, 5000);  // Fetch data every 5 seconds
        });
