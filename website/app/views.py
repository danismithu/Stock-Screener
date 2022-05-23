from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from finviz.screener import Screener

@api_view(["POST"])
@permission_classes((AllowAny,))
def get_stocks(request):
    # Get the filters from request 
    roaFilter = request.data.get("roaFilter")
    npmFilter = request.data.get("npmFilter")
    analystRecomFilter = request.data.get("analystRecomFilter")
    shortOptionFilter = request.data.get("shortOptionFilter")
    sma20Filter = request.data.get("sma20Filter")
    sma50Filter = request.data.get("sma50Filter")

    filters = [roaFilter, npmFilter, analystRecomFilter, shortOptionFilter, sma20Filter, sma50Filter]
    # Get stocks based on screener
    stock_list = Screener(filters=filters, table='Performance', order='ticker')
    stocks = [stock['Ticker'] for stock in stock_list]

    return Response(status=status.HTTP_200_OK, data = {"stocks": stocks})
