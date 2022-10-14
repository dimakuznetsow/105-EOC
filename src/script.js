// DON'T EDIT THOSE LINES
const dataURLBase = "https://docs.google.com/spreadsheets/d/";
const dataURLEnd = "/gviz/tq?tqx=out:json&tq&gid=";
const id = "1C1-em4w0yHmd2N7__9cCSFzxBEf_8r74hQJBsR6qWnE=";
const gids = ["0", "1574569648", "1605451198"];
// END OF DATA SETUP

const nameSheet = dataURLBase + id + dataURLEnd + gids.at(0);
const hireDateSheet = dataURLBase + id + dataURLEnd + gids.at(1);
const salarySheet = dataURLBase + id + dataURLEnd + gids.at(2);

const getData = async () => {
  const responseName = await fetch(nameSheet);
  const dataName = await responseName.text();

  const responseHireDate = await fetch(hireDateSheet);
  const dataHireDate = await responseHireDate.text();

  const responseSalary = await fetch(salarySheet);
  const dataSalary = await responseSalary.text();

  const objectName = JSON.parse(dataName.substring(47).slice(0, -2)).table.rows;
  const objectHireDate = JSON.parse(
    dataHireDate.substring(47).slice(0, -2)
  ).table;
  const arrayHireDate = objectHireDate.rows;
  const objectSalary = JSON.parse(dataSalary.substring(47).slice(0, -2)).table;
  const arraySalary = objectSalary.rows;

  // const lastNameHeader = objectName[0].c[1].v;
  // const firstNameHeader = objectName[0].c[0].v;
  // const hireDateHeader = objectHireDate.cols[0].label;
  // const capitalizeHireDateHeader = hireDateHeader.split(" ");
  // const salaryHeader = objectSalary.cols[0].label;

  function getNamesArray() {
    returnSheet = [];

    for (let i = 1; i < objectName.length; i++) {
      const hireDateToFormat = objectHireDate.rows[i - 1].c[0].f;
      const hireDateFormat = new Date(hireDateToFormat);

      const salaryToFormat = objectSalary.rows[i - 1].c[0].f;
      const salaryFormat = salaryToFormat * 1;

      returnSheet.push({
        last: objectName[i].c[1].v,
        first: objectName[i].c[0].v,
        date: hireDateFormat.toDateString().slice(4, 15),
        salary: salaryFormat.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
      });
    }
  }

  getNamesArray();

  // for (let i = 0; i < capitalizeHireDateHeader.length; i++) {
  //   capitalizeHireDateHeader[i] =
  //     capitalizeHireDateHeader[i][0].toUpperCase() +
  //     capitalizeHireDateHeader[i].substr(1);
  // }

  return [objectName, arrayHireDate, arraySalary];
};

getData()
  .then((data) => {
    $("#employees").bootstrapTable({
      columns: [
        {
          field: "last",
          title: "Last",
          sortable: true,
        },
        {
          field: "first",
          title: "First",
          sortable: true,
        },
        {
          field: "date",
          title: "Hire Date",
          sortable: true,
          sorter(a, b) {
            if (new Date(a) < new Date(b)) return -1;
            if (new Date(a) > new Date(b)) return 1;
            return 0;
          },
        },
        {
          field: "salary",
          title: "Salary",
          sortable: true,
          sorter(a, b) {
            a.replace(/[^\d\.]/g, "");
            return (
              Number(a.replace(/[^\d\.]/g, "")) -
              Number(b.replace(/[^\d\.]/g, ""))
            );
          },
        },
      ],
      data: returnSheet,
    });
    console.log("resolved ", data);
  })

  .catch((err) => console.log("rejected ", err.message));

// getNameData()
//   .then((data) => {
//     $("#employees").bootstrapTable({
//       columns: [
//         {
//           field: "last",
//           title:
//             lastNameHeader[0].toUpperCase() +
//             lastNameHeader.substring(1).toLowerCase(),
//           sortable: true,
//         },
//         {
//           field: "first",
//           title:
//             firstNameHeader[0].toUpperCase() +
//             firstNameHeader.substring(1).toLowerCase(),
//           sortable: true,
//         },
//         {
//           field: "hire date",
//           title: capitalizeHireDateHeader.join(" "),
//           sortable: true,
//         },
//         {
//           field: "salary",
//           title:
//             salaryHeader[0].toUpperCase() +
//             salaryHeader.substring(1).toLowerCase(),
//           sortable: true,
//           sorter(a, b) {
//             a.replace(/[^\d\.]/g, "");
//             return (
//               Number(a.replace(/[^\d\.]/g, "")) -
//               Number(b.replace(/[^\d\.]/g, ""))
//             );
//           },
//         },
//       ],
//     });
//     console.log("resolved ", data);
//   })

//   .catch((err) => console.log("rejected", err.message));

// const getNameData = async () => {
//   const response = await fetch(nameSheet);
//   const data = await response.text();

//   const fetchedDatas = JSON.parse(data.match(/(?<=.*\().*(?=\);)/s)[0]);

//   const table1 = document.createElement("tr");
//   table1.className = "Last";
//   const table2 = document.createElement("tr");
//   table2.className = "First";
//   const lastName = document.createElement("th");
//   lastName.className = "column-header";
//   const firstName = document.createElement("th");
//   firstName.className = "column-header";

