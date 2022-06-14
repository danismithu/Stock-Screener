from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from finviz.screener import Screener
import yfinance as yf

@api_view(["POST"])
@permission_classes((AllowAny,))
def get_stocks(request):
    # Get the filters from request 
    roa_filter = request.data.get("roaFilter")
    npm_filter = request.data.get("npmFilter")
    analyst_recom_filter = request.data.get("analystRecomFilter")
    short_option_filter = request.data.get("shortOptionFilter")
    sma20_filter = request.data.get("sma20Filter")
    sma50_filter = request.data.get("sma50Filter")

    filters = [roa_filter, npm_filter, analyst_recom_filter, short_option_filter, sma20_filter, sma50_filter]
    # Get stocks based on screener
    stock_list = Screener(filters=filters, table='Performance', order='ticker')
    stocks = [stock['Ticker'] for stock in stock_list]

    return Response(status=status.HTTP_200_OK, data={"stocks": stocks})

# Returns the adjusted close price of the given stock
@api_view(["POST"])
def get_stock_price(request):
    ticker = request.data.get("ticker")
    start_date = request.data.get("startDate")
    end_date = request.data.get("endDate")
    stock = yf.download(ticker, start_date, end_date)
    stock.rename(columns={"Open": "open", "Close": "close", "High": "high", "Low": "low", "Adj Close": "adjClose"}, inplace=True)
    return Response(status=status.HTTP_200_OK, data={"dates": stock.index, "prices": stock[["open", "close", "high", "low", "adjClose"]]})