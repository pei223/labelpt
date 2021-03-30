from typing import List, Dict, Tuple, Optional
from tkinter import filedialog
import eel
from pathlib import Path
from tkinter import Tk
from tkinter import messagebox
from PIL import Image
import base64
from io import BytesIO


@eel.expose
def load_jpeg_image_and_width_height(filepath: str) -> Optional[Tuple[str, int, int]]:
    """
    :param filepath:
    :return:
    """
    if not Path(filepath).exists():
        messagebox.showwarning("Warning", f"{filepath} is not exist.")
        return None
    image: Image.Image = Image.open(filepath)
    image = image.convert("RGB")
    buffered = BytesIO()
    image.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue())
    return f"data:image/jpeg;base64,{str(img_str)[2:-1]}", image.size[0], image.size[1]


@eel.expose
def choose_annotation_directory() -> Optional[str]:
    dir_path = filedialog.askdirectory()
    if dir_path is None:
        return None
    return dir_path


@eel.expose
def load_filepath_list() -> List[str]:
    dir_path = filedialog.askdirectory()
    if dir_path is None:
        return []
    dir_path = Path(dir_path)
    valid_extensions = [
        "*.png", "*.jpg", "*.jpeg", "*.bmp"
    ]

    file_list = []
    for extension in valid_extensions:
        file_list += list(dir_path.glob(extension))
    file_list = list(map(lambda path: str(path), file_list))
    file_list.sort()
    return file_list


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
    print("aaa")
    filepath = filedialog.asksaveasfile(filetype=[("テキストファイル", "*.txt")])
    if filepath is None:
        return False
    filepath = filepath.name
    with open(filepath, "w") as file:
        for line in labels:
            file.write(f"{line}\n")
    return True


@eel.expose
def is_directory_path_exist(dir_path: str):
    return Path(dir_path).exists()
