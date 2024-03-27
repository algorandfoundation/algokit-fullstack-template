import subprocess
import re
import os
import logging
import sys

logger = logging.getLogger(__name__)

# algokit cli version that in which support for wizard v2 was first introduced
ALGOKIT_MIN_VERSION = "2.0.0"


def get_algokit_version():
    try:
        output = subprocess.check_output(["algokit", "--version"], text=True)
        version_match = re.search(r"\d+\.\d+\.\d+", output)
        if version_match:
            return version_match.group(0)
    except Exception as e:
        logger.error(f"Failed to get algokit version: {e}")
        exit(1)


def is_smaller(version, min_version):
    def parse_version(v):
        # Extract main version and pre-release, adjusting for the new format
        main, _, pre = re.match(r"(\d+\.\d+\.\d+)(-?b(\d+))?", v).groups()
        main_parts = list(map(int, main.split(".")))
        pre_parts = (
            [int(pre)] if pre else [9999]  # Assume a high number for release version
        )
        return main_parts, pre_parts

    version_main, version_pre = parse_version(version)
    min_version_main, min_version_pre = parse_version(min_version)

    # Compare main version parts
    if version_main < min_version_main:
        return True
    elif version_main > min_version_main:
        return False

    # If main versions are equal, compare pre-release versions
    return version_pre < min_version_pre


def delete_file(file_path):
    """Deletes a file if it exists."""
    try:
        os.remove(file_path)
        logger.debug(f"File {file_path} removed successfully.")
    except OSError as e:
        logger.error(f"Error: {file_path} : {e.strerror}")


def main():
    version = get_algokit_version()

    if is_smaller(version, ALGOKIT_MIN_VERSION):
        logger.warning(
            "⚠️  Warning: Incompatible algokit version, please update to the latest version. See https://github.com/algorandfoundation/algokit-cli/releases/latest"
        )
        sys.exit(1)


if __name__ == "__main__":
    main()
    delete_file(os.path.realpath(__file__))
