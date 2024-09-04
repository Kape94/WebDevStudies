#include "TypeWrappers.h"

//-----------------------------------------------------------------------------

namespace TypeWrappersImpl {
  void ConnDeleter(PGconn* conn);
  void ResultDeleter(PGresult* result);
}

//================================ TypeWrapper ================================

ConnPtr MakeConn(
  PGconn* conn
) 
{
  return ConnPtr(conn, TypeWrappersImpl::ConnDeleter);
}

//-----------------------------------------------------------------------------

ResultPtr MakeResult(
  PGresult* result
)
{
  return ResultPtr(result, TypeWrappersImpl::ResultDeleter);
}

//============================= TypeWrappersImpl ================================

namespace TypeWrappersImpl {
  void ConnDeleter(
    PGconn* conn
  )
  {
    PQfinish(conn);
  }

  void ResultDeleter(
    PGresult* result
  )
  {
    PQclear(result);
  }
}

//-----------------------------------------------------------------------------