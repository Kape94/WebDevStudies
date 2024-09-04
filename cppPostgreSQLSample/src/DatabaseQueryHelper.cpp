#include <iostream>

#include "DatabaseQueryHelper.h"

//-----------------------------------------------------------------------------

ResultPtr DatabaseQueryHelper::Execute(const char* sqlQuery) {
  ResultPtr r = MakeResult(
    PQexec(Conn(), sqlQuery)
  );

  const bool errorOccured = CheckForErrors(r.get());
  if (errorOccured) {
    r.reset();
  }

  return r;
}

//-----------------------------------------------------------------------------

void DatabaseQueryHelper::PrintResult(
  const ResultPtr& r
)
{
  const int nRows = PQntuples(r.get());
  const int nCols = PQnfields(r.get());
  for (int i = 0; i < nRows; ++i) {
    for (int j = 0; j < nCols; ++j) {
      std::cout << PQgetvalue(r.get(), i, j) << " ";
    }
    std::cout << std::endl;
  }
}

//-----------------------------------------------------------------------------

bool DatabaseQueryHelper::CheckForErrors(PGresult* r) {
  const ExecStatusType status = PQresultStatus(r);
  if (status != PGRES_COMMAND_OK && status != PGRES_TUPLES_OK) {
    std::cerr << "Command failed: " << PQerrorMessage(Conn()) << std::endl;
    return true;
  }
  return false;
}

//-----------------------------------------------------------------------------

PGconn* DatabaseQueryHelper::Conn()
{
  return conn.get();
}

//-----------------------------------------------------------------------------
