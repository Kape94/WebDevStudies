cmake_minimum_required(VERSION 3.22)
project(newProject)

find_package(PostgreSQL REQUIRED)

file(GLOB SRC_FILES *.cpp)
add_executable(${PROJECT_NAME} ${SRC_FILES})

target_link_libraries(${PROJECT_NAME} PRIVATE PostgreSQL::PostgreSQL)

target_include_directories(${PROJECT_NAME} PUBLIC 
  ..
)

