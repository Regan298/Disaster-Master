@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\node_modules\win-node-env\bin\CHAI_JEST_SNAPSHOT_UPDATE_ALL.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\node_modules\win-node-env\bin\CHAI_JEST_SNAPSHOT_UPDATE_ALL.js" %*
)