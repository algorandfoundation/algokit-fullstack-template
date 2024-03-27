import json
import os
from pathlib import Path
import shutil
import sys
import logging

logger = logging.getLogger(__name__)

ROOT_DIR = os.getcwd()


def write_back_to_file(file_path, data):
    """Writes the modified package data back to the file."""
    with open(file_path, "w") as f:
        json.dump(data, f, indent=2)


def inject_file(source_file, dest_file):
    """Takes an input file and replaces file at destination with the input"""
    if os.path.isfile(dest_file):
        logger.debug(f"File {dest_file} exists and will be replaced.")
    shutil.copy2(source_file, dest_file)


def delete_file(file_path):
    """Deletes a file if it exists."""
    try:
        os.remove(file_path)
        logger.debug(f"File {file_path} removed successfully.")
    except OSError as e:
        logger.error(f"Error: {file_path} : {e.strerror}")


def delete_folder(folder_path):
    """Deletes a folder if it exists."""
    try:
        shutil.rmtree(folder_path)
        logger.debug(f"Folder {folder_path} removed successfully.")
    except OSError as e:
        logger.error(f"Error: {folder_path} : {e.strerror}")


def delete_script():
    """Deletes the current script file."""
    delete_file(os.path.realpath(__file__))


def cleanup():
    """Deletes the inject content folder"""
    delete_folder(os.path.join(ROOT_DIR, "inject_content"))

    # Deletes itself
    delete_script()


if __name__ == "__main__":
    # Check if the correct number of arguments are passed
    if len(sys.argv) != 3:
        print("Usage: python inject.py <backend_root> <frontend_root>")
        sys.exit(1)

    # Assign command-line arguments to variables
    backend_root = Path(sys.argv[1]).absolute()
    frontend_root = Path(sys.argv[2]).absolute()

    # Iterate over root_dir/inject_content files and inject them depending on name
    inject_folder_path = os.path.join(ROOT_DIR, "inject_content")
    for file in os.listdir(os.path.join(inject_folder_path)):
        source_file = os.path.join(inject_folder_path, file)

        if file == "Home.tsx":
            dest_file = os.path.join(frontend_root, "src", file)
            inject_file(source_file, dest_file)
        if file == "AppCalls.tsx":
            dest_file = os.path.join(frontend_root, "src", "components", file)
            inject_file(source_file, dest_file)

        delete_file(source_file)

    cleanup()

    logger.info("Template completed successfully!")