//   lastName.innerHTML = fetchedDatas.table.rows[0].c[1].v;
//   firstName.innerHTML = fetchedDatas.table.rows[0].c[0].v;

//   const columnLength = fetchedDatas.table.rows.length;

//   sheetNew.appendChild(table1);
//   sheetNew.appendChild(table2);

//   table1.appendChild(lastName);
//   for (let i = 1; i < columnLength; i++) {
//     const firstNameColumn = document.createElement("td");
//     table1.append(firstNameColumn);

//     firstNameColumn.innerHTML = fetchedDatas.table.rows[i].c[1].v;
//   }

//   table2.appendChild(firstName);
//   for (let i = 1; i < columnLength; i++) {
//     const lastNameColumn = document.createElement("td");
//     table2.append(lastNameColumn);

//     lastNameColumn.innerHTML = fetchedDatas.table.rows[i].c[0].v;
//   }

//   return fetchedDatas;
// };

// const getHireData = async () => {
//   const response = await fetch(hireDateSheet);
//   const data = await response.text();

//   const fetchedDatas = JSON.parse(data.match(/(?<=.*\().*(?=\);)/s)[0]);

//   const table3 = document.createElement("tr");
//   table3.className = "Hire-Date";
//   const hireDate = document.createElement("th");
//   hireDate.className = "column-header";

//   hireDate.innerHTML = fetchedDatas.table.cols[0].label;

//   const columnLength = fetchedDatas.table.rows.length;

//   sheetNew.appendChild(table3);

//   table3.appendChild(hireDate);

//   for (let i = 0; i < columnLength; i++) {
//     const hireDateColumn = document.createElement("td");
//     table3.append(hireDateColumn);

//     hireDateColumn.innerHTML = fetchedDatas.table.rows[i].c[0].f;
//   }

//   return fetchedDatas;
// };

// const getSalaryData = async () => {
//   const response = await fetch(salarySheet);
//   const data = await response.text();

//   const fetchedDatas = JSON.parse(data.match(/(?<=.*\().*(?=\);)/s)[0]);

//   const table4 = document.createElement("tr");
//   table4.className = "Salary";
//   const salarySum = document.createElement("th");
//   salarySum.className = "column-header";

//   salarySum.innerHTML = fetchedDatas.table.cols[0].label;

//   const columnLength = fetchedDatas.table.rows.length;

//   sheetNew.appendChild(table4);

//   table4.appendChild(salarySum);

//   for (let i = 0; i < columnLength; i++) {
//     const salaryColumn = document.createElement("td");
//     table4.append(salaryColumn);

//     salaryColumn.innerHTML = fetchedDatas.table.rows[i].c[0].v;
//   }

//   return fetchedDatas;
// };

// getNameData()
//   .then((data) => console.log("resolved ", data))
//   .catch((err) => console.log("rejected", err.message));

// getHireData()
//   .then((data) => console.log("resolved ", data))
//   .catch((err) => console.log("rejected", err.message));

// getSalaryData()
//   .then((data) => console.log("resolved ", data))
//   .catch((err) => console.log("rejected", err.message));

// lastName = fetchedDatas.table.rows[0].c[1].v;
// firstName = fetchedDatas.table.rows[0].c[0].v;

// const columnLength = fetchedDatas.table.rows.length;

// for (let i = 0; i < columnLength; i++) {
//   firstNameColumn = fetchedDatas.table.rows[i].c[0].v;
//   lastNameColumn = fetchedDatas.table.rows[i].c[1].v;

//   sheetNew.innerHTML +=
//     "<tr>" +
//     "<th>" +
//     "</th>" +
//     "<td>" +
//     firstNameColumn +
//     "</td>" +
//     "<td>" +
//     lastNameColumn +
//     "</td>" +
//     "<tr>";
// }

// const getHireData = async () => {
//   const response = await fetch(hireDateSheet);
//   const data = await response.text();

//   const fetchedDatas = JSON.parse(data.match(/(?<=.*\().*(?=\);)/s)[0]);

//   const columnLength = fetchedDatas.table.rows.length;

//   for (let i = 0; i < columnLength; i++) {
//     hireDate = fetchedDatas.table.rows[i].c[0].f;
//     document.getElementById("employees").innerHTML +=
//       "<tr>" + "<td>" + hireDate + "</td>" + "<tr>";
//   }

//   return fetchedDatas;
// };

// const getSalary = async () => {
//   const response = await fetch(salarySheet);
//   const data = await response.text();

//   const fetchedDatas = JSON.parse(data.match(/(?<=.*\().*(?=\);)/s)[0]);

//   const columnLength = fetchedDatas.table.rows.length;

//   for (let i = 0; i < columnLength; i++) {
//     salarySum = fetchedDatas.table.rows[i].c[0].v;
//     document.getElementById("employees").innerHTML +=
//       "<tr>" + "<td>" + salarySum + "</td>" + "<tr>";
//   }

//   return fetchedDatas;
// };

// getNameData()
//   .then((data) => console.log("resolved ", data))
//   .catch((err) => console.log("rejected", err.message));

// getHireData()
//   .then((data) => console.log("resolved ", data))
//   .catch((err) => console.log("rejected", err.message));

// getSalary()
//   .then((data) => console.log("resolved ", data))
//   .catch((err) => console.log("rejected", err.message));

// const $table = $("#table");
// const mydata = JSON.parse(data.match(/(?<=.*\().*(?=\);)/s)[0]);

// console.log(mydata);
