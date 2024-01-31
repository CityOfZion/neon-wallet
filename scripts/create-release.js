const fs = require('fs')
const { execSync } = require('child_process')

// Helper function to bump the version
function bumpVersion(version, versionChangeType) {
  const parts = version.split('.')

  // eslint-disable-next-line default-case
  switch (versionChangeType) {
    case 'patch':
      parts[2] = Number(parts[2]) + 1 // Bump patch version
      break
    case 'minor':
      parts[1] = Number(parts[1]) + 1 // Bump minor version
      parts[2] = 0 // Reset patch version
      break
    case 'major':
      parts[0] = Number(parts[0]) + 1 // Bump major version
      parts[1] = 0 // Reset minor version
      parts[2] = 0 // Reset patch version
      break
  }

  return parts.join('.')
}

// Read package.json
const packageJsonPath = 'package.json'
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath))

// Determine the version change type
const validVersionChangeTypes = ['patch', 'minor', 'major']
const versionChangeType = process.argv[2]

if (!validVersionChangeTypes.includes(versionChangeType)) {
  console.error('Invalid version change type. Please specify either "patch", "minor", or "major".')
  process.exit(1)
}

// Bump version
const currentVersion = packageJson.version
const newVersion = bumpVersion(currentVersion, versionChangeType)
packageJson.version = newVersion

// Write updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))

// Commit and push the changes
try {
  execSync('git add package.json')
  execSync(`git commit -m "Bump version to ${newVersion}"`)
  execSync('git push origin HEAD --no-verify')
} catch (error) {
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
console.log(
    `Version bumped to ${newVersion}, and a draft release will be created automatically 🚀...`
)