cmake_minimum_required(VERSION 3.22)
project(main)

find_package(Crow CONFIG REQUIRED)

file(GLOB SRC_FILES *.cpp)
add_executable(${PROJECT_NAME} ${SRC_FILES})

target_include_directories(${PROJECT_NAME} PUBLIC 
  ..
)
target_link_libraries(main PRIVATE Crow::Crow asio::asio)

