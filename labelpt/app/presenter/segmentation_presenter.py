from typing import List, Tuple, Optional
import eel
import numpy as np
from pathlib import Path
from tkinter import messagebox
from PIL import Image
import base64
from io import BytesIO

from labelpt.app import image_process


@eel.expose
def load_img_and_annotation_and_width_height(image_filepath: str, annotation_dir_path: str) -> Optional[
    Tuple[str, str, int, int]]:
    """
    :param image_filepath: image filepath
    :param annotation_dir_path: annotation directory path
    :return: [base64 image, base64 annotation image, width, height]
    """
    image_filepath = Path(image_filepath)
    if not image_filepath.exists():
        messagebox.showwarning("Warning", f"{image_filepath} is not exist.")
        return None

    b64_img, width, height = _load_base64_image_and_size(str(image_filepath))
    annotation_filepath = Path(annotation_dir_path).joinpath(image_filepath.stem + ".png")
    annotation_b64_img, _, _ = _load_base64_image_and_size(
        str(annotation_filepath), mode="RGBA") if annotation_filepath.exists() else (None, 0, 0)
    return b64_img, annotation_b64_img, width, height


def _load_base64_image_and_size(filepath: str, mode: str = "RGB") -> Tuple[str, int, int]:
    """
    :param filepath:
    :return: [base64 image, width, height]
    """
    image: Image.Image = Image.open(filepath)
    image = image.convert(mode)
    if mode == "RGBA":
        image_arr = image_process.background_to_transparent(np.array(image))
        image = Image.fromarray(image_arr)
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue())
    return f"data:image/png;base64,{str(img_str)[2:-1]}", image.size[0], image.size[1]


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
def save_annotation_result(save_dir: str, filename: str, b64_result_img: Optional[str], label_num: int) -> bool:
    if b64_result_img is None or b64_result_img == "":
        return False
    save_file_path = Path(save_dir).joinpath(Path(filename).stem + ".png")
    rgba_img = Image.open(BytesIO(base64.b64decode(b64_result_img)))
    rgb_img_arr = np.array(rgba_img)[:, :, :3].astype("uint8")
    index_img_arr = image_process.rgb_to_index(rgb_img_arr, label_num)
    index_img = Image.fromarray(index_img_arr, mode="P")
    index_img.putpalette(image_process.INDEXED_COLOR_PALETTE)
    index_img.save(str(save_file_path))
    return True
