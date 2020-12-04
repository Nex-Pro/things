/*
Sign Chat System Web interface V1

Created by Matti 'Menithal' Lahtinen
on  22/4/2017


Scripts Released Under CC Attribution 4.0
http://creativecommons.org/licenses/by/4.0/

*/


(function() {
    var EventBridge;
    var WebChannel;
    // Overrides just to allow for desktop debugging
    var Script = {};

    function openEventBridge(callback) {
        console.log(typeof qt.webChannelTransport);
        WebChannel = new QWebChannel(qt.webChannelTransport, function(channel) {
            var EventBridge = (
                WebChannel.objects.eventBridge || // OverlayWebWindowEx
                WebChannel.objects.eventBridgeWrapper.eventBridge // OverlayWebWindow
            );

            EventBridge = WebChannel.objects.eventBridgeWrapper.eventBridge;
            callback(EventBridge);
        });
    }

    openEventBridge(function(EventBridge) {
        function emitWebEvent(obj) {
            EventBridge.emitWebEvent(JSON.stringify(obj));
        }
        var clearTimer = -1;

        var comms = document.getElementById("commsPanel");

        document.getElementById("button-clear-all").onclick = function(){
            comms.value = "";
            clearTimer = setTimeout(function() {
                comms.value = "";
                emitWebEvent({
                    type: "clearSign",
                    message: ""
                });
            }, 15000);
            clearTimeout(clearTimer);
            emitWebEvent({
                type: "textUpdate",
                message: ""
            });
        }

        var fontSize = document.getElementById("range-font-size");
        var sync = function(val, t) {
            if (val.keyCode === 13) {

                emitWebEvent({
                    type: "returnHit",
                    message: comms.value
                });
                clearTimeout(clearTimer);
            } else if (comms.value.length > 0) {
                emitWebEvent({
                    type: "textScale",
                    message: fontSize.value
                });
                clearTimeout(clearTimer);
                emitWebEvent({
                    type: "textUpdate",
                    message: comms.value
                });
            } else {
                clearTimeout(clearTimer);
                clearTimer = setTimeout(function() {
                    comms.value = "";
                    emitWebEvent({
                        type: "clearSign",
                        message: ""
                    });
                }, 15000);
                emitWebEvent({
                    type: "textUpdate",
                    message: ""
                });
            }
        };


        document.getElementById("button-undo").onclick = function(){
            document.execCommand("undo");
            emitWebEvent({
                type: "textUpdate",
                message: comms.value
            });
        }
        document.getElementById("button-redo").onclick = function(){
            document.execCommand("redo");
            emitWebEvent({
                type: "textUpdate",
                message: comms.value
            });
        };

        fontSize.oninput = function(val){
            emitWebEvent({
                type: "textScale",
                message: val.target.value
            });
        }

        document.getElementById("button-camera").onclick = function () {
            emitWebEvent({
                type: "altCamera",
                message: ""
            });
        }

        var throttle = function(callback, delay) {
            var timer = null;
            return function() {
                var context = this,
                    args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function() {
                    callback.apply(context, args);
                }, delay);
            }
        };

        document.getElementById("button-notify").onclick = throttle(function() {
            sync({keyCode: 13});
        }, 50);


        comms.onkeyup = throttle(sync, 50);
        comms.onpaste = throttle(sync, 50);
        emitWebEvent({
            type: "signOn",
            message: ""
        });
    })
})();
