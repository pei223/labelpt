from setuptools import setup
from codecs import open
from os import path
from setuptools import find_packages


def _requires_from_file(filename: str):
    return open(filename).read().splitlines()


def _read_README():
    return open(path.join(here, 'README.md'), encoding='utf-8').read().replace("\r", "")


here = path.abspath(path.dirname(__file__))

setup(
    name='labelpt',
    install_requires=_requires_from_file("requirements.txt"),
    packages=find_packages(),

    license='MIT',

    version='0.0.1',

    author='pei223',
    author_email='peidparc@gmail.com',
    url='https://github.com/pei223/labelpt',

    description='Annotation tool of image segmentation.',
    long_description=_read_README(),
    long_description_content_type='text/markdown',

    keywords='image-segmentation annotation annotation-tool',
    classifiers=[
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3.7',
    ],  # reference https://pypi.org/classifiers/
    entry_points={
        "console_scripts": [
            "labelpt=labelpt.run:main",
        ],
    },
    include_package_data=True,
)
