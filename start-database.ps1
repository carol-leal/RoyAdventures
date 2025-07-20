# start-database.ps1
# Use this script to start a docker container for a local development database on Windows

# Load environment variables from .env
$envFile = Get-Content ".env" | Where-Object { $_ -match "=" }
foreach ($line in $envFile) {
    $parts = $line -split '=', 2
    if ($parts.Count -eq 2) {
        [System.Environment]::SetEnvironmentVariable($parts[0].Trim(), $parts[1].Trim(), "Process")
    }
}

$databaseUrl = $env:DATABASE_URL
if (-not $databaseUrl) {
    Write-Error "DATABASE_URL not found in .env"
    exit 1
}

# Parse database URL
if ($databaseUrl -notmatch "^(postgres|postgresql):\/\/[^:]+:([^@]+)@[^:]+:(\d+)\/(.+)$") {
    Write-Error "DATABASE_URL format is invalid"
    exit 1
}
$DB_PASSWORD = $matches[2]
$DB_PORT = $matches[3]
$DB_NAME = $matches[4]

$DB_CONTAINER_NAME = "$DB_NAME-postgres"

# Check for Docker or Podman
$DOCKER_CMD = ""
if (Get-Command docker -ErrorAction SilentlyContinue) {
    $DOCKER_CMD = "docker"
} elseif (Get-Command podman -ErrorAction SilentlyContinue) {
    $DOCKER_CMD = "podman"
} else {
    Write-Error "Docker or Podman is not installed. Please install one and try again."
    exit 1
}

# Check if daemon is running
try {
    & $DOCKER_CMD info | Out-Null
} catch {
    Write-Error "$DOCKER_CMD daemon is not running. Please start it and try again."
    exit 1
}

# Check if port is in use
try {
    $tcpListener = [System.Net.Sockets.TcpClient]::new()
    $tcpListener.Connect("localhost", [int]$DB_PORT)
    Write-Error "Port $DB_PORT is already in use."
    $tcpListener.Close()
    exit 1
} catch {
    # Port is free
}

# Start or create container
$existingContainer = & $DOCKER_CMD ps -q -a -f "name=$DB_CONTAINER_NAME"
$runningContainer = & $DOCKER_CMD ps -q -f "name=$DB_CONTAINER_NAME"

if ($runningContainer) {
    Write-Host "Database container '$DB_CONTAINER_NAME' already running"
    exit 0
}

if ($existingContainer) {
    & $DOCKER_CMD start $DB_CONTAINER_NAME | Out-Null
    Write-Host "Existing database container '$DB_CONTAINER_NAME' started"
    exit 0
}

# Generate random password if still 'password'
if ($DB_PASSWORD -eq "password") {
    $choice = Read-Host "You are using the default database password. Generate a random one? (y/N)"
    if ($choice -ne "y" -and $choice -ne "Y") {
        Write-Error "Please change the default password in the .env file and try again."
        exit 1
    }

    $DB_PASSWORD = [Convert]::ToBase64String((1..12 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 } | ForEach-Object { [byte]$_ })) -replace '\+', '-' -replace '/', '_'
    (Get-Content .env) -replace ":password@", ":$DB_PASSWORD@" | Set-Content .env
}

# Run new container
& $DOCKER_CMD run -d `
  --name $DB_CONTAINER_NAME `
  -e POSTGRES_USER="postgres" `
  -e POSTGRES_PASSWORD="$DB_PASSWORD" `
  -e POSTGRES_DB="$DB_NAME" `
  -p "$DB_PORT`:5432" `
  postgres

if ($LASTEXITCODE -eq 0) {
    Write-Host "Database container '$DB_CONTAINER_NAME' was successfully created"
} else {
    Write-Error "Failed to create database container"
}
