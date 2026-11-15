param (
    [string]$repoName = "gunnu"
)

$git = "C:\Program Files\Git\cmd\git.exe"
$githubUser = "dipakhere"

Write-Host "========================================" -ForegroundColor Magenta
Write-Host " Pushing Scrapbook to GitHub ($githubUser/$repoName)" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Magenta

# Ensure git config
& $git config --global user.name "Dipak Prasad"
& $git config --global user.email "dipakprasad1812@gmail.com"

# Set remote
& $git remote remove origin 2>$null
& $git remote add origin "https://github.com/$githubUser/$repoName.git"
& $git branch -M main

Write-Host "Pushing files..." -ForegroundColor Yellow
& $git push -u origin main --force

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSUCCESS! Pushed to GitHub!" -ForegroundColor Green
    Write-Host "Next step for live link:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://github.com/$githubUser/$repoName/settings/pages"
    Write-Host "2. Under 'Branch', select 'main' and click 'Save'"
    Write-Host "3. Your live link will be: https://$githubUser.github.io/$repoName/ `n" -ForegroundColor Green
} else {
    Write-Host "`nIf push failed, make sure you created the repo on https://github.com/new named '$repoName'!" -ForegroundColor Red
}
