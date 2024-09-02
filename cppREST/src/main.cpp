#include <crow.h>

int main() {
    crow::SimpleApp app;

    // Define a route
    CROW_ROUTE(app, "/")([]{
        return "Hello, World!";
    });

    // Define another route with parameters
    CROW_ROUTE(app, "/greet/<string>")([](const std::string& name){
        return "Hello, " + name + ". Have a nice day!";
    });
    
    // Define a route that handles JSON
    CROW_ROUTE(app, "/json")([]{
        crow::json::wvalue response;
        response["message"] = "This is a JSON response!";
        response["status"] = "success";
        return response;
    });

    // Start the server on port 18080
    app.port(18080).multithreaded().run();
}
