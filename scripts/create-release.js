const fs = require('fs')
const { execSync } = require('child_process')

// Helper function to bump the version
function bumpVersion(version) {
  const parts = version.split('.')
  parts[2] = Number(parts[2]) + 1 // Bump patch version
  return parts.join('.')
}

// Read package.json
const packageJsonPath = 'package.json'
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath))

// Bump version
const currentVersion = packageJson.version
const newVersion = bumpVersion(currentVersion)
packageJson.version = newVersion

// Write updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

// Commit and push the changes
try {
  execSync('git add package.json')
  execSync(`git commit -m "Bump version to ${newVersion}"`)
  execSync('git push origin HEAD --no-verify')
} catch (error) {
  console.log(error)
  console.error('Error occurred during commit and push:', error)
}

// Create and push the tag
try {
  execSync(`git tag v${newVersion}`)
  execSync(`git push origin v${newVersion} --no-verify`)
} catch (error) {
  console.error('Error occurred during tag creation and push:', error)
}

// eslint-disable-next-line
console.log(`Version bumped to ${newVersion}`)
