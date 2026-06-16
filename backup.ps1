# PowerShell backup script for Grow With Us agency website
$ErrorActionPreference = "Stop"

# Define backup directory
$BackupParentDir = "C:\Users\Manish\.gemini\antigravity\scratch\grow-with-us_backups"
$ProjectDir = $PSScriptRoot

# Create backup parent directory if it doesn't exist
if (-not (Test-Path -Path $BackupParentDir)) {
    New-Item -ItemType Directory -Path $BackupParentDir -Force | Out-Null
}

# Fetch latest git commit information
$CommitHash = "unknown"
$CommitMessage = "Manual-Backup"

try {
    # Verify if Git is initialized and contains commits
    if (git status 2>$null) {
        $CommitHash = (git log -1 --format="%h").Trim()
        $CommitMessage = (git log -1 --format="%f").Trim()
    }
} catch {
    # Git not ready or no commits yet
}

# Format Timestamp
$Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

# Target Backup Folder Name
$BackupFolderName = "${Timestamp}_${CommitHash}_${CommitMessage}"
$BackupPath = Join-Path -Path $BackupParentDir -ChildPath $BackupFolderName

# Create the specific backup folder
New-Item -ItemType Directory -Path $BackupPath -Force | Out-Null

Write-Host "Creating backup: $BackupFolderName..."

$ItemsToCopy = Get-ChildItem -Path $ProjectDir | Where-Object { 
    $_.Name -ne ".git" -and $_.Name -ne "backup.ps1" -and $_.Name -ne "node_modules" -and $_.Name -ne "dist"
}

foreach ($item in $ItemsToCopy) {
    Copy-Item -Path $item.FullName -Destination $BackupPath -Recurse -Force
}

Write-Host "Backup completed successfully at $BackupPath"

# Maintain only the last 5 backups
$Backups = Get-ChildItem -Path $BackupParentDir -Directory | Sort-Object Name

if ($Backups.Count -gt 5) {
    $CountToDelete = $Backups.Count - 5
    $ToPurge = $Backups | Select-Object -First $CountToDelete
    
    foreach ($folder in $ToPurge) {
        Write-Host "Purging old backup: $($folder.Name)..."
        Remove-Item -Path $folder.FullName -Recurse -Force
    }
}

Write-Host "Local backup log synced. Total backups kept: $([Math]::Min($Backups.Count, 5))"
