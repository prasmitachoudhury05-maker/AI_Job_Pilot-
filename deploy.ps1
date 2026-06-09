# deploy.ps1
# Automated Deployment Script for JobPilot Engine (Windows Environment)

Write-Host "=========================================="
Write-Host "🚀 Starting JobPilot Production Deployment"
Write-Host "=========================================="
Write-Host ""

Write-Host "[1/4] Installing Production Dependencies..."
npm install --omit=dev
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to install dependencies."
    exit 1
}

Write-Host "[2/4] Generating Prisma Client and Syncing Database..."
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to generate Prisma client."
    exit 1
}

npx prisma db push
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to sync database."
    exit 1
}

Write-Host "[3/4] Building Next.js Production Bundle..."
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to build Next.js application."
    exit 1
}

Write-Host ""
Write-Host "=========================================="
Write-Host "✅ Deployment Build Successful!"
Write-Host "=========================================="
Write-Host ""
Write-Host "You can now start the production server by running:"
Write-Host "> npm start"
Write-Host ""
Write-Host "The application will run continuously in production mode."
Write-Host "Monitor health at: http://localhost:3000/api/v1/health"
