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