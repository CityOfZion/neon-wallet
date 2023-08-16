import os
import hashlib
import subprocess
import requests

# This python script will download any release of neon-wallet and generate
# the checksums for each file. The checksums will be copied to your clipboard for pasting into
# the release notes on GitHub.

GITHUB_API_URL = "https://api.github.com/repos/CityOfZion/neon-wallet/releases"

def download_file(url, filename):
    response = requests.get(url, stream=True)
    total_size = int(response.headers.get('content-length', 0))
    with open(filename, 'wb') as file, tqdm(
        desc=filename,
        total=total_size,
        unit='B',
        unit_scale=True,
        unit_divisor=1024,
    ) as bar:
        for chunk in response.iter_content(chunk_size=8192):
            if chunk:
                file.write(chunk)
                bar.update(len(chunk))

def generate_checksum(filename):
    hasher = hashlib.sha256()
    with open(filename, 'rb') as file:
        while True:
            chunk = file.read(8192)
            if not chunk:
                break
            hasher.update(chunk)
    return hasher.hexdigest()

def delete_files(files):
    for file_name in files:
        try:
            os.remove(file_name)
        except OSError as e:
            print("Error deleting {}: {}".format(file_name, e))

def get_versions():
    response = requests.get(GITHUB_API_URL)
    if response.status_code == 200:
        releases = response.json()
        return [release['tag_name'] for release in releases]
    else:
        print("Error fetching versions from GitHub API")
        return []

def choose_version(versions):
    print("Select a version:")
    for i, version in enumerate(versions):
        print("{}: {}".format(i + 1, version))

    while True:
        try:
            selection = int(raw_input("Enter the number of the selected version: "))
            if 1 <= selection <= len(versions):
                return versions[selection - 1]
            else:
                print("Invalid selection. Please choose a valid number.")
        except ValueError:
            print("Invalid input. Please enter a number.")

def copy_to_clipboard(text):
    try:
        subprocess.Popen(['pbcopy'], stdin=subprocess.PIPE).communicate(text)
        print("\nOutput copied to clipboard.")
    except Exception as e:
        print("\nError copying to clipboard:", e)

def main():
    versions = get_versions()
    if not versions:
        print("No versions available.")
        return

    selected_version = choose_version(versions)

    base_url = "https://github.com/CityOfZion/neon-wallet/releases/download/" + selected_version

    files = [
        ("macOS arm64", "Neon." + selected_version[1:] + ".arm64.dmg"),
        ("macOS x64", "Neon." + selected_version[1:] + ".x64.dmg"),
        ("Windows", "Neon." + selected_version[1:] + ".exe"),
        ("Linux deb", "Neon." + selected_version[1:] + ".deb"),
        ("Linux AppImage", "Neon." + selected_version[1:] + ".AppImage")
    ]

    downloaded_files = []

    for platform, file_name in files:
        file_url = os.path.join(base_url, file_name)

        print("Downloading {}".format(platform))

        download_file(file_url, file_name)
        downloaded_files.append(file_name)
        checksum = generate_checksum(file_name)

    output = ""
    for platform, file_name in files:
        checksum = generate_checksum(file_name)

        if platform.startswith("Windows"):
            output += '**{}**: `{}`\n`certUtil -hashfile "{}" SHA256`\n'.format(platform, checksum, file_name)
        else:
            output += '**{}**: `{}`\n`sha256sum {}`\n'.format(platform, checksum, file_name)

        output += "\n"

    copy_to_clipboard(output)

    delete_files(downloaded_files)
    print("\nAll downloads and checksums are complete. Downloaded files have been deleted.")

if __name__ == "__main__":
    main()
