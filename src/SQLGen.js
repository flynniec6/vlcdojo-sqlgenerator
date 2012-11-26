function SQLGen() {

	this.values = new Array();
	this.columns = new Array();
	this.myTable = undefined;
	this.action = undefined;

	this.at = this;
	this.into = this;
	this.from = this;

	this.toString = function() {
		if (this.action == 'insert'){
			return this.toStringInsert();
		}

		return this.toStringSelect();
	};
	
	this.toStringInsert = function() {
		var theValues = this.values || "";
		var theColumns = this.columns || "";
		var theTable = this.myTable || "";
		return 'INSERT INTO ' + theTable + ' (' + theColumns + ') VALUES (' + theValues + ')';
	};

	this.toStringSelect = function() {
		var theValues = this.values || "";
		var theColumns = this.columns || "";
		var theTable = this.myTable || "";
		return 'SELECT ' + theColumns + ' FROM ' + theTable;
	};

	this.insert = function(values) {
		this.action = 'insert';

		if(!values) {
			return this;
		}

		this.values = values;
		return this;
	};

	this.select = function() {
		this.action = 'select';
		return this;
	};

	this.validSQL = function() {
		var everyValueWithColumn=(this.values.length == this.columns.length);
		var hasValuesAndColumns=(this.values && this.columns);
		return (this.hasTable() && this.action=='select') || (this.hasTable() && hasValuesAndColumns && everyValueWithColumn);
	};

	this.hasTable= function(){
		return (this.myTable != undefined);
	};

	this.value = function(value) {
		this.values.push(value);
		return this;
	};

	this.column = function(column) {
		this.columns.push(column);
		return this;
	};
	
	this.table = function(table) {
		this.myTable = table;
		return this;
	};



}