import subprocess
import re
import os
import logging
import sys

logger = logging.getLogger(__name__)

# algokit cli version that in which support for wizard v2 was first introduced
ALGOKIT_MIN_VERSION = "1.11.4"


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
    return tuple(map(int, version.split("."))) < tuple(map(int, min_version.split(".")))


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
