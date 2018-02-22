module LiveSlide exposing (..)

import Html exposing (..)
import Html.Events exposing (onClick)
import WebSocket

server : String
server = "wss://localhost:3000/ws"

main =
  beginnerProgram { model = 0, view = view, update = update }

type Msg = SendMessage

view model =
  div []
    [ div [] [ text (toString model) ]
    , button [ onClick SendMessage ] [ text "Send" ]
    ]


update msg model =
  case msg of
    SendMessage ->
        WebSocket.send server "Hello"