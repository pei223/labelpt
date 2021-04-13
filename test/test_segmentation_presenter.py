import tempfile

from labelpt.app.presenter import segmentation_presenter
import shutil
import unittest
import numpy as np
from PIL import Image
import os


class TestSegmentationPresenter(unittest.TestCase):
    def setUp(self) -> None:
        self.test_dir = tempfile.mkdtemp()
        self._random_image_path = os.path.join(self.test_dir, "random.jpg")
        self._random_annotation_path = os.path.join(self.test_dir, "random.png")
        self._random_image2_path = os.path.join(self.test_dir, "random2.jpg")

        self._width = 100
        self._height = 80
        random_img = np.zeros([self._height, self._width, 3], dtype="uint8")

        Image.fromarray(random_img).save(self._random_image_path)
        Image.fromarray(random_img).save(self._random_annotation_path)
        Image.fromarray(random_img).save(self._random_image2_path)

    def tearDown(self) -> None:
        shutil.rmtree(self.test_dir)

    def test_load_image_with_annotation_img(self):
        result = segmentation_presenter.load_img_and_annotation_and_width_height(self._random_image_path, self.test_dir)
        self.assertTrue(isinstance(result, tuple))
        self.assertTrue(isinstance(result[0], str))
        self.assertTrue(isinstance(result[1], str))
        self.assertTrue(isinstance(result[2], int) and result[2] == self._width)
        self.assertTrue(isinstance(result[3], int) and result[3] == self._height)

    def test_load_image_with_no_annotation(self):
        result = segmentation_presenter.load_img_and_annotation_and_width_height(self._random_image2_path,
                                                                                 self.test_dir)
        self.assertTrue(isinstance(result, tuple))
        self.assertTrue(isinstance(result[0], str))
        self.assertTrue(result[1] is None)
        self.assertTrue(isinstance(result[2], int) and result[2] == self._width)
        self.assertTrue(isinstance(result[3], int) and result[3] == self._height)

    def test_load_image_with_no_file(self):
        result = segmentation_presenter.load_img_and_annotation_and_width_height("aaaaaaaaaaaaaaa.jpg", self.test_dir)
        self.assertTrue(result is None)

    def test_load_filepath_list(self):
        result = segmentation_presenter.load_filepath_list(self.test_dir)
        self.assertTrue(isinstance(result, list))
        self.assertEqual(len(result), 3)

    def test_save_annotation_result_with_not_exist_dir(self):
        result = segmentation_presenter.save_annotation_result("hoge", "", "aaaaaaaaaaaaaa", 5)
        self.assertFalse(result)

    def test_save_annotation_result_with_no_img(self):
        result = segmentation_presenter.save_annotation_result(self.test_dir, "", "", 5)
        self.assertFalse(result)
        result = segmentation_presenter.save_annotation_result(self.test_dir, "", None, 5)
        self.assertFalse(result)

    def test_save_annotation(self):
        pass