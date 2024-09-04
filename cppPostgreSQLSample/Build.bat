@echo off
setlocal

:: 1) Setup vcpkg 
git clone https://github.com/Microsoft/vcpkg.git

cd vcpkg

call bootstrap-vcpkg.bat

:: 2) Install dependencies

vcpkg install vcpkg-cmake
vcpkg install vcpkg-cmake-config
vcpkg install libpq

:: 3) Build the project
cd ..
SET CMAKE=""

for /f "delims=" %%i in ('dir /s /b cmake.exe 2^>nul') do (
    SET CMAKE=%%i
)

SET VCPKG_TOOLCHAIN=vcpkg/scripts/buildsystems/vcpkg.cmake

mkdir BUILD
cd BUILD

%CMAKE% .. -DCMAKE_TOOLCHAIN_FILE=../%VCPKG_TOOLCHAIN%
%CMAKE% --build . 

pause