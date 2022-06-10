# POC Stock Screener

Simple website that has six different filters to get stocks. The filters are 
- Return on Assets
- Net Profit Margin
- Analyst Recommendation
- Option/Short
- Simple Moving Average 20 day
- Simple Moving Average 50 day

## Run
To start the front end run with `yarn start` inside website-frontend.
Then, run inside website `python manage.py runserver` to start the backend.

The backend uses the finviz library from https://github.com/mariostoev/finviz and yfinance library https://pypi.org/project/yfinance/

Install finviz library
```
pip install -U git+https://github.com/mariostoev/finviz
```

Install yfinance library
```
pip install yfinance
```

The library has a disclaimer:
Using the library to acquire data from FinViz is against their Terms of Service and robots.txt. Use it responsibly and at your own risk. This library is built purely for educational purposes.


