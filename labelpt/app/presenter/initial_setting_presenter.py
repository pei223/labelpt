from typing import List, Optional
from tkinter import filedialog
import eel
from pathlib import Path


@eel.expose
def is_directory_path_exist(dir_path: str):
    return Path(dir_path).exists()


@eel.expose
def choose_directory() -> Optional[str]:
    dir_path = filedialog.askdirectory()
    if dir_path is None:
        return None
    return dir_path


@eel.expose
def load_labels_from_file() -> List[str]:
    filepath = filedialog.askopenfile(filetype=[("テキストファイル", "*.txt")])
    if filepath is None:
        return []
    filepath = filepath.name
    with open(filepath, "r") as file:
        return list(map(lambda line: line.replace("\n", ""), file))


@eel.expose
def save_labels_to_file(labels: Optional[List[str]]) -> bool:
    filepath = filedialog.asksaveasfile(filetype=[("テキストファイル", "*.txt")])
    if filepath is None:
        return False
    filepath = filepath.name
    with open(filepath, "w") as file:
        for line in labels:
            file.write(f"{line}\n")
    return True
