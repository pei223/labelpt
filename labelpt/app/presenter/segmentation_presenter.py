from typing import List, Tuple, Optional
import eel
from pathlib import Path
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
def load_filepath_list(dir_path: str) -> List[str]:
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
def save_annotation_result(save_dir: str, filename: str, annotation_result: List[int]):
    filename_without_extension = Path(filename).name
    save_dir_path = Path(save_dir).joinpath(filename_without_extension + ".png")
