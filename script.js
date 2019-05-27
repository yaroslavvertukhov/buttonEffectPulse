class buttonEffectPulse {
    constructor(self, classButton, classButtonPulse) {
        this._self = self;
        this._classButton = classButton;
        this._classButtonPulse = classButtonPulse || classButton + "__pulse";

        this._pulseElement = document.createElement("span");

        this._init();
    }

    _init() {
        let self = this;

        this._pulseElement.classList.add(this._classButtonPulse);

        self._self.addEventListener("click", function(event) {
            let targetCoords = self._self.getBoundingClientRect(),
                clickX = event.clientX - targetCoords.left,
                clickY = event.clientY - targetCoords.top;

                self._addPulseElement(clickX, clickY);
        });
    }

    _addPulseElement(positionX, positionY) {

        let clonePulseElement = this._pulseElement.cloneNode(false);

        clonePulseElement.setAttribute("style", "opacity: 1; position: absolute; transform: translate(-50%, -50%); height: 0px; width: 0px; display: block; top:" + positionY +"px; left:" + positionX + "px;");

        this._self.appendChild(clonePulseElement);

        this._animationPulseElement(clonePulseElement);
    }

    _animationPulseElement(element) {
        let self = this,
            buttonStyle = window.getComputedStyle(this._self),
            buttonWidth = parseInt(buttonStyle.width),
            buttonHeight = parseInt(buttonStyle.height),
            intervalSize = 2,
            pulseOpacityInterval,
            pulseOpacity = 0,
            pulseSize;

        if (buttonWidth >= buttonHeight) {
            pulseSize = buttonWidth * 2;
        } else {
            pulseSize = buttonHeight * 2;
        }

        pulseOpacityInterval = 1 / (pulseSize / intervalSize);

        let animation = setInterval(function() {
            let pulseStyle = window.getComputedStyle(element),
                pulseWidth = parseInt(pulseStyle.width) + intervalSize;;

            if (pulseWidth <= pulseSize) {
                // console.log(pulseWidth.toString() + "px");
                element.style.width = pulseWidth.toString() + "px";
                element.style.height = pulseWidth.toString() + "px";
                element.style.opacity = parseFloat(element.style.opacity) - pulseOpacityInterval;
            } else {
                self._removePulseElement(element);
                clearInterval(animation);
            }
        }, 1);
    }

    _removePulseElement(element) {
        element.remove();
    }

}

//test
let buttons = document.querySelectorAll(".buttonEffectPulse");
let test = new buttonEffectPulse(buttons[0], "buttonEffectPulse");
// console.log(test);
