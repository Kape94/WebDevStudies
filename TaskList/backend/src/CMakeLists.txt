cmake_minimum_required(VERSION 3.22)

find_package(Crow CONFIG REQUIRED)

file(GLOB SRC_FILES *.cpp)
add_executable(${PROJECT_NAME} ${SRC_FILES})

target_include_directories(${PROJECT_NAME} PUBLIC 
  ..
)
target_link_libraries(${PROJECT_NAME} PRIVATE Crow::Crow asio::asio)

