#include <libpq-fe.h>

#include "TypeWrappers.h"

class DatabaseQueryHelper {
  public:

    DatabaseQueryHelper(ConnPtr& _conn) : conn(_conn) {}

    ResultPtr Execute(const char* sqlQuery);

    void PrintResult(const ResultPtr& r);

  private:

    PGconn* Conn();
    bool CheckForErrors(PGresult* r);

    ConnPtr& conn;
};
