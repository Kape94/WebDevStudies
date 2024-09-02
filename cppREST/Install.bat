git clone https://github.com/Microsoft/vcpkg.git

cd vcpkg

call bootstrap-vcpkg.bat

vcpkg install vcpkg-cmake
vcpkg install vcpkg-cmake-config

vcpkg install crow

pause
