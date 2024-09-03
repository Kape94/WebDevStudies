#include <crow.h>
#include <crow/middlewares/cors.h>

#include <string>
#include <vector>

#include <iostream>

int main() {
    crow::App<crow::CORSHandler> app;

    std::vector<std::string> tasks;

    CROW_ROUTE(app, "/tasks").methods("GET"_method)([&tasks] {
      crow::json::wvalue::list wvalueTasks;
      for (const std::string& task : tasks) {
        wvalueTasks.push_back({task});
      }

      crow::json::wvalue val(wvalueTasks);

      return val;
    });

    CROW_ROUTE(app, "/tasks").methods("POST"_method)([&tasks] (const crow::request& req) {
      const crow::json::rvalue reqJson = crow::json::load(req.body);
      const std::string task = reqJson["task"].s();

      tasks.push_back(task);

      crow::json::wvalue resJson;
      resJson["status"] = crow::OK;
      resJson["message"] = "Added task succesfully";
      return resJson;
    });

    app.port(3000).multithreaded().run();
}
