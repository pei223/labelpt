## labelpt

Image segmentation annotation tool.

## Using libraries

- Python, Eel
- TypeScript, React

## Setup

```
// for python
pip install -r requirements.txt
// for web frontend
cd labelpt/web
npm install
```

## Setup for develop

- Apply .prettierrc.json to extension setting of Prettier plugin
- Set true to setting of format on save

## Setup storybook

```
cd labelpt/web
npm run build-storybook
npm run storybook
```

## dev run

```
// web develop build and run app.
python dev_run.py
// web develop build only
python build.py -dev
// run app only
python run.py
```

## Build for pypi

```
python build.py
python setup.py sdist bdist_wheel
# check
twine check dist/*
# test upload
twine upload --repository testpypi dist/*
# upload
twine upload dist/*
```

## Test

```
python -m unittest test
```