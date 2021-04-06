from labelpt.app import image_process
import numpy as np
import unittest


class TestImageProcess(unittest.TestCase):
    def test_rgb_to_index(self):
        dummy_data = [
            [
                [128, 0, 0],
                [0, 128, 0],
                [128, 128, 0],
                [0, 0, 128],
            ],
            [
                [128, 0, 0],
                [0, 128, 0],
                [128, 128, 0],
                [0, 0, 128],
            ],
            [
                [128, 0, 0],
                [0, 128, 0],
                [128, 128, 0],
                [0, 0, 128],
            ],
            [
                [128, 0, 0],
                [0, 128, 0],
                [128, 128, 0],
                [0, 0, 128],
            ],
        ]
        dummy_data = np.array(dummy_data)
        expected_img = [
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [1, 2, 3, 4],
        ]
        result_img = image_process.rgb_to_index(dummy_data, 5)
        self.assertTrue(np.array_equal(result_img, expected_img))
