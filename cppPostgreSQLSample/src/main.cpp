#include <format>
#include <iostream>
#include <sstream>

#include <libpq-fe.h>

#include "DatabaseQueryHelper.h"
#include "TypeWrappers.h"

//-----------------------------------------------------------------------------

namespace PostgreSQLDatabaseInfo {
  const std::string host = "<host>";
  const std::string dbname = "<database>";
  const std::string user = "<user>";
  const std::string password = "<password>";

  std::string connInfo() 
  {
    std::stringstream ss;
    ss << "host=" << host <<
          " dbname=" << dbname <<
          " user=" << user << 
          " password=" << password;
    
    return ss.str();
  }
}

//-----------------------------------------------------------------------------

int main() {
  ConnPtr conn = MakeConn(
    PQconnectdb(PostgreSQLDatabaseInfo::connInfo().c_str())
  );

  if (PQstatus(conn.get()) != CONNECTION_OK) {
    std::cerr << "Connection failed with error: " << 
      PQerrorMessage(conn.get()) << std::endl;

    return 1;
  }

  DatabaseQueryHelper queryHelper(conn);

  queryHelper.Execute(
    R"(
      CREATE TABLE character (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        health DECIMAL(10, 2)
      );
    )"
  );

  queryHelper.Execute(
    R"(
      INSERT INTO character(name, health) VALUES
        ('Mario', 50),
        ('Luigi', 70),
        ('Koopa', 100);
    )"
  );

  ResultPtr r = queryHelper.Execute(
    R"(
      SELECT * FROM character
    )"
  );
  queryHelper.PrintResult(r);

  queryHelper.Execute(
    R"(
      DROP TABLE character;
    )"
  );

  return 0;
}

//-----------------------------------------------------------------------------
