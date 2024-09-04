#include <libpq-fe.h>

#include <memory>

using ConnPtr = std::unique_ptr<PGconn, void(*)(PGconn*)>;
ConnPtr MakeConn(PGconn* conn);

using ResultPtr = std::unique_ptr<PGresult, void(*)(PGresult*)>;
ResultPtr MakeResult(PGresult* r);