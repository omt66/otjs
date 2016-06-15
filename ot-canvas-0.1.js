/*!
 * Simple Canvas JavaScript Library v0.1
 *
 * (c) 2015 omt66
 * Released under the MIT license
 * Date: 2015-06-03
 */

var OTJS = OTJS || {};
(function (global) {
    var sub = {};

    global.OTJS = global.OTJS || {};

    global.OTJS.NewSub = sub;
    //return sub;
}(window));

//var OTJS = OTJS || {};
OTJS.Canvas = (function (mainModule) {
    "use strict"

    mainModule.create2D = function (canvasId, settings) {
        var canvasElement = document.getElementById(canvasId);
        var c2d = canvasElement.getContext("2d");
        
        function getMousePosition(mouseEvent) {
            var rect = canvasElement.getBoundingClientRect();

            return {
                x: mouseEvent.clientX - rect.left,
                y: mouseEvent.clientY - rect.top
            };
        }

        function getTouchPosition(touchEvent) {
            var rect = canvasElement.getBoundingClientRect();

            return {
                x: touchEvent.clientX - rect.left,
                y: touchEvent.clientY - rect.top
            };
        }

        //Old
        //function getARGBColor(a, r, g, b) {
        //    var ir = Math.floor(255 * r);
        //    var ig = Math.floor(255 * g);
        //    var ib = Math.floor(255 * b);

        //    return "rgba(" + ir + ", " + ig + ", " + ib + ", " + a + ")";
        //}

        function getRGBAColor(r, g, b, a) {
            var ir = Math.floor(255 * r);
            var ig = Math.floor(255 * g);
            var ib = Math.floor(255 * b);
            return "rgba(" + ir + ", " + ig + ", " + ib + ", " + a + ")";
        };



        return {
            drawLine: function (x1, y1, x2, y2) {
                c2d.beginPath();    
                c2d.moveTo(x1, y1);
                c2d.lineTo(x2, y2);
                c2d.stroke();
            },
            drawCircle: function (x, y, radius) {
                c2d.beginPath();
                c2d.arc(x, y, radius, 0, 2 * Math.PI);
                c2d.stroke();
            },
            fillCircle: function (x, y, radius) {
                c2d.beginPath();
                c2d.arc(x, y, radius, 0, 2 * Math.PI);
                c2d.fill();
                //c2d.stroke();
            },
            clear: function() {
                c2d.clearRect(0, 0, c2d.canvas.width, c2d.canvas.height);
            },
            // Blend modes: lighter, multiply, xor, etc
            setBlendMode: function (blendMode) {
                c2d.globalCompositeOperation = blendMode; 
            },
            setDrawColor: function (r, g, b, a) {
                c2d.strokeStyle = getRGBAColor(r, g, b, a);
            },
            setRandomColor: function (alpha) {
                var r = Math.random();
                var g = Math.random();
                var b = Math.random();
                this.setDrawColor(r, g, b, 0.75);
            },
            addMouseMoveHandler: function (callback) {
                canvasElement.addEventListener("mousemove", function (e) {
                    e.preventDefault();
                    var target = e.target;
                    var pos = getMousePosition(e);
                    var x = pos.x;
                    var y = pos.y;

                    callback({ target: target, clientX: x, clientY: y });
                }, false);
            },
            addMouseClickHandler: function (callback) {
                canvasElement.addEventListener("click", function (e) {
                    e.preventDefault();
                    var target = e.target;
                    var pos = getMousePosition(e);
                    var x = pos.x;
                    var y = pos.y;
                    callback({ target: target, clientX: x, clientY: y });
                }, false);
            },
            addMouseDownHandler: function (callback) {
                canvasElement.addEventListener("mousedown", function (e) {
                    e.preventDefault();
                    var target = e.target;
                    var pos = getMousePosition(e);
                    var x = pos.x;
                    var y = pos.y;
                    callback({ target: target, clientX: x, clientY: y });
                }, false);
            },
            addMouseUpHandler: function (callback) {
                canvasElement.addEventListener("mouseup", function (e) {
                    e.preventDefault();
                    var target = e.target;
                    var pos = getMousePosition(e);
                    var x = pos.x;
                    var y = pos.y;
                    callback({ target: target, clientX: x, clientY: y });
                }, false);
            },
            //!OT: There is new touch handlers (multi touch) so copy and paste here
            addTouchMoveHandler: function (callback) {
                canvasElement.addEventListener("touchmove", function (e) {
                    e.preventDefault();
                    var target = e.target;
                    var touch = event.targetTouches[0];
                    var pos = getTouchPosition(touch);
                    var x = pos.x;
                    var y = pos.y;
                    callback({ target: target, clientX: x, clientY: y });
                }, false);
            },
            addTouchDownHandler: function (callback) {
                canvasElement.addEventListener("touchstart", function (e) {
                    e.preventDefault();
                    var target = e.target;
                    var touch = event.targetTouches[0];
                    var pos = getTouchPosition(touch);
                    var x = pos.x;
                    var y = pos.y;
                    callback({ target: target, clientX: x, clientY: y });
                }, false);
            },
            addTouchUpHandler: function (callback) {
                canvasElement.addEventListener("touchend", function (e) {
                    e.preventDefault();
                    var target = e.target;
                    var touch = event.targetTouches[0];
                    var pos = getTouchPosition(touch);
                    var x = pos.x;
                    var y = pos.y;
                    callback({ target: target, clientX: x, clientY: y });
                }, false);
            },            
            setFillColor: function (r, g, b, a) {
                c2d.fillStyle = getRGBAColor(r, g, b, a);
            },
            fillString: function (x, y, msg) {
                c2d.fillText(msg, x, y);
            }
        }
    }

    return mainModule;
}(OTJS.Canvas || {}));


