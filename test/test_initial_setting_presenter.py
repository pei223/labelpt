import tempfile

from labelpt.app import is_directory_path_exist
import shutil
import unittest


class TestInitialSettingPresenter(unittest.TestCase):
    def setUp(self) -> None:
        self.test_dir = tempfile.mkdtemp()

    def tearDown(self) -> None:
        shutil.rmtree(self.test_dir)

    def test_is_directory_path_exist(self):
        self.assertFalse(is_directory_path_exist("hogehogehoge"))
        self.assertTrue(is_directory_path_exist("test"))
