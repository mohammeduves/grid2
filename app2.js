document.body.onload = loadUI();
function getGridValues() {
  var rows = document.getElementById("rows").value;
  var columns = document.getElementById("columns").value;
  var gridValues = { rows, columns };
  return gridValues;
}

function loadUI() {
  //Creating First Input

  var inputDiv = document.createElement("div");
  inputDiv.className = "inputDiv";
  var label1 = document.createElement("label");
  label1.name = "enterRows";
  label1.id = "enterRows";
  label1.textContent = "Enter Rows: ";

  var rows = document.createElement("input");
  rows.name = "rows";
  rows.placeholder = "Enter Number Of Rows";
  rows.id = "rows";

  //Creating Second Input
  var label2 = document.createElement("label");
  label2.name = "enterColumns";
  label2.id = "enterColumns";
  label2.textContent = "Enter Columns: ";
  var columns = document.createElement("input");
  columns.name = "columns";
  columns.placeholder = "Enter Number Of columns";
  columns.id = "columns";

  //--------------------Creating Buttons-------------------------------
  var loadGrid = document.createElement("button");
  var newColumn = document.createElement("button");
  var newRow = document.createElement("button");

  //loadGrid button
  loadGrid.name = "loadGrid";
  loadGrid.id = "loadGrid";
  loadGrid.addEventListener("click", load);
  loadGrid.textContent = "Load Grid";
  //---------------------------------
  //newRow button
  newRow.name = "newRow";
  newRow.id = "newRow";
  newRow.textContent = "Add New Row";
  newRow.addEventListener("click", addNewRow);
  //---------------------------------------------------
  //newColumn button
  newColumn.name = "newColumn";
  newColumn.id = "newColumn";
  newColumn.textContent = "Add New Column";
  newColumn.addEventListener("click", addNewColumn);
  var lineBreak = document.createElement("br");
  var lineBreak2 = document.createElement("br");
  //-------------------------------------------

  //Appending nodes
  inputDiv.appendChild(label1);
  inputDiv.appendChild(rows);
  inputDiv.appendChild(lineBreak);
  inputDiv.appendChild(lineBreak2);
  inputDiv.appendChild(label2);
  inputDiv.appendChild(columns);
  inputDiv.appendChild(loadGrid);
  inputDiv.appendChild(newColumn);
  inputDiv.appendChild(newRow);
  document.body.appendChild(inputDiv);
}

function createTable() {
  var table = document.createElement("table");
  table.setAttribute("id", "table");
  table.setAttribute("border", "1");
  return table;
}

function createTr() {
  var tr = document.createElement("tr");
  return tr;
}

function createTd() {
  var td = document.createElement("td");
  var span = document.createElement("span");
  var tdText = document.createTextNode("Text");
  span.setAttribute("contenteditable", true);
  span.appendChild(tdText);
  td.appendChild(span);
  return td;
}

function load() {
  var gridValues = getGridValues();
  var row = parseInt(gridValues.rows);
  var columns = parseInt(gridValues.columns);
  console.log(row, columns);
  var table = loadTable(row, columns);
  document.body.appendChild(table);
  var lstCell = findLastCell();
  lstCell.addEventListener("keydown", function(event) {
    eventChecking(event);
  });
}

function loadTable(row, columns) {
  var lastCell = false;
  var table = createTable();

  for (var i = 0; i < row; i++) {
    var tr = createTr();
    for (var j = 0; j < columns; j++) {
      var td = createTd();
      td.firstChild.textContent = "R" + (i + 1) + ",C" + (j + 1);
      td.firstChild.setAttribute("id", "R" + (i + 1) + ",C" + (j + 1));
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  return table;
}

function eventChecking(e) {
  if (event.keyCode == 9) {
    addNewRow(e);
  }
}

function addNewRow(e) {
  var cellcount = cellCount();
  var newTr = createTr();
  var table = document.getElementById("table");
  for (var i = 0; i < cellcount; i++) {
    var newTd = createTd();
    newTd.firstChild.textContent = "new Row";
    newTr.appendChild(newTd);
  }

  table.appendChild(newTr);

  return table;
}

function addNewColumn() {
  var tr = document.getElementsByTagName("tr");
  for (var i = 0; i < tr.length; i++) {
    var newTd = createTd();
    newTd.firstChild.textContent = "new column";
    tr[i].appendChild(newTd);
  }
}

function findLastCell() {
  var table = document.getElementById("table");
  var eventCell = table.lastChild.lastChild.lastChild;
  return eventCell;
}

function cellCount() {
  var rows = document.getElementsByTagName("tr").length;
  var cells = document.getElementsByTagName("td").length;
  var cellcount = cells / rows;
  return cellcount;
}