OTJS.Stage = (function (subMod) {
    "use strict"

    subMod.renderer = function (animationCallback, targetFPS) {
        targetFPS = targetFPS || 30;
        var fpsInterval = 1000.0 / targetFPS;
        var lastTime = Date.now();
        var animating = false;

        function animate() {
            if (!animating) return;

            requestAnimationFrame(animate);
            var currentTime = Date.now();
            var elapsedTime = currentTime - lastTime;

            if (elapsedTime > fpsInterval) {
                lastTime = currentTime - (elapsedTime % fpsInterval);

                if (animationCallback)
                    animationCallback();
            }
        }

        return {
            start: function () {
                animating = true;
                animate();
            },
            resume: function () {
                animating = true;
                animate();
            },
            toggle: function() {
                animating = !animating;
                animate();
            },
            pause: function () {
                animating = false;
            },
            stop: function () {
                animating = false;
            },            
        };
    };

    subMod.createCanvas = function (canvasId, settings) {
        return OTJS.Canvas.create2D(canvasId, settings);
    };


    //subMod.createAnimation = function(obj, )

    return subMod;
}(OTJS.Stage || {}));


OTJS.Animator = (function (subMod) {
    "use strict"

    subMod.animate = function (obj, properties, delay, duration, callback) {
        var originalPropertyValues = {};
        var timeCurrent = Date.now();
        var timeStart = timeCurrent + delay;
        var timeEnd = timeStart + duration;
        var running = true;
        //var interval = 33;
        var interval = 10;//16.6;

        for (var name in properties) {
            originalPropertyValues[name] = obj[name];
        }

        var intervalId = setInterval(function () {
            timeCurrent = Date.now();

            if (!running) return;

            if (timeCurrent < timeStart) return;

            var pos = timeCurrent > timeEnd ? 1 : (timeCurrent - timeStart) / duration;

            for (var name in properties) {
                var propVal = properties[name];
                var propOrgVal = originalPropertyValues[name];
                var propNewVal = propOrgVal + pos * (propVal - propOrgVal);
                obj[name] = propNewVal;                
            }
            //for (var ii = 0; ii < 99000000; ii++) {
            //   // pos++;
            //}

            if (timeCurrent > timeEnd) {
                running = false;
                clearInterval(intervalId);

                if (callback)
                    callback();

            }


        }, interval);


    }

    return subMod;
}(OTJS.Animator || {}));
