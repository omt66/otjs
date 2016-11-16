/*!
 * Simple Canvas JavaScript Library v0.1
 *
 * (c) 2015 omt66
 * Released under the MIT license
 * Date: 2015-06-03
 */
window.OTJS = {};
OTJS.Canvas = (function (mainModule) {
    "use strict"

    mainModule.create2D = function (canvasId, settings) {
        var canvasElement = document.getElementById(canvasId);
        var c2d = canvasElement.getContext("2d");
        var frameCntr = 0;
        var fpsLastDate = 0;
        var fps = 0;

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
            clear: function () {
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
            drawImage: function (img, x, y, w, h, rotation) {
                var displayImage;

                if (!rotation) {
                    rotation = 0;
                }

                if (img instanceof Image) {
                    displayImage = img;
                }
                else {
                    displayImage = new Image();
                    displayImage.src = img;
                }

                w = w || displayImage.width;
                h = h || displayImage.height;

                c2d.save();
                //c2d.setTransform(1, 0, 0, 1, 0, 0);
                var rotationInRadian = rotation * Math.PI / 180;
                c2d.translate(x, y);
                c2d.rotate(rotationInRadian);
                //c2d.drawImage(img, 0, 0, w, h, -w/2, -h/2, w, h);
                c2d.drawImage(displayImage, -w / 2, -h / 2, w, h);
                c2d.restore();

                return displayImage;
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
            strokeStyle: function (colorRGB) {
                c2d.strokeStyle = colorRGB;
            },
            drawRectangle: function (x, y, w, h) {
                c2d.beginPath();
                c2d.fillRect(x, y, w, h);
                c2d.closePath();
            },
            drawRoundedRectangle: function (x, y, w, h, r) {
                r = r || 5;
                c2d.beginPath();
                c2d.moveTo(x + r, y);
                c2d.lineTo(x + w - r, y);
                c2d.arcTo(x + w, y, x + w, y + r, r);
                c2d.lineTo(x + w, y + h - r);
                c2d.arcTo(x + w, y + h, x + w - r, y + h, r);
                c2d.lineTo(x + r, y + h);
                c2d.arcTo(x, y + h, x, y + h - r, r);
                c2d.lineTo(x, y + r);
                c2d.arcTo(x, y, x + r, y, r);
                c2d.closePath();
                c2d.stroke();
            },
            fillRoundedRectangle: function (x, y, w, h, r) {
                c2d.beginPath();
                c2d.moveTo(x + r, y);
                c2d.lineTo(x + w - r, y);
                c2d.arcTo(x + w, y, x + w, y + r, r);
                c2d.lineTo(x + w, y + h - r);
                c2d.arcTo(x + w, y + h, x + w - r, y + h, r);
                c2d.lineTo(x + r, y + h);
                c2d.arcTo(x, y + h, x, y + h - r, r);
                c2d.lineTo(x, y + r);
                c2d.arcTo(x, y, x + r, y, r);
                c2d.closePath();
                c2d.fill();
            },
            fillRect: function (x, y, w, h) {
                c2d.fillRect(x, y, w, h);
            },
            setGlobalAlpha: function (alpha) {
                c2d.globalAlpha = alpha;
            },
            clearRect: function (x, y, w, h) {
                c2d.clearRect(x, y, w, h);
            },
            fillString: function (x, y, msg) {
                c2d.fillText(msg, x, y);
            },
            fillStringWithShadow: function (x, y, msg) {
                c2d.save();
                c2d.shadowColor = "#111";
                c2d.shadowOffsetX = 1;
                c2d.shadowOffsetY = 1;
                c2d.shadowBlur = 7;
                c2d.fillText(msg, x, y);
                c2d.restore();
            },
            getWidth: function () {
                return canvasElement.width;
            },
            getHeight: function () {
                return canvasElement.height;
            },
            setWidth: function (width) {
                canvasElement.width = width;
            },
            setHeight: function (height) {
                canvasElement.height = height;
            },
            setFont: function (fontInfo) {
                // Example: 'italic 30pt Calibri'
                c2d.font = fontInfo;
            },
            toDataURL: function () {
                return canvasElement.toDataURL();
            },
            drawCanvasOnCanvas: function (canvas, x, y, w, h) {
                var otherCanvasElement = canvas.getCanvasElement();
                c2d.drawImage(otherCanvasElement, x, y, w, h);
            },
            getCanvasElement: function () {
                return canvasElement;
            },
            drawPolygon: function (points) {
                var len = points.length;
                var p = points[0];
                c2d.beginPath();
                c2d.moveTo(p.x, p.y);

                for (var i = 1; i < len; i++) {
                    p = points[i];
                    c2d.lineTo(p.x, p.y);
                }
                c2d.closePath();
                c2d.stroke();
                c2d.fill();
            },
            drawRandomLines: function (nofLines) {
                var n = nofLines || 1;
                var sw = this.getWidth();
                var sh = this.getHeight();

                for (var i = 0; i < n; i++) {
                    var x1 = sw * Math.random();
                    var y1 = sh * Math.random();
                    var x2 = sw * Math.random();
                    var y2 = sh * Math.random();

                    this.drawLine(x1, y1, x2, y2);
                }
            },
            setLineWidth: function (lineWidth) {
                c2d.lineWidth = lineWidth;
            },
            drawString: function (x, y, msg) {
                c2d.strokeText(msg, x, y);
            },
            showFPS: function (paintBackground) {
                if (paintBackground) {
                    this.setFillColor(1, 1, 1, 1);
                    this.fillRect(10, 2, 50, 22);
                }
                this.setFillColor(0, 0, 0, 0.75);
                this.fillString(15, 25, "FPS: " + fps);
                var date = +new Date();
                frameCntr++;
                if (date > fpsLastDate + 1000) {
                    fpsLastDate = date;
                    fps = frameCntr;
                    frameCntr = 0;
                }
            },
            changeGlobalAlpha: function (alpha) {
                c2d.globalAlpha = alpha;
            },
            setShadowBlur: function (blurSize, color) {
                c2d.shadowBlur = blurSize;
                c2d.shadowColor = color;
            },
            removeShadowBlur: function () {
                c2d.shadowBlur = 0;
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
            toggle: function () {
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
        var interval = 10; //16.6;

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