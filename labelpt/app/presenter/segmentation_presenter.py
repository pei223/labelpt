import io
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
def save_annotation_result(save_dir: str, filename: str, rgba_list: List[int], label_count: int, width: int,
                           height: int) -> bool:
    save_dir_path = Path(save_dir).joinpath(Path(filename).stem + ".png")

    result_rgb_img = np.array(rgba_list).round().astype("uint8").reshape([height, width, 4])[:, :, :3]
    print(np.unique(result_rgb_img), result_rgb_img.dtype, result_rgb_img.shape)
    result_img_arr = image_process.rgb_to_index(result_rgb_img, label_count)
    result_img = Image.fromarray(result_img_arr, mode="P")
    result_img.putpalette(image_process.INDEXED_COLOR_PALETTE)
    result_img.save(str(save_dir_path))
    return True
