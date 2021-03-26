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

## Setup storybook
```
cd labelpt/web
npm run build-storybook
npm run storybook
```

## Run
```
// for web frontend
npm run dev-build
// Fix build/index.html /static/~ -> ./static/~
python run.py
```

## Build
```
// for web frontend
npm run prod-build
// for python
python -m eel labelcls/run.py labelpt/web --onefile --noconsole
```

## Build for pypi
```
python setup.py sdist bdist_wheel
# check
twine check dist/*
# test upload
twine upload --repository testpypi dist/*
# upload
twine upload dist/*
```