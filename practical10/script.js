
fetch('employees.json')
  .then(res => res.json())
  .then(data => {
    console.table(data);
    buildTable(data, "fetchTable");
    setupDepartmentFilter(data);
  })
  .catch(err => console.error("Fetch error:", err));

$.getJSON('employees.json', function(data) {
  console.table(data);
  buildTable(data, "jqueryTable");
});

function buildTable(data, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // clear old content

  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  const headers = ["ID", "Name", "Department", "Salary"];

  headers.forEach(h => {
    const th = document.createElement('th');
    th.textContent = h;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  data.forEach(emp => {
    const row = document.createElement('tr');
    if (emp.salary > 50000) row.classList.add("highlight");

    row.innerHTML = `
      <td>${emp.id}</td>
      <td>${emp.name}</td>
      <td>${emp.department}</td>
      <td>${emp.salary}</td>
    `;
    table.appendChild(row);
  });

  container.appendChild(table);
}

function setupDepartmentFilter(data) {
  const select = document.getElementById("deptFilter");

  const departments = [...new Set(data.map(e => e.department))];

  departments.forEach(dept => {
    const opt = document.createElement("option");
    opt.value = dept;
    opt.textContent = dept;
    select.appendChild(opt);
  });

  select.addEventListener("change", () => {
    const selected = select.value;
    const filtered = (selected === "all")
      ? data
      : data.filter(e => e.department === selected);
    buildTable(filtered, "fetchTable");
  });
}
