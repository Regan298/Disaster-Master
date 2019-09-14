@IF EXIST "%~dp0\python.exe" (
  "%~dp0\python.exe"  "%~dp0\node_modules\casperjs\bin\casperjs" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  python  "%~dp0\node_modules\casperjs\bin\casperjs" %*
)