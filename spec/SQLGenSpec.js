describe("SQLGen", function() {
  
  var generator;

  beforeEach(function() {
    generator = new SQLGen();
  });

  it("suports insert ", function() {
    expect(generator.insert().toString()).toEqual('INSERT INTO  () VALUES ()');
    expect(generator.validSQL()).toBeFalsy();
  });

  it("suports insert value", function() {
    expect(generator.insert("aValue").toString()).toEqual('INSERT INTO  () VALUES (aValue)');
    expect(generator.validSQL()).toBeFalsy();
  });

  it("suports insert values", function() {
    expect(generator.insert(["aValue","anotherValue"]).toString()).toEqual('INSERT INTO  () VALUES (aValue,anotherValue)');
    expect(generator.validSQL()).toBeFalsy();
  });
  
  it("suports insert values with value clause", function() {
    expect(generator.insert().value("aValue").value("anotherValue").toString()).toEqual('INSERT INTO  () VALUES (aValue,anotherValue)');
    expect(generator.validSQL()).toBeFalsy();
  });

  it("suports insert value at a column", function() {
    generator.insert().value("aValue").at.column("aColumn");
    expect(generator.toString()).toEqual('INSERT INTO  (aColumn) VALUES (aValue)');
    expect(generator.validSQL()).toBeFalsy();
  });

  it("suports insert values at columns", function() {
    generator.insert().value("aValue").at.column("aColumn").value("anotherValue").at.column("anotherColumn");
    expect(generator.toString()).toEqual('INSERT INTO  (aColumn,anotherColumn) VALUES (aValue,anotherValue)');
    expect(generator.validSQL()).toBeFalsy();
  });
  
  it("supports insert into table", function() {
    generator.insert().into.table("aTable").value("aValue").at.column("aColumn");
    expect(generator.toString()).toEqual('INSERT INTO aTable (aColumn) VALUES (aValue)');
    expect(generator.validSQL()).toBeTruthy();
  });

  it("supports insert into table", function() {
    generator.insert().into.table("aTable").value("aValue").value("anotherValue").at.column("aColumn");
    expect(generator.toString()).toEqual('INSERT INTO aTable (aColumn) VALUES (aValue,anotherValue)');
    expect(generator.validSQL()).toBeFalsy();
  });

  it("supports select ", function() {
    generator.select().from.table("aTable").column("aColumn");
    expect(generator.toString()).toEqual('SELECT aColumn FROM aTable');
    expect(generator.validSQL()).toBeTruthy();
  });

});